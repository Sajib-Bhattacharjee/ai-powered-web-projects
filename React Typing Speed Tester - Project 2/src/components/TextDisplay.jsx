// import React from "react";

// const TextDisplay = ({ text, userInput }) => {
//   return (
//     <div className="text-display">
//       {text.split("").map((char, index) => {
//         let color = "black";
//         if (index < userInput.length) {
//           color = userInput[index] === char ? "green" : "red";
//         }
//         return (
//           <span key={index} style={{ color }}>
//             {char}
//           </span>
//         );
//       })}
//     </div>
//   );
// };

// export default TextDisplay;

import React, { useEffect } from "react";
import { playSound } from "../utils";

const TextDisplay = ({ text, userInput }) => {
  useEffect(() => {
    if (userInput.length > 0) {
      const lastChar = userInput[userInput.length - 1];
      const correctChar = text[userInput.length - 1];
      if (lastChar === correctChar) {
        playSound("correct"); // Play correct sound
      } else {
        playSound("error"); // Play error sound
      }
    }
  }, [userInput, text]);

  return (
    <div className="text-display">
      {text.split("").map((char, index) => {
        let color = "black";
        if (index < userInput.length) {
          color = userInput[index] === char ? "green" : "red";
        }
        return (
          <span key={index} style={{ color }}>
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default TextDisplay;
