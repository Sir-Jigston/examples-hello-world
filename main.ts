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

// ---------------------------------------------------------------------------
// SOAP XML PARSER (regex-based for simplicity)
// ---------------------------------------------------------------------------
function parseSOAPResponse(xml: string) {
  const responseBlockMatch = xml.match(/<Response[\s\S]*?<\/Response>/i);

  if (!responseBlockMatch) {
    return {
      responseCode: null,
      responseMessage: "No <Response> block found",
      success: false,
    };
  }

  const responseBlock = responseBlockMatch[0];

  function tag(tagName: string) {
    const match = responseBlock.match(
      new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i"),
    );
    return match ? match[1].trim() : null;
  }

  return {
    responseCode: tag("responseCode"),
    responseMessage: tag("responseMessage"),
    success: tag("success")?.toLowerCase() === "true",
  };
}

// ---------------------------------------------------------------------------
// HTML UI PAGE
// ---------------------------------------------------------------------------
const UI_HTML = `
<!DOCTYPE html>
<html>
<head>
  <title>Punchy</title>
  <meta charset="utf-8"/>
  <style>
    body { font-family: sans-serif; background: #0f1624; color: white; text-align: center; padding: 40px; }
    button { padding: 12px 22px; margin: 10px; font-size: 18px; border-radius: 10px; }
    #result { margin-top: 20px; font-size: 20px; }
  </style>
</head>
<body>

  <h1>Punchy</h1>
  <p>Quick In / Out</p>

  <button onclick="sendPunch('In')" style="background:#22c55e;">Punch In</button>
  <button onclick="sendPunch('Out')" style="background:#ef4444;">Punch Out</button>

  <div id="result">Ready</div>

  <script>
    async function sendPunch(type) {
      document.getElementById("result").innerText = "Sending...";

      const res = await fetch("/api?punch=" + type);
      const text = await res.text();
      document.getElementById("result").innerText = text;
    }
  </script>

</body>
</html>
`;

// ---------------------------------------------------------------------------
// MAIN DENO SERVER
// ---------------------------------------------------------------------------
Deno.serve(async (req) => {
  const url = new URL(req.url);

  // ---------------------------
  // SERVE UI
  // ---------------------------
  if (url.pathname === "/") {
    return new Response(UI_HTML, {
      headers: { "content-type": "text/html" },
    });
  }

  // ---------------------------
  // SOAP BACKEND
  // ---------------------------
  if (url.pathname === "/api") {
    const punchType = url.searchParams.get("punch");

    if (!punchType || !["In", "Out"].includes(punchType)) {
      return new Response("Invalid punch type", { status: 400 });
    }

    const latitude = 24.6710483;
    const longitude = 46.676725;
    const degreeChange = 0.0003;

    const finalLatitude =
      latitude + (Math.random() * (degreeChange * 2) - degreeChange);
    const finalLongitude =
      longitude + (Math.random() * (degreeChange * 2) - degreeChange);

    const punchCode = punchType === "In" ? "1" : "3";

    // SOAP BODY
    const soapBody = `
      <v:Envelope
        xmlns:i="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:d="http://www.w3.org/2001/XMLSchema"
        xmlns:c="http://schemas.xmlsoap.org/soap/encoding/"
        xmlns:v="http://schemas.xmlsoap.org/soap/envelope/">
        <v:Header />
        <v:Body>
          <n0:doPunchGeoLocation id="o0" c:root="1"
            xmlns:n0="http://webservices.attendance.kfshrc.edu/">
            <badge i:type="d:string">1513008</badge>
            <device i:type="d:string">iOS</device>
            <punchType i:type="d:string">${escapeHtml(punchCode)}</punchType>
            <locValid i:type="d:string">REAL</locValid>
            <longitude i:type="d:string">${finalLongitude.toFixed(6)}</longitude>
            <latitude i:type="d:string">${finalLatitude.toFixed(6)}</latitude>
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
        "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15E148 Safari/604.1",
    };

    // ---------------------------
    // MAKE SOAP REQUEST
    // ---------------------------
    const soapRes = await fetch(
      "https://kfshrcsystems.kfshrc.edu.sa/AttendanceWS/EmployeeAttendanceService",
      {
        method: "POST",
        headers,
        body: soapBody,
      },
    );

    const responseText = await soapRes.text();

    console.log("SOAP RAW RESPONSE:\n", responseText);

    const result = parseSOAPResponse(responseText);

    return new Response(result.responseMessage ?? "No message available", {
      headers: { "content-type": "text/plain" },
    });
  }

  // ---------------------------
  // 404 fallback
  // ---------------------------
  return new Response("Not found", { status: 404 });
});
