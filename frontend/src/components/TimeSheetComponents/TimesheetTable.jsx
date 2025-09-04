import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTimesheetManager } from "../../hooks/useTimeSheetManager";
import { useSnackbar } from "notistack";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const PAGE_SIZE = 10;

const TimesheetTable = ({ selectedWeek, showAll }) => {
  const { timesheets, fetchData, add, remove, loading } = useTimesheetManager();
  const { enqueueSnackbar } = useSnackbar();
  const [localTimesheets, setLocalTimesheets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData(showAll ? null : selectedWeek);
  }, [selectedWeek, showAll]);

  useEffect(() => {
    if (!loading) {
      const filtered = showAll ? timesheets : timesheets.filter(t => t.week === selectedWeek);
      setLocalTimesheets(filtered.map(entry => ({ ...entry })));
      setCurrentPage(1);
    }
  }, [timesheets, selectedWeek, showAll, loading]);

  const paginatedTimesheets = useMemo(() => {
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    return localTimesheets.slice(startIdx, startIdx + PAGE_SIZE);
  }, [localTimesheets, currentPage]);

  const handleInputChange = useCallback((index, dayIndex, value) => {
    if (value === "" || !isNaN(value)) {
      setLocalTimesheets(prev => {
        const updated = [...prev];
        updated[index].dailyHours[dayIndex] = value;
        return updated;
      });
    }
  }, []);

  const handleAddRow = () => {
    setLocalTimesheets(prev => [
      ...prev,
      {
        project: "",
        role: "",
        activity: "",
        week: selectedWeek,
        dailyHours: Array(7).fill(""),
      },
    ]);
    enqueueSnackbar("New row added", { variant: "info" });
  };

  const handleSave = async () => {
    const newEntries = localTimesheets.filter(entry => !entry._id);
    const validTimesheets = newEntries.map(t => ({
      ...t,
      dailyHours: t.dailyHours.map(h => parseFloat(h) || 0),
      week: selectedWeek,
    }));

    if (validTimesheets.length === 0) {
      enqueueSnackbar("No new entries to save", { variant: "info" });
      return;
    }

    try {
      await add(validTimesheets);
      enqueueSnackbar("Timesheets saved successfully!", { variant: "success" });
      fetchData(showAll ? null : selectedWeek);
    } catch (err) {
      console.error("Save failed", err);
      enqueueSnackbar("Failed to save timesheets", { variant: "error" });
    }
  };

  const handleDelete = async (index, id) => {
    try {
      if (id) {
        await remove(id);
        enqueueSnackbar("Timesheet deleted successfully", { variant: "success" });
      } else {
        setLocalTimesheets(prev => {
          const updated = [...prev];
          updated.splice(index, 1);
          return updated;
        });
        enqueueSnackbar("Unsaved row removed", { variant: "info" });
      }
    } catch (err) {
      console.error("Delete failed", err);
      enqueueSnackbar("Failed to delete timesheet", { variant: "error" });
    }
  };

  const totalPages = Math.ceil(localTimesheets.length / PAGE_SIZE);

  return (
    <div className="mt-2 bg-white rounded-xl shadow-md space-y-6 overflow-hidden mb-2">
      <h2 className="text-xl font-semibold p-6 border-b border-gray-100">Timesheet</h2>

      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading timesheets...</div>
      ) : (
        <div className="rounded-md border border-gray-200 mx-6 mb-6 overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[800px]">
            <thead className="bg-gray-300 text-gray-800">
              <tr>
                <th className="p-3">Project</th>
                <th className="p-3">Role</th>
                <th className="p-3">Activity</th>
                {daysOfWeek.map((day, idx) => (
                  <th key={idx} className="p-3 text-center">{day}</th>
                ))}
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTimesheets.map((item, i) => {
                const globalIndex = (currentPage - 1) * PAGE_SIZE + i;
                return (
                  <tr key={globalIndex} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                    <td className="p-3">
                      <input
                        type="text"
                        value={item.project}
                        onChange={e => {
                          const val = e.target.value;
                          setLocalTimesheets(prev => {
                            const updated = [...prev];
                            updated[globalIndex].project = val;
                            return updated;
                          });
                        }}
                        className="bg-yellow-100 rounded px-3 py-1 w-full outline-none"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={item.role}
                        onChange={e => {
                          const val = e.target.value;
                          setLocalTimesheets(prev => {
                            const updated = [...prev];
                            updated[globalIndex].role = val;
                            return updated;
                          });
                        }}
                        className="bg-yellow-100 rounded px-3 py-1 w-full outline-none"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={item.activity}
                        onChange={e => {
                          const val = e.target.value;
                          setLocalTimesheets(prev => {
                            const updated = [...prev];
                            updated[globalIndex].activity = val;
                            return updated;
                          });
                        }}
                        className="bg-yellow-100 rounded px-3 py-1 w-full outline-none"
                      />
                    </td>
                    {item.dailyHours.map((hour, dayIndex) => (
                      <td key={dayIndex} className="p-3 text-center">
                        <input
                          type="text"
                          value={hour}
                          onChange={e => handleInputChange(globalIndex, dayIndex, e.target.value)}
                          className="bg-blue-100 text-sm px-2 py-1 rounded w-16 text-center outline-none"
                        />
                      </td>
                    ))}
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDelete(globalIndex, item._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 px-6">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="text-blue-600 disabled:text-gray-400"
          >
            Previous
          </button>
          <span className="text-sm">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="text-blue-600 disabled:text-gray-400"
          >
            Next
          </button>
        </div>
      )}

      <div className="flex items-center flex-wrap gap-4 px-6 pb-6">
        <button
          onClick={handleAddRow}
          className="border border-blue-600 text-blue-600 px-4 py-2 rounded-full text-sm hover:bg-blue-50"
        >
          + Add row
        </button>
        <div className="flex-grow" />
        <button
          onClick={handleSave}
          className="bg-green-500 px-4 py-2 rounded-full text-sm text-white font-medium hover:bg-green-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TimesheetTable;
