// Escape helper
function escapeHtml(str: string) {
  return str.replace(/[&<>"']/g, function (c) {
    return ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c] as string);
  });
}

function parseSOAPResponse(xml: string) {
  const responseBlockMatch = xml.match(/<Response[\s\S]*?<\/Response>/i);

  if (!responseBlockMatch) {
    return {
      responseCode: null,
      responseMessage: "No <Response> block found",
      success: false,
    };
  }

  const block = responseBlockMatch[0];

  function tag(name: string) {
    const match = block.match(
      new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, "i"),
    );
    return match ? match[1].trim() : null;
  }

  return {
    responseCode: tag("responseCode"),
    responseMessage: tag("responseMessage"),
    success: tag("success")?.toLowerCase() === "true",
  };
}

const UI_HTML = `<!DOCTYPE html>
<html><head><title>Punchy</title></head>
<body style="background:#111;color:white;text-align:center;padding:40px;">
  <h1>Punchy</h1>
  <button onclick="go('In')">Punch In</button>
  <button onclick="go('Out')">Punch Out</button>
  <pre id="result">Ready</pre>
<script>
async function go(type){
  document.getElementById("result").innerText="Sending...";
  let r = await fetch("/api?punch="+type);
  document.getElementById("result").innerText = await r.text();
}
</script>
</body></html>`;

// ---------------------------------------------------------------------------
// MAIN SERVER
// ---------------------------------------------------------------------------
Deno.serve(async (req) => {
  const url = new URL(req.url);

  // Serve UI
  if (url.pathname === "/") {
    return new Response(UI_HTML, { headers: { "content-type": "text/html" } });
  }

  // API endpoint
  if (url.pathname === "/api") {
    const punchType = url.searchParams.get("punch");

    if (!punchType || !["In", "Out"].includes(punchType)) {
      return new Response("Invalid punch type", { status: 400 });
    }

    const lat = 24.6710483;
    const lng = 46.676725;
    const off = 0.0003;

    const finalLat = lat + (Math.random() * (off * 2) - off);
    const finalLng = lng + (Math.random() * (off * 2) - off);

    const punchCode = punchType === "In" ? "1" : "3";

    const soapBody = `
<v:Envelope xmlns:i="http://www.w3.org/2001/XMLSchema-instance"
            xmlns:d="http://www.w3.org/2001/XMLSchema"
            xmlns:c="http://schemas.xmlsoap.org/soap/encoding/"
            xmlns:v="http://schemas.xmlsoap.org/soap/envelope/">
  <v:Header/>
  <v:Body>
    <n0:doPunchGeoLocation id="o0" c:root="1"
        xmlns:n0="http://webservices.attendance.kfshrc.edu/">
      <badge i:type="d:string">1513008</badge>
      <device i:type="d:string">iOS</device>
      <punchType i:type="d:string">${escapeHtml(punchCode)}</punchType>
      <locValid i:type="d:string">REAL</locValid>
      <longitude i:type="d:string">${finalLng.toFixed(6)}</longitude>
      <latitude i:type="d:string">${finalLat.toFixed(6)}</latitude>
    </n0:doPunchGeoLocation>
  </v:Body>
</v:Envelope>
    `;

    const headers = {
      "Accept-Encoding": "gzip",
      "Content-Type": "text/xml;charset=utf-8",
      "Host": "kfshrcsystems.kfshrc.edu.sa",
      "SOAPAction": "http://ws.kfshrc.edu/services/hrdoPunchGeoLocation",
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/604.1",
    };

    // SEND SOAP REQUEST
    const soapRes = await fetch(
      "https://kfshrcsystems.kfshrc.edu.sa/AttendanceWS/EmployeeAttendanceService",
      {
        method: "POST",
        headers,
        body: soapBody,
      },
    );

    const raw = await soapRes.text();

    // -----------------------------------------------------------------------
    // 🔥🔥🔥 FULL LOGGING (Visible in Deno Deploy logs)
    // -----------------------------------------------------------------------
    console.log("=== SOAP REQUEST BODY ===\n", soapBody);
    console.log("=== SOAP RESPONSE STATUS ===", soapRes.status);
    console.log("=== SOAP RESPONSE HEADERS ===");
    for (const [k, v] of soapRes.headers.entries()) console.log(k + ": " + v);
    console.log("=== RAW SOAP RESPONSE ===\n", raw);

    const parsed = parseSOAPResponse(raw);

    console.log("=== PARSED RESULT ===", parsed);
    // -----------------------------------------------------------------------

    return new Response(parsed.responseMessage ?? "No message available", {
      headers: { "content-type": "text/plain" },
    });
  }

  return new Response("Not found", { status: 404 });
});
