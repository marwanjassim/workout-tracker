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
// the /range part is optional
app.get("/api/workouts(/range)?", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});
// PUT /api/workouts/id: add exercise to workout with id
app.put("/api/workouts/:id", (req, res) => {
  // grt workout from mongodb using id
  db.Workout.findById(req.params.id)
    .then(dbWorkout => {
      //add exercise data to workout
      dbWorkout.exercises.push(req.body);
      dbWorkout
        .save()
        .then(finalWorkout => {
          res.json(finalWorkout);
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });
});

// POST /api/workouts: add new workout
app.post("/api/workouts", (req, res) => {
  db.Workout.create({
    day: new Date()
  })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
