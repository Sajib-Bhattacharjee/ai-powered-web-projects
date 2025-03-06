import React from "react";

const InputArea = ({ userInput, setUserInput, disabled }) => {
  return (
    <textarea
      className="input-area"
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      disabled={disabled}
      placeholder="Start typing here..."
      autoFocus
    />
  );
};

export default InputArea;
