import express from "express";

const app = express();

app.use(express.static("public"));

app.get("/sync-time", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  setInterval(() => sendTimeToCLient(res), 1000);
});

function sendTimeToCLient(res) {
    const time = new Date().toISOString();
    res.write(`data: ${time} \n\n`)
}

const PORT = 8080;

app.listen(PORT, () => console.log("Server is running", PORT));
