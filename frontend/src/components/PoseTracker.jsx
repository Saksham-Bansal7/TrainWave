// PoseTracker.jsx
import React, { useEffect, useRef, useState } from "react";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import * as drawUtils from "@mediapipe/drawing_utils";

let counter = 0;
let position = "START";
let exercise_active = false;

const PoseTracker = ({ exerciseType, isTracking, onRepUpdate }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [count, setCount] = useState(0);
  const [currPosition, setCurrPosition] = useState("START");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset counter when exercise type changes or tracking starts
    counter = 0;
    setCount(0);
    position = "START";
    setCurrPosition("START");
    exercise_active = false;
    
    // Force a small delay to ensure state is properly reset
    setTimeout(() => {
      exercise_active = false;
    }, 100);
  }, [exerciseType, isTracking]);

  useEffect(() => {
    if (onRepUpdate) {
      onRepUpdate(count);
    }
  }, [count, onRepUpdate]);

  useEffect(() => {
    if (!isTracking) return;

    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(onResults);

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await pose.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });

    camera.start().then(() => {
      setIsLoading(false);
    });

    return () => {
      // Cleanup
      camera.stop();
    };
  }, [exerciseType, isTracking]);

  const onResults = (results) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

    if (results.poseLandmarks && isTracking) {
      drawUtils.drawConnectors(
        ctx,
        results.poseLandmarks,
        Pose.POSE_CONNECTIONS,
        {
          color: "#00FFFF",
          lineWidth: 3,
        }
      );
      drawUtils.drawLandmarks(ctx, results.poseLandmarks, {
        color: "#FF6B6B",
        lineWidth: 2,
      });

      const points = results.poseLandmarks.map((lm) => ({
        x: lm.x * canvas.width,
        y: lm.y * canvas.height,
      }));

      trackExercise(points);
    }

    ctx.restore();
  };

  const trackExercise = (points) => {
    // Additional safety check - ensure exercise_active is properly reset
    if (position === "START") {
      exercise_active = false;
    }
    
    switch (exerciseType) {
      case "pushup":
        trackPushup(points);
        break;
      case "pullup":
        trackPullup(points);
        break;
      case "bicep_curls":
        trackCurls(points);
        break;
      case "shoulder_raises":
        trackShoulderRaises(points);
        break;
      case "press":
        trackPress(points);
        break;
      case "squats":
        trackSquats(points);
        break;
      case "deadlift":
        trackDeadlift(points);
        break;
      default:
        break;
    }
  };

  const update = (pos, shouldCount) => {
    position = pos;
    setCurrPosition(pos);
    if (shouldCount) {
      counter++;
      setCount(counter);
    }
  };

  // === Converted Tracking Functions ===

  const trackPushup = (p) => {
    if (!exercise_active && p[12].y < p[14].y) {
      update("UP", true);
      exercise_active = true;
    } else if (exercise_active && p[12].y - 60 > p[14].y) {
      update("DOWN", false);
      exercise_active = false;
    }
  };

  const trackPullup = (p) => {
    if (!exercise_active && p[12].y - 50 < p[16].y && p[11].y - 50 < p[15].y) {
      update("UP", false);
      exercise_active = true;
    } else if (
      exercise_active &&
      p[12].y - 200 > p[16].y &&
      p[11].y - 200 > p[15].y
    ) {
      update("DOWN", true);
      exercise_active = false;
    }
  };

  const trackCurls = (p) => {
    if (!exercise_active && p[14].y - 50 > p[16].y && p[13].y - 50 > p[15].y) {
      update("UP", false);
      exercise_active = true;
    } else if (
      exercise_active &&
      p[14].y + 70 < p[16].y &&
      p[15].y + 70 > p[13].y
    ) {
      update("DOWN", true);
      exercise_active = false;
    }
  };

  const trackShoulderRaises = (p) => {
    if (!exercise_active && p[14].y + 30 < p[12].y && p[13].y + 30 < p[11].y) {
      update("UP", false);
      exercise_active = true;
    } else if (
      exercise_active &&
      p[14].y - 30 > p[12].y &&
      p[13].y - 30 > p[11].y
    ) {
      update("DOWN", true);
      exercise_active = false;
    }
  };

  const trackPress = (p) => {
    if (!exercise_active && p[12].y - 50 < p[16].y && p[11].y - 50 < p[15].y) {
      update("DOWN", true);
      exercise_active = true;
    } else if (
      exercise_active &&
      p[12].y - 200 > p[16].y &&
      p[11].y - 200 > p[15].y
    ) {
      update("UP", false);
      exercise_active = false;
    }
  };

  const trackSquats = (p) => {
    if (!exercise_active && p[24].y > p[26].y) {
      update("DOWN", false);
      exercise_active = true;
    } else if (exercise_active && p[24].y + 50 < p[26].y) {
      update("UP", true);
      exercise_active = false;
    }
  };

  const trackDeadlift = (p) => {
    if (!exercise_active && p[25].y > p[15].y) {
      update("UP", false);
      exercise_active = true;
    } else if (exercise_active && p[25].y + 70 < p[15].y) {
      update("DOWN", true);
      exercise_active = false;
    }
  };

  return (
    <div className="relative">
      <video ref={videoRef} style={{ display: "none" }} />

      {/* Canvas Container */}
      <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          className="w-full h-auto max-w-full"
        />

        {/* Overlay Info */}
        {isTracking && (
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="text-cyan-400 text-lg font-bold">
                {count} Reps
              </div>
              <div className="text-white/80 text-sm capitalize">
                {exerciseType.replace("_", " ")}
              </div>
            </div>
            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
              <div
                className={`text-sm font-semibold ${
                  currPosition === "UP"
                    ? "text-green-400"
                    : currPosition === "DOWN"
                    ? "text-yellow-400"
                    : "text-white/60"
                }`}
              >
                {currPosition}
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && isTracking && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
              <p>Loading camera...</p>
            </div>
          </div>
        )}

        {/* Not Tracking State */}
        {!isTracking && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-6xl mb-4">📷</div>
              <p className="text-lg">Press "Start Tracking" to begin</p>
              <p className="text-white/60 text-sm mt-2">
                Camera will activate when you start
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Exercise Instructions */}
      <div className="mt-4 bg-white/5 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-2">
          Exercise: {exerciseType.replace("_", " ").toUpperCase()}
        </h4>
        <p className="text-white/70 text-sm">
          Position yourself in front of the camera and perform the exercise. The
          AI will automatically count your reps.
        </p>
      </div>
    </div>
  );
};

export default PoseTracker;
