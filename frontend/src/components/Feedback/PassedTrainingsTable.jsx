import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const PassedTrainingsTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosInstance.get("/reviews", { withCredentials: true });
        setRows(data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm -translate-x-6 -mt-6">
      <h2 className="font-semibold mb-4">Feedback</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">User</th>
              <th className="p-2">Review</th>
              <th className="p-2">Rating (? / 5)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row._id || idx}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-2">
                  {new Date(row.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  })}
                </td>
                <td className="p-2">{row.user?.name || "N/A"}</td>
                <td className="p-2">{row.feedback}</td>
                <td className="p-2">{row.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PassedTrainingsTable;
