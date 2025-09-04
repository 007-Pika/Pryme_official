// // src/hooks/useTimesheetActions.js

// import { useState } from "react";
// import axios from "../utils/axiosInstance";

// export const useTimesheetActions = () => {
//   const [timesheets, setTimesheets] = useState([]);

//   const fetchTimesheets = async (params = {}) => {
//     try {
//       const queryString = new URLSearchParams(params).toString();
//       const res = await axios.get(`/timesheets/get?${queryString}`);
//       setTimesheets(res.data);
//     } catch (err) {
//       console.error("Failed to fetch timesheets:", err);
//     }
//   };

//   const addTimesheet = async (payloadArray) => {
//     try {
//       const res = await axios.post("/timesheets/save", { timesheets: payloadArray });
//       setTimesheets((prev) => [...prev, ...res.data]);
//     } catch (err) {
//       console.error("Failed to add timesheets:", err);
//     }
//   };

//   const updateTimesheet = async (payload) => {
//     try {
//       const res = await axios.put("/timesheets/update", payload);
//       setTimesheets((prev) =>
//         prev.map((t) => (t._id === res.data._id ? res.data : t))
//       );
//     } catch (err) {
//       console.error("Failed to update timesheet:", err);
//     }
//   };

//   const deleteTimesheet = async (id) => {
//     try {
//       await axios.delete(`/timesheets/${id}/delete`);
//       setTimesheets((prev) => prev.filter((t) => t._id !== id));
//     } catch (err) {
//       console.error("Failed to delete timesheet:", err);
//     }
//   };

//   return {
//     timesheets,
//     fetchTimesheets,
//     addTimesheet,
//     updateTimesheet,
//     deleteTimesheet,
//   };
// };
