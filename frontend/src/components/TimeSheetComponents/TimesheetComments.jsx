import React from "react";

const TimesheetComments = () => {
  return (
    <div className="bg-white rounded-xl shadow-md space-y-6 overflow-hidden">
      <h2 className="text-xl font-semibold p-6 border-b border-gray-100">Comments</h2>

      <div className="rounded-md border border-gray-200 mx-6 mb-6 overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[700px]">
          <thead className="bg-gray-300 text-gray-800">
            <tr>
              <th className="p-3 whitespace-nowrap">Date</th>
              <th className="p-3 whitespace-nowrap">Project Task</th>
              <th className="p-3 whitespace-nowrap">Role</th>
              <th className="p-3 whitespace-nowrap">Activity</th>
              <th className="p-3 text-center whitespace-nowrap">Hours</th>
              <th className="p-3 whitespace-nowrap">Comments</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                date: "15 Jan",
                project: "Project 1",
                role: "Specialist",
                activity: "Development",
                hours: "8.00",
                comment: "Prepared a presentation for CEO",
              },
              {
                date: "16 Jan",
                project: "Project 2",
                role: "Specialist",
                activity: "Development",
                hours: "8.00",
                comment: "Planned employees vacations",
              },
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                <td className="p-3">{row.date}</td>
                <td className="p-3">{row.project}</td>
                <td className="p-3">{row.role}</td>
                <td className="p-3">{row.activity}</td>
                <td className="p-3 text-center">{row.hours}</td>
                <td className="p-3">{row.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimesheetComments;
