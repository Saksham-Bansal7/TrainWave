import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const ExerciseHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(
          API_PATHS.EXERCISE.GET_USER_EXERCISES
        );
        setHistory(res.data || []);
      } catch (err) {
        setError("Failed to load exercise history.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Get unique exercise types for filter dropdown
  const exerciseTypes = [
    ...new Set(history.map((h) => h.exercise && h.exercise.toLowerCase())),
  ].filter(Boolean);

  // Filtered history
  const filteredHistory =
    filter === "all"
      ? history
      : history.filter(
          (h) => h.exercise && h.exercise.toLowerCase() === filter
        );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-10 shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
          Exercise History
        </h2>
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <label className="text-white/80 font-medium">
            Filter by Exercise:
          </label>
          <select
            className="bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 focus:outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            {exerciseTypes.map((ex) => (
              <option key={ex} value={ex}>
                {ex.charAt(0).toUpperCase() + ex.slice(1)}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="text-white/80 text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-red-400 text-center py-8">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-white/90 text-left">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Exercise</th>
                  <th className="py-2 px-3">Reps</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-6 text-center text-white/60">
                      No history found.
                    </td>
                  </tr>
                ) : (
                  filteredHistory.map((session, idx) => (
                    <tr
                      key={session._id || idx}
                      className={idx % 2 === 0 ? "bg-white/5" : ""}
                    >
                      <td className="py-2 px-3">
                        {session.date
                          ? new Date(session.date).toLocaleString()
                          : session.createdAt
                          ? new Date(session.createdAt).toLocaleString()
                          : "-"}
                      </td>
                      <td className="py-2 px-3 capitalize">
                        {session.exercise || "-"}
                      </td>
                      <td className="py-2 px-3">
                        {session.reps || session.count || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseHistory;
