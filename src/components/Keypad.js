// This React component renders a keypad interface

import { useEffect } from "react";

// Define the flatKeypad variable outside of the component function
const flatKeypad = []; // Initialize it as an empty array

// Keypad component
const Keypad = ({ keypadLetters }) => {
  // Flatten the keypad data and add the 'state' property to each key
  useEffect(() => {
    // Check if keypadLetters is provided
    if (keypadLetters) {
      // Flatten the keypadLetters array and add the 'state' property to each key
      const flatData = keypadLetters.flat().map((key) => ({ key, state: "" }));

      // Push the flattened data into flatKeypad
      flatKeypad.push(...flatData);
    }
  }, [keypadLetters]); // Run this effect whenever keypadLetters changes

  // Attach click event listeners to keypad keys when the component mounts

  return (
    <div className="keypad">
      {keypadLetters && // Check if keypadLetters is provided
        keypadLetters.map((row, rowIndex) => (
          <div key={rowIndex} className="keypad-row">
            {row.map((letter, letterIndex) => (
              <button
                key={letterIndex}
                className="keypad-key"
                data-key={letter}
              >
                {letter}
              </button>
            ))}
          </div>
        ))}
    </div>
  );
};

// Export the flatKeypad variable so it can be accessed from other modules
export { flatKeypad };

// Export the Keypad component as the default export
export default Keypad;
