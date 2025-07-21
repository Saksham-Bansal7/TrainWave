import React, { useState, useEffect } from "react";
import PoseTracker from "../components/PoseTracker";
import ExerciseCard from "../components/ExerciseCard";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedExercise, setSelectedExercise] = useState("bicep_curls");
  const [isTracking, setIsTracking] = useState(false);
  const [sessionReps, setSessionReps] = useState(0);
  const [user, setUser] = useState(null);

  // Check user login status
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleStartTracking = () => {
    setIsTracking(true);
    setSessionReps(0);
  };

  const handleStopTracking = async () => {
    setIsTracking(false);

    // Map frontend exercise IDs to database enum values
    const exerciseMapping = {
      pushup: "Push up",
      pullup: "Pull up",
      bicep_curls: "Curls",
      shoulder_raises: "Shoulder raises",
      press: "Press",
      squats: "Squats",
      deadlift: "Deadlift",
    };

    // Save exercise to database if there are reps
    if (sessionReps > 0) {
      try {
        await axiosInstance.post(API_PATHS.EXERCISE.CREATE, {
          exercise: exerciseMapping[selectedExercise] || selectedExercise,
          reps: sessionReps,
        });
        console.log(
          `Session saved! ${sessionReps} reps of ${
            exerciseMapping[selectedExercise] || selectedExercise
          }`
        );
      } catch (error) {
        console.error("Failed to save exercise:", error);
        alert("Failed to save session");
      }
    }

    navigate("/progress"); // Redirect to progress page after saving
  };

  const handleExerciseChange = (exercise) => {
    if (!isTracking) {
      setSelectedExercise(exercise);
      setSessionReps(0);
    }
  };

  const handleRepUpdate = (newCount) => {
    setSessionReps(newCount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Welcome Back,{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {user?.name || "User"}
            </span>
          </h1>
          <p className="text-white/80 text-lg">
            Ready to track your workout with AI precision?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Exercise Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">
                Select Exercise
              </h2>
              <ExerciseCard
                selectedExercise={selectedExercise}
                onExerciseChange={handleExerciseChange}
                disabled={isTracking}
              />

              {/* Control Buttons */}
              <div className="mt-6 space-y-3">
                {!isTracking ? (
                  <button
                    onClick={handleStartTracking}
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg font-semibold"
                  >
                    Start Tracking
                  </button>
                ) : (
                  <button
                    onClick={handleStopTracking}
                    className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg font-semibold"
                  >
                    Stop & Save Session
                  </button>
                )}

                {isTracking && (
                  <div className="text-center">
                    <p className="text-white/60 text-sm">
                      Change exercise only after stopping
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Session Stats */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl mt-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Current Session
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {sessionReps}
                </div>
                <div className="text-white/80 text-sm uppercase tracking-wide">
                  Reps Completed
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-lg font-semibold text-purple-400 capitalize">
                  {selectedExercise.replace("_", " ")}
                </div>
                <div
                  className={`text-sm mt-1 ${
                    isTracking ? "text-green-400" : "text-white/60"
                  }`}
                >
                  {isTracking ? "Tracking Active" : "Ready to Start"}
                </div>
              </div>
            </div>
          </div>

          {/* Pose Tracker */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">
                AI Pose Tracking
              </h2>
              <PoseTracker
                exerciseType={selectedExercise}
                isTracking={isTracking}
                onRepUpdate={handleRepUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
