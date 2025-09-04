import React, { useState } from "react";
import TimesheetHeader from "../components/TimeSheetComponents/TimesheetHeader";
import TimesheetTable from "../components/TimeSheetComponents/TimesheetTable";
import TimesheetComments from "../components/TimeSheetComponents/TimesheetComments";

const TimeSheet = () => {
  const [selectedWeek, setSelectedWeek] = useState("2025-W32");
  const [showAll, setShowAll] = useState(true);

  return (
    <div>
      <TimesheetHeader
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
        showAll={showAll}
        setShowAll={setShowAll}
      />
      <TimesheetTable selectedWeek={selectedWeek} showAll={showAll} />
    </div>
  );
};

export default TimeSheet;
