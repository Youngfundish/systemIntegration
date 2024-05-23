import express from "express";
import cors from "cors";

const app = express();
// allow cors from all requets from all origins

// One method
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// Second method
// app.use(cors())

app.get("/timestamp", cors(), (req, res) => {
  res.send({ time: new Date() });
});

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log("Server is running"), PORT);
