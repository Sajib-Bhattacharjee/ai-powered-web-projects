import React from "react";

const DifficultySelector = ({ difficulty, setDifficulty }) => {
  return (
    <div className="difficulty-selector">
      <label>Select Difficulty: </label>
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
};

export default DifficultySelector; // Default export
