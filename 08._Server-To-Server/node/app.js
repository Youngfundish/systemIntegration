import express from "express";

const app = express();

// app.get("/requestFastAPI", async (req, res) => {
//     const response = await fetch("http://127.0.0.1:8000/fastapiData");
//     const result = await response.json();
//     res.send({ data: result });
// });

// app.get("/expressData", (req, res) => {
//     res.send({ message: "isRunning" });
// });

// app.get("/", async (req, res) => {
//     const data = await fetch("https://localhost:7188/");
//     res.sendFile(path.join(__dirname, 'index.html'));
//     res.send({ message: "isRunning" });
// });

// const PORT = 8080;
// app.listen(PORT, () => console.log("Server is running on port", PORT));
app.get("/", async (req, res) => {
    try {
        // Fetch data from the desired endpoint
        const response = await fetch("https://localhost:7188/DateTime");
        console.log(response.json())
        const data = await response.json();

        // Render the HTML page and pass the data to it
        res.sendFile(path.join(__dirname, 'index.html'), { data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
