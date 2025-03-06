import React from "react";

const ProgressTracker = ({ progress }) => {
  return (
    <div className="progress-tracker">
      <h2>Progress</h2>
      <ul>
        {progress.map((result, index) => (
          <li key={index}>
            Test {index + 1}: {result.wpm} WPM, {result.accuracy}% Accuracy
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressTracker; // Default export
