import React, { useEffect } from "react";

const Timer = ({ isActive, time, setTime }) => {
  useEffect(() => {
    let interval;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, time, setTime]);

  return <div className="timer">Time Remaining: {time}s</div>;
};

export default Timer;
