const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World", app: "Tour" });
});

app.post("/", (req, res) => {
    res.send("Data received");
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
