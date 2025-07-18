import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(API_PATHS.EXERCISE.LEADERBOARD);
        setData(res.data || []);
      } catch (err) {
        setError("Failed to load leaderboard.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  // Reset page if data changes and page is out of range
  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [data, totalPages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-10 shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
          Leaderboard
        </h2>
        {loading ? (
          <div className="text-white/80 text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-red-400 text-center py-8">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-white/90 text-left">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-2 px-3">Rank</th>
                  <th className="py-2 px-3">Username</th>
                  <th className="py-2 px-3">Exercise</th>
                  <th className="py-2 px-3">Most Reps</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-white/60">
                      No leaderboard data yet.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((entry, idx) => (
                    <tr
                      key={entry._id || idx}
                      className={idx % 2 === 0 ? "bg-white/5" : ""}
                    >
                      <td className="py-2 px-3 font-bold">
                        {(page - 1) * pageSize + idx + 1}
                      </td>
                      <td className="py-2 px-3">{entry.username || "-"}</td>
                      <td className="py-2 px-3 capitalize">
                        {entry.exercise || "-"}
                      </td>
                      <td className="py-2 px-3">
                        {entry.reps || entry.maxReps || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
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
    </div>
  );
};

export default Leaderboard;
