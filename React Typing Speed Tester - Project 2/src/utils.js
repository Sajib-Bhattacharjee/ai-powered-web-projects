// Function to calculate Words Per Minute (WPM)
export const calculateWPM = (correctChars, time) => {
  const words = correctChars / 5; // Average word length is 5 characters
  const minutes = time / 60; // Convert time to minutes
  return Math.round(words / minutes);
};

// Function to calculate accuracy percentage
export const calculateAccuracy = (correctChars, totalChars) => {
  return Math.round((correctChars / totalChars) * 100);
};

// Function to generate random words
export const generateRandomWords = (count) => {
  const words = [
    "the",
    "quick",
    "brown",
    "fox",
    "jumps",
    "over",
    "lazy",
    "dog",
    "hello",
    "world",
    "react",
    "javascript",
    "typing",
    "speed",
    "test",
    "code",
    "developer",
    "challenge",
    "programming",
    "fun",
    "learning",
    "practice",
    "improve",
    "skills",
    "keyboard",
  ];
  let result = "";
  for (let i = 0; i < count; i++) {
    result += words[Math.floor(Math.random() * words.length)] + " ";
  }
  return result.trim(); // Remove the trailing space
};
export const playSound = (sound) => {
  const audio = new Audio(`/assets/sounds/${sound}.mp3`);
  audio.play();
};
