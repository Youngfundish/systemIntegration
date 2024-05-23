import { WebSocketServer } from "ws";

const PORT = process.env.PORT ?? 8080;
const socketServer = new WebSocketServer({ port: PORT });

socketServer.on("connection", (ws) => {
  console.log("New Connection", socketServer.clients.size);

  ws.on("message", (message) => {
    console.log(`Message received: ${message}`);
  });

  ws.send("You are connected to the server!");

  ws.on("close", () => {
    console.log("Connection closed", socketServer.clients.size);
  });
});