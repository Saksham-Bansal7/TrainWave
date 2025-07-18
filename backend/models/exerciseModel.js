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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);
export default Exercise;
