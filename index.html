import { escapeHtml } from './escape.js';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const punchType = params.get('punch');
    const randomLocation = params.get('randomLocation');
    const deviceId = params.get('deviceId') || '0CA07DEA-B42F-4B5E-9374-78922A55AB2B';

    // Function to extract responseMessage from SOAP response
    function parseSOAPResponse(xml) {
      // Extract only the <Response>...</Response> block
      const responseBlockMatch = xml.match(/<Response[\s\S]*?<\/Response>/i);
      if (!responseBlockMatch) {
        return {
          responseCode: null,
          responseMessage: null,
          success: false
        };
      }
    
      const responseBlock = responseBlockMatch[0];
    
      const tag = (tagName) => {
        const m = responseBlock.match(
          new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i")
        );
        return m ? m[1].trim() : null;
      };
    
      const responseCode = tag("responseCode");
      const responseMessage = tag("responseMessage");
      const success = tag("success");
    
      return {
        responseCode,
        responseMessage,
        success: success === "true" || success === "TRUE"
      };
    }
    
    
    

    // Handle Punch In/Out logic if 'punch' query parameter exists
    if (punchType) {
      if (!['In', 'Out'].includes(punchType)) {
        return new Response('Invalid punch type. Use either "In" or "Out".', { status: 400 });
      }

      const latitude = 24.6710483;
      const longitude = 46.676725;
      const degreeChange = 0.0003;

      let finalLatitude = latitude;
      let finalLongitude = longitude;

      /*
      if (randomLocation === 'true') {
        finalLatitude = latitude + (Math.random() * (degreeChange * 2) - degreeChange);
        finalLongitude = longitude + (Math.random() * (degreeChange * 2) - degreeChange);
      }
      */

      finalLatitude = latitude + (Math.random() * (degreeChange * 2) - degreeChange);
      finalLongitude = longitude + (Math.random() * (degreeChange * 2) - degreeChange);

      const roundedLatitude = finalLatitude.toFixed(6);
      const roundedLongitude = finalLongitude.toFixed(6);
      const punchCode = punchType === 'In' ? '1' : '3';

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
            <longitude i:type="d:string">${escapeHtml(roundedLongitude)}</longitude>
            <latitude i:type="d:string">${escapeHtml(roundedLatitude)}</latitude>
          </n0:doPunchGeoLocation>
        </v:Body>
      </v:Envelope>`;

      const headers = {
        "Accept-Encoding": "gzip",
        "Content-Type": "text/xml;charset=utf-8",
        "Host": "kfshrcsystems.kfshrc.edu.sa",
        "SOAPAction": "http://ws.kfshrc.edu/services/hrdoPunchGeoLocation",
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
      };
      
      const soapResponse = await fetch(
        "https://kfshrcsystems.kfshrc.edu.sa/AttendanceWS/EmployeeAttendanceService",
        {
          method: "POST",
          headers,
          body: soapBody
        }
      );
      

      if (!soapResponse.ok) {
        return new Response('Punch Failed', { status: 500 });
      }

      

         // --- SOAP Response Handler ---
         const responseText = await soapResponse.text();
         const result = parseSOAPResponse(responseText);

         // 🔥 LOG RAW XML
console.log("RAW SOAP RESPONSE:\n", responseText);

         
         return new Response(result.responseMessage || "No message available", {
           status: 200,
           headers: { "Content-Type": "text/plain" }
         });
         
    }

    // Serve HTML for the root path when no query parameters are provided
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Punchy</title>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <style>
        :root {
          --bg: #020617;
          --bg-gradient: radial-gradient(circle at top, #1f2937 0, #020617 55%, #000000 100%);
          --card-bg: #020617;
          --accent-in: #22c55e;
          --accent-out: #f97373;
          --accent-soft-in: rgba(34,197,94,0.16);
          --accent-soft-out: rgba(248,113,113,0.18);
          --text-main: #e5e7eb;
          --text-muted: #9ca3af;
          --border-subtle: rgba(148,163,184,0.35);
          --shadow-soft: 0 20px 45px rgba(15,23,42,0.95);
          --radius-lg: 26px;
          --radius-pill: 999px;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html, body {
          height: 100%;
        }

        body {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: var(--bg-gradient);
          color: var(--text-main);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .wrapper {
          width: 100%;
          max-width: 420px;
        }

        .device-frame {
          background: linear-gradient(135deg, rgba(15,23,42,0.98), rgba(8,47,73,0.98));
          border-radius: 40px;
          padding: 1.1rem;
          box-shadow: var(--shadow-soft);
          border: 1px solid var(--border-subtle);
          position: relative;
        }

        .device-frame::before,
        .device-frame::after {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          background: #020617;
          border-radius: 999px;
          opacity: 0.75;
        }

        .device-frame::before {
          top: 0.6rem;
          width: 30%;
          height: 5px;
        }

        .device-frame::after {
          bottom: 0.6rem;
          width: 55%;
          height: 4px;
          opacity: 0.5;
        }

        .screen {
          background: radial-gradient(circle at top, #020617 0, #020617 40%, #000 100%);
          border-radius: 30px;
          padding: 1.25rem 1.1rem 1.3rem;
          border: 1px solid rgba(15,23,42,0.9);
          position: relative;
          overflow: hidden;
        }

        .screen::before {
          content: "";
          position: absolute;
          inset: -40%;
          background:
            radial-gradient(circle at 0% 0%, rgba(59,130,246,0.08) 0, transparent 60%),
            radial-gradient(circle at 100% 0%, rgba(16,185,129,0.10) 0, transparent 65%),
            radial-gradient(circle at 0% 100%, rgba(236,72,153,0.08) 0, transparent 60%);
          pointer-events: none;
          opacity: 0.75;
        }

        .screen-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }

        .title-group {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .app-name {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--text-muted);
          font-weight: 600;
        }

        .app-subtitle {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .status-chip {
          border-radius: var(--radius-pill);
          padding: 0.2rem 0.7rem;
          border: 1px solid var(--border-subtle);
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.7rem;
          color: var(--text-muted);
          background: rgba(15,23,42,0.85);
        }

        .status-chip-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #22c55e;
          box-shadow: 0 0 10px rgba(34,197,94,0.8);
        }

        .clock-card {
          border-radius: 20px;
          padding: 0.9rem 1rem;
          background: radial-gradient(circle at top left, rgba(34,197,94,0.16) 0, rgba(15,23,42,0.95) 40%, rgba(2,6,23,0.95) 100%);
          border: 1px solid rgba(34,197,94,0.42);
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .clock-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--text-muted);
        }

        .clock-time {
          font-size: 1.6rem;
          font-weight: 600;
        }

        .clock-date {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .button-row {
          display: flex;
          gap: 0.85rem;
          margin-top: 0.35rem;
        }

        .card-button {
          flex: 1;
          border-radius: 18px;
          padding: 0.8rem 0.9rem;
          border: 1px solid transparent;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 150ms ease-out, box-shadow 150ms ease-out, border-color 150ms ease-out, background-color 150ms ease-out, opacity 150ms ease-out;
        }

        .card-button span.label {
          font-size: 0.96rem;
          font-weight: 600;
        }

        .card-button span.description {
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 0.15rem;
        }

        .card-button.in {
          background: linear-gradient(135deg, var(--accent-soft-in), rgba(15,23,42,0.98));
          border-color: rgba(34,197,94,0.8);
          box-shadow: 0 10px 30px rgba(16,185,129,0.35);
        }

        .card-button.out {
          background: linear-gradient(135deg, var(--accent-soft-out), rgba(15,23,42,0.98));
          border-color: rgba(248,113,113,0.8);
          box-shadow: 0 10px 30px rgba(248,113,113,0.25);
        }

        .card-button::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top, rgba(255,255,255,0.25), transparent 55%);
          opacity: 0;
          transition: opacity 150ms ease-out;
        }

        .card-button:hover::after {
          opacity: 0.45;
        }

        .card-button:active {
          transform: translateY(1px) scale(0.99);
          box-shadow: none;
        }

        .card-button.disabled {
          opacity: 0.55;
          cursor: default;
          box-shadow: none;
        }

        .status-panel {
          margin-top: 0.4rem;
          border-radius: 18px;
          padding: 0.75rem 0.9rem;
          background: rgba(15,23,42,0.9);
          border: 1px solid var(--border-subtle);
          font-size: 0.8rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .status-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .status-panel-label {
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 0.64rem;
          color: var(--text-muted);
        }

        .status-indicator {
          border-radius: var(--radius-pill);
          padding: 0.18rem 0.65rem;
          border: 1px solid rgba(148,163,184,0.6);
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .status-indicator-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #4ade80;
        }

        .status-text {
          min-height: 1.2em;
          color: var(--text-main);
          line-height: 1.35;
        }

        .status-meta {
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .meta-label {
          opacity: 0.7;
        }

        .meta-value {
          font-weight: 500;
        }

        .status-panel.success {
          border-color: rgba(34,197,94,0.9);
          box-shadow: 0 0 0 1px rgba(34,197,94,0.45);
        }

        .status-panel.error {
          border-color: rgba(248,113,113,0.9);
          box-shadow: 0 0 0 1px rgba(248,113,113,0.45);
        }

        .status-panel.idle {
          opacity: 0.9;
        }

        .footer-hint {
          margin-top: 0.2rem;
          text-align: center;
          font-size: 0.7rem;
          color: var(--text-muted);
          opacity: 0.85;
        }

        @media (max-width: 480px) {
          .device-frame {
            padding: 0.9rem;
            border-radius: 32px;
          }
          .screen {
            border-radius: 24px;
          }
          .clock-time {
            font-size: 1.4rem;
          }
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="device-frame">
          <div class="screen" aria-label="Punchy app">
            <div class="screen-inner">
              <header class="header">
                <div class="title-group">
                  <div class="app-name">Punchy</div>
                  <div class="app-subtitle">Quick In / Out</div>
                </div>
                <div class="status-chip">
                  <span class="status-chip-dot"></span>
                  <span>Online</span>
                </div>
              </header>

              <section class="clock-card" aria-labelledby="clock-label">
                <div id="clock-label" class="clock-label">Current time</div>
                <div id="currentTime" class="clock-time">--:--:--</div>
                <div id="currentDate" class="clock-date">Loading date…</div>
              </section>

              <section class="button-row" aria-label="Punch controls">
                <button id="punchInCard" class="card-button in" type="button">
                  <span class="label">Punch In</span>
                  <span class="description">Start your shift</span>
                </button>
                <button id="punchOutCard" class="card-button out" type="button">
                  <span class="label">Punch Out</span>
                  <span class="description">End your shift</span>
                </button>
              </section>

              <section
                id="statusPanel"
                class="status-panel idle"
                aria-live="polite"
                aria-atomic="true"
              >
                <div class="status-panel-header">
                  <div class="status-panel-label">Status</div>
                  <div class="status-indicator">
                    <span class="status-indicator-dot"></span>
                    <span id="statusIndicatorText">Ready</span>
                  </div>
                </div>
                <div id="statusMessage" class="status-text">
                  Tap Punch In or Punch Out to send a request.
                </div>
                <div class="status-meta">
                  <div>
                    <span class="meta-label">Last punch:</span>
                    <span id="lastPunch" class="meta-value">—</span>
                  </div>
                  <div>
                    <span class="meta-label">Device:</span>
                    <span class="meta-value">Web</span>
                  </div>
                </div>
              </section>

              <p class="footer-hint">
                Requests are sent to the backend and display the response here.
              </p>
            </div>
          </div>
        </div>
      </div>

      <script>
        (function() {
          var timeEl = document.getElementById('currentTime');
          var dateEl = document.getElementById('currentDate');
          var punchInCard = document.getElementById('punchInCard');
          var punchOutCard = document.getElementById('punchOutCard');
          var statusPanel = document.getElementById('statusPanel');
          var statusMessage = document.getElementById('statusMessage');
          var statusIndicatorText = document.getElementById('statusIndicatorText');
          var lastPunchEl = document.getElementById('lastPunch');

          function updateClock() {
            var now = new Date();
            timeEl.textContent = now.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            });
            dateEl.textContent = now.toLocaleDateString(undefined, {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });
          }

          function setButtonsDisabled(disabled) {
            [punchInCard, punchOutCard].forEach(function(btn) {
              btn.disabled = disabled;
              if (disabled) {
                btn.classList.add('disabled');
              } else {
                btn.classList.remove('disabled');
              }
            });
          }

          function setStatus(state, message, lastPunch) {
            statusPanel.classList.remove('success', 'error', 'idle');
            statusPanel.classList.add(state);

            if (state === 'success') {
              statusIndicatorText.textContent = 'Success';
            } else if (state === 'error') {
              statusIndicatorText.textContent = 'Error';
            } else {
              statusIndicatorText.textContent = 'Ready';
            }

            if (message) {
              statusMessage.textContent = message;
            }

            if (typeof lastPunch === 'string') {
              lastPunchEl.textContent = lastPunch;
            }
          }

          async function handlePunch(action) {
            setButtonsDisabled(true);
            setStatus('idle', 'Sending punch ' + action + '…', lastPunchEl.textContent);

            try {
              var response = await fetch('/?punch=' + encodeURIComponent(action));
              var text = await response.text();

              if (response.ok) {
                var now = new Date().toLocaleString();
                setStatus('success', text || ('Punch ' + action + ' OK'), now + ' (' + action + ')');
              } else {
                setStatus('error', text || ('Punch ' + action + ' failed'), lastPunchEl.textContent);
              }
            } catch (e) {
              setStatus('error', 'Punch ' + action + ' error: ' + e.message, lastPunchEl.textContent);
            } finally {
              setButtonsDisabled(false);
            }
          }

          punchInCard.addEventListener('click', function() { handlePunch('In'); });
          punchOutCard.addEventListener('click', function() { handlePunch('Out'); });

          updateClock();
          setInterval(updateClock, 1000);
        })();
      </script>
    </body>
    </html>`;

    return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html' } });
  }
};
