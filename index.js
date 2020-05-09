// https://www.w3schools.com/jsreF/event_onclick.asp
// https://developer.mozilla.org/de/docs/Web/API/Window/location

const http = require("http");

const homePage = (alarm) => {
  return `
  <html>
    <head>
      <title>Smoker Test</title>
      <style>
      body {
        display: flex;
        flex-flow: column nowrap;
      }
      div {
        background-color: green;
      }
      .alarm {
        background-color: red;
      }
      </style>
      <script>
      function buttonHandler() {
        console.log(window.location);
        window.location.assign(window.location.origin + "/alarm-test")
      }
      </script>
    </head>
    <body>
      <div class="${alarmState ? "alarm" : ""}">Alarm</div>
      <button onclick="buttonHandler()">Test</button>
    </body>
  </html>
  `;
};

let alarmState = false;

const server = http.createServer((req, res) => {
  const { url } = req;

  if (url === "/alarm-test") {
    console.log("DEBUG", "Alarm!!");
    res.writeHead(302, { Location: "/" });
    return res.end(homePage(alarmState));
  } else if (url === "/" || url === "/index.html") {
    alarmState = !alarmState;
    return res.end(homePage(alarmState));
  }

  return res.end();
});

const port = 8080;
const host = "127.0.0.1";
server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
