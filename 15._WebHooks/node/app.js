// ssh -R fun:80:127.0.0.1:8080 serveo.net
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/githubwebhooksjson", (req, res) => {
    console.log(req.body);
    res.sendStatus(204);
})

app.post("/githubwebhookform", (req, res) => {
    console.log(req.body);
    res.sendStatus(204);
});

app.listen(8080, () => console.log("Server is running", 8080));