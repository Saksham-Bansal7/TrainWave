import React from "react";
import { FaDumbbell } from "react-icons/fa"; // For deadlift / general fitness
import { GiBiceps, GiShoulderArmor, GiWeightLiftingDown, GiWeightLiftingUp } from "react-icons/gi"; // For strength icons
import { GiMuscularTorso } from "react-icons/gi";
import { GiLeg } from "react-icons/gi";

const ExerciseCard = ({ selectedExercise, onExerciseChange, disabled }) => {
  const exercises = [
    {
      id: "pushup",
      name: "Push-ups",
      icon: <GiMuscularTorso />,
      description: "Chest & triceps",
    },
    {
      id: "pullup",
      name: "Pull-ups",
      icon: <GiWeightLiftingUp />,
      description: "Back & biceps",
    },
    {
      id: "bicep_curls",
      name: "Bicep Curls",
      icon: <GiBiceps />,
      description: "Bicep strength",
    },
    {
      id: "shoulder_raises",
      name: "Shoulder Raises",
      icon: <GiShoulderArmor />,
      description: "Shoulder strength",
    },
    {
      id: "press",
      name: "Press",
      icon: <GiWeightLiftingUp />,
      description: "Overhead press",
    },
    {
      id: "squats",
      name: "Squats",
      icon: <GiLeg />,
      description: "Leg strength",
    },
    {
      id: "deadlift",
      name: "Deadlift",
      icon: <FaDumbbell />,
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
