import { useState, useCallback } from "react";
import axios from "../utils/axiosInstance";

export const useTimesheetManager = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (week = null) => {
    setLoading(true);
    try {
      const { data } = await axios.get(week ? `/timesheets?week=${week}` : "/timesheets");
      setTimesheets(data);
    } catch (err) {
      console.error("Error fetching timesheets", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const add = useCallback(async (data) => {
    const { data: response } = await axios.post("/timesheets", { timesheets: data });
    const newEntries = Array.isArray(response) ? response : [response];
    setTimesheets((prev) => [...prev, ...newEntries]);
    return response;
  }, []);

  const update = useCallback(async (id, data) => {
    const { data: updated } = await axios.put(`/timesheets/${id}`, data);
    setTimesheets((prev) => prev.map((t) => (t._id === id ? updated : t)));
    return updated;
  }, []);

  const remove = useCallback(async (id) => {
    await axios.delete(`/timesheets/${id}`);
    setTimesheets((prev) => prev.filter((t) => t._id !== id));
  }, []);

  return { timesheets, fetchData, add, update, remove, loading };
};
