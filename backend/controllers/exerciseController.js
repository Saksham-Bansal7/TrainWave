import Exercise from "../models/exerciseModel.js";

const createExercise = async (req, res) => {
    const { exercise, reps } = req.body;
    const userId = req.user._id;
    try {
        const newExercise = new Exercise({
            exercise,
            reps,
            user: userId,
        });
        const savedExercise = await newExercise.save();
        res.status(201).json(savedExercise);
    } catch (error) {
        res.status(500).json({ message: "Failed to create exercise", error: error.message });
    }
};

const getUserExercises = async (req, res) => {
    const userId = req.user._id;
    try {
        const exercises = await Exercise.find({ user: userId });
        res.status(200).json(exercises);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve exercises", error: error.message });
    }
};

const deleteExercise = async (req, res) => {
    const exerciseId = req.params.id;
    try {
        const exercise = await Exercise.findByIdAndDelete(exerciseId);
        if (!exercise) {
            return res.status(404).json({ message: "Exercise not found" });
        }
        res.status(200).json({ message: "Exercise deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete exercise", error: error.message });
    }
};

const getLeaderboard = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        const leaderboard = exercises
            .sort((a, b) => b.reps - a.reps)
            .map(exercise => ({
                exercise: exercise.exercise,
                reps: exercise.reps,
                user: exercise.user,
            }))
            .slice(0, 10);
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve leaderboard", error: error.message });
    }
};

export { createExercise, getUserExercises, deleteExercise, getLeaderboard };