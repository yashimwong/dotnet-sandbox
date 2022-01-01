const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tour.routes");
const userRouter = require("./routes/user.route");

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

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
