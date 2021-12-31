const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
    console.log("Hello from the middleware");
    next();
});

app.use((req, res, next) => {
    req.request_time = new Date().toISOString();
    next();
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        results: tours.length,
        request_time: req.request_time,
        data: {
            tours: tours,
        },
    });
};

const findTour = (id) => {
    const found_tour = tours.find((t) => t.id === Number(id));
    const data = found_tour ? found_tour : { status: "error", message: "Tour not found" };
    const status_code = found_tour ? 200 : 404;
    return { data, status_code };
};

const getTour = (req, res) => {
    const { id } = req.params;
    const { data, status_code } = findTour(id);
    res.status(status_code).json(data);
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
    const { id } = req.params;
    const { data, status_code } = findTour(id);
    if (status_code === 404) {
        res.status(status_code).json(data);
    } else {
        const updated_tour = { ...req.body, id: data.id };
        const new_tours = tours.map((tour) => {
            if (tour.id === data.id) {
                return updated_tour;
            }
            return tour;
        });
        fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(new_tours), (err) => {
            res.status(201).json({
                status: "success",
                data: {
                    tour: updated_tour,
                },
            });
        });
    }
};

const deleteTour = (req, res) => {
    const { id } = req.params;
    const { data, status_code } = findTour(id);
    if (status_code === 404) {
        res.status(status_code).json(data);
    } else {
        const new_tours = tours.filter((tour) => tour.id !== data.id);
        fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(new_tours), (err) => {
            res.status(201).json({
                status: "success",
                data: {
                    tour: data,
                },
            });
        });
    }
};

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app.route("/api/v1/tours/:id").get(getTour).patch(updateTour).delete(deleteTour);

const port = 3000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
