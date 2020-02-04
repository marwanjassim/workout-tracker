const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// discriminator looks at type to know what type of excercise
var options = { discriminatorKey: "type" };

var ExerciseSchema = new mongoose.Schema(
  {
    name: String,
    duration: Number
  },
  options
);

var Exercise = mongoose.model("Exercise", ExerciseSchema);

var CardioExercise = Exercise.discriminator(
  "cardio",
  new mongoose.Schema({ distance: Number }, options)
);

var ResistanceExercise = Exercise.discriminator(
  "resistance",
  new mongoose.Schema(
    {
      weight: Number,
      reps: Number,
      sets: Number
    },
    options
  )
);

module.exports = {
  Exercise: Exercise,
  CardioExercise: CardioExercise,
  ResistanceExercise: ResistanceExercise
};
