const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
app.get("/api/v1/tours", (req, res) => {
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours: tours,
        },
    });
});

app.get("/api/v1/tours/:id", (req, res) => {
    const { id } = req.params;
    const found_tour = tours.find((t) => t.id === Number(id));
    const data = found_tour ? found_tour : { status: "error", message: "Tour not found" };
    res.status(200).json(data);
});

app.post("/api/v1/tours", (req, res) => {
    const new_id = tours.length;
    const new_tour = { id: new_id, ...req.body };
    tours.push(new_tour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
        res.status(201).json({
            status: "success",
            data: {
                tour: new_tour,
            },
        });
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
