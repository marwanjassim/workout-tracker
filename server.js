const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// the extensions option tells express to try adding .html if it can't find
// a file, I found it in this link:
// https://stackoverflow.com/questions/16895047/any-way-to-serve-static-html-files-from-express-without-the-extension
app.use(
  express.static(path.join(__dirname, "public"), { extensions: ["html"] })
);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true
});

// App routes

// GET /api/workouts: get all workouts
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .exec()
    .then(dbWorkout => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});
// PUT /api/workouts/id: add exercise to workout with id
// POST /api/workouts: add new workout

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
