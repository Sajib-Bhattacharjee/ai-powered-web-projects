import React from "react";

const Results = ({ wpm, accuracy }) => {
  return (
    <div className="results">
      <h2>Results</h2>
      <p>Words per Minute (WPM): {wpm}</p>
      <p>Accuracy: {accuracy}%</p>
    </div>
  );
};

export default Results; // Default export
