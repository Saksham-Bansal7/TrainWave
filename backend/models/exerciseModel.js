import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    exercise: {
      type: String,
      enum: [
        "Push up",
        "Pull up",
        "Curls",
        "Shoulder raises",
        "Squats",
        "Press",
        "Deadlift",
      ],
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    // Optionally, you can add a user reference or date field here
  },
  { timestamps: true }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);  
export default Exercise;
