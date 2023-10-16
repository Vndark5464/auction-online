import React, { useEffect, useState } from "react";
import "../assets/css/web.css";

// Component chính
const ServerTimeClock = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    // cleanup this component
    return () => {
      clearInterval(timer);
    };
  }, []);

  const daysInVietnamese = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return (
    <div id="server-time-clock"
        aria-haspopup="true"
        className="wrapper-AtBcr u-isActionable u-textLeft u-inlineBlock u-borderNone u-textBold u-textNoWrap Arrange Arrange--middle u-userLauncherColor">
      <div id="time-part1">{currentDate.toLocaleTimeString()}</div>
      <div id="date-part1">{daysInVietnamese[currentDate.getDay()]} {currentDate.toLocaleDateString()}</div>
    </div>
  );
};

export default ServerTimeClock;