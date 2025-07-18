import React from "react";

const ExerciseCard = ({ selectedExercise, onExerciseChange, disabled }) => {
  const exercises = [
    {
      id: "pushup",
      name: "Push-ups",
      icon: "💪",
      description: "Chest & triceps",
    },
    {
      id: "pullup",
      name: "Pull-ups",
      icon: "🏋️",
      description: "Back & biceps",
    },
    {
      id: "bicep_curls",
      name: "Bicep Curls",
      icon: "💪",
      description: "Bicep strength",
    },
    {
      id: "shoulder_raises",
      name: "Shoulder Raises",
      icon: "🤸",
      description: "Shoulder strength",
    },
    {
      id: "press",
      name: "Press",
      icon: "🏋️‍♀️",
      description: "Overhead press",
    },
    {
      id: "squats",
      name: "Squats",
      icon: "🦵",
      description: "Leg strength",
    },
    {
      id: "deadlift",
      name: "Deadlift",
      icon: "⚡",
      description: "Full body",
    },
  ];

  return (
    <div className="space-y-3">
      {exercises.map((exercise) => (
        <button
          key={exercise.id}
          onClick={() => onExerciseChange(exercise.id)}
          disabled={disabled}
          className={`w-full p-4 rounded-xl transition-all duration-300 text-left ${
            selectedExercise === exercise.id
              ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg transform scale-105"
              : "bg-white/5 hover:bg-white/10 text-white/80 hover:text-white"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"}`}
        >
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{exercise.icon}</span>
            <div className="flex-1">
              <div className="font-semibold">{exercise.name}</div>
              <div
                className={`text-sm ${
                  selectedExercise === exercise.id
                    ? "text-white/90"
                    : "text-white/60"
                }`}
              >
                {exercise.description}
              </div>
            </div>
            {selectedExercise === exercise.id && (
              <div className="text-cyan-300">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default ExerciseCard;
