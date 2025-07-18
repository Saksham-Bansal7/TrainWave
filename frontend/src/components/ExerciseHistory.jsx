import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { ChevronLeft, ChevronRight, Trash } from "lucide-react";

const ExerciseHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

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

  // Sort by latest (createdAt or date descending)
  const sortedHistory = [...history].sort((a, b) => {
    const dateA = new Date(a.date || a.createdAt || 0);
    const dateB = new Date(b.date || b.createdAt || 0);
    return dateB - dateA;
  });

  // Filtered history
  const filteredHistory =
    filter === "all"
      ? sortedHistory
      : sortedHistory.filter(
          (h) => h.exercise && h.exercise.toLowerCase() === filter
        );

  // Pagination
  const totalPages = Math.ceil(filteredHistory.length / pageSize);
  const paginatedHistory = filteredHistory.slice(
    (page - 1) * pageSize,
    page * pageSize
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
          <div className="relative w-full sm:w-64">
            <select
              className="appearance-none w-full bg-indigo-900 text-white font-semibold rounded-xl px-5 py-3 pr-10 border border-white/30 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all duration-200 shadow-lg hover:bg-indigo-800 hover:border-cyan-400"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option
                value="all"
                className="capitalize bg-indigo-900 text-white"
              >
                All
              </option>
              {exerciseTypes.map((ex) => (
                <option
                  key={ex}
                  value={ex}
                  className="capitalize bg-indigo-900 text-white"
                >
                  {ex.replace(/\b\w/g, (c) => c.toUpperCase())}
                </option>
              ))}
            </select>
            {/* Custom arrow icon */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
              <svg
                className="w-5 h-5 text-cyan-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
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
                    <td colSpan={4} className="py-6 text-center text-white/60">
                      No history found.
                    </td>
                  </tr>
                ) : (
                  paginatedHistory.map((session, idx) => (
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
                      <td className="py-2 px-3">
                        <button
                          className="px-3 py-1 rounded-lg bg-pink-600 hover:bg-red-400 text-white text-xs font-semibold shadow"
                          onClick={async () => {
                            try {
                              await axiosInstance.delete(
                                API_PATHS.EXERCISE.DELETE(session._id)
                              );
                              setHistory((prev) =>
                                prev.filter((h) => h._id !== session._id)
                              );
                            } catch (err) {
                              alert("Failed to delete.");
                            }
                          }}
                        >
                          <Trash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 disabled:opacity-40"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft />
                </button>
                <span className="text-white/80">
                  Page {page} of {totalPages}
                </span>
                <button
                  className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 disabled:opacity-40"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  <ChevronRight />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseHistory;
