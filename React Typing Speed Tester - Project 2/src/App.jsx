import React, { useState, useEffect } from "react";
import TextDisplay from "./components/TextDisplay";
import InputArea from "./components/InputArea";
import Timer from "./components/Timer";
import Results from "./components/Results";
import DifficultySelector from "./components/DifficultySelector";
import ProgressTracker from "./components/ProgressTracker";
import { calculateWPM, calculateAccuracy, generateRandomWords } from "./utils";
import useLocalStorage from "./hooks/useLocalStorage";
import "./styles.css";

const App = () => {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [time, setTime] = useState(0);
  const [isTestActive, setIsTestActive] = useState(false);
  const [results, setResults] = useState({ wpm: 0, accuracy: 0 });
  const [difficulty, setDifficulty] = useLocalStorage("difficulty", "easy");
  const [progress, setProgress] = useLocalStorage("progress", []);
  const [timerDuration, setTimerDuration] = useState(60); // Default timer duration (60 seconds)

  // Generate initial text
  useEffect(() => {
    setText(generateRandomWords(20)); // Generate 20 random words initially
  }, [difficulty]);

  // Add more words as the user types
  useEffect(() => {
    if (isTestActive && userInput.length >= text.length - 10) {
      setText((prevText) => prevText + " " + generateRandomWords(10)); // Add 10 more words
    }
  }, [userInput, isTestActive, text]);

  // Start the test
  const startTest = () => {
    setIsTestActive(true);
    setUserInput("");
    setTime(timerDuration); // Set the timer to the selected duration
    setResults({ wpm: 0, accuracy: 0 });
  };

  // End the test
  const endTest = () => {
    setIsTestActive(false);
    const correctChars = userInput
      .split("")
      .filter((char, index) => char === text[index]).length;
    const wpm = calculateWPM(correctChars, timerDuration - time);
    const accuracy = calculateAccuracy(correctChars, text.length);
    setResults({ wpm, accuracy });
    setProgress([...progress, { wpm, accuracy }]);
  };

  // Handle timer completion
  useEffect(() => {
    if (isTestActive && time === 0) {
      endTest();
    }
  }, [time, isTestActive]);

  return (
    <div className="app">
      <h1>Typing Speed Test</h1>
      <DifficultySelector
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />
      <div className="timer-selector">
        <label>Select Timer Duration: </label>
        <select
          value={timerDuration}
          onChange={(e) => setTimerDuration(Number(e.target.value))}
          disabled={isTestActive}
        >
          <option value={30}>30 seconds</option>
          <option value={60}>60 seconds</option>
          <option value={90}>90 seconds</option>
          <option value={120}>120 seconds</option>
        </select>
      </div>
      <TextDisplay text={text} userInput={userInput} />
      <InputArea
        userInput={userInput}
        setUserInput={setUserInput}
        disabled={!isTestActive}
      />
      <Timer isActive={isTestActive} time={time} setTime={setTime} />
      {!isTestActive && time === 0 && (
        <Results wpm={results.wpm} accuracy={results.accuracy} />
      )}
      <button onClick={startTest} disabled={isTestActive}>
        Start Test
      </button>
      <ProgressTracker progress={progress} />
    </div>
  );
};

export default App;
