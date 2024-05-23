import { WebSocket } from "ws";

const websocketClient = new WebSocket("ws://localhost:8080");

websocketClient.on("open", () => {
    websocketClient.send("This is from the client")

    websocketClient.on("message", (message)=>{
        console.log(`Recieved message from server: ${message}`);
        websocketClient.close();
    })
});