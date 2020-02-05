const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// discriminator looks at type to know what type of excercise
var options = {
  discriminatorKey: "type",
  _id: false
};

var ExerciseSchema = new mongoose.Schema(
  {
    type: { type: String },
    name: String,
    duration: Number
  },
  options
);

const WorkoutSchema = new Schema({
  day: Date,
  exercises: [ExerciseSchema]
});

const WorkoutExercises = WorkoutSchema.path("exercises");

var CardioExercise = WorkoutExercises.discriminator(
  "cardio",
  new mongoose.Schema({ distance: Number }, { _id: false })
);

var ResistanceExercise = WorkoutExercises.discriminator(
  "resistance",
  new mongoose.Schema(
    {
      weight: Number,
      reps: Number,
      sets: Number
    },
    { _id: false }
  )
);

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = {
  Workout: Workout,
  CardioExercise: CardioExercise,
  ResistanceExercise: ResistanceExercise
};
