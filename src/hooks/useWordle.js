// This code defines a "custom hook" for managing the state and logic of a Wordle game. It provides functions and state variables to handle game turns, guesses, user input from both the keyboard and keypad, and game logic. It also includes some error checking and setCustomAlerts for various game.

import { useState } from "react";
import { flatKeypad } from "../components/Keypad";

// Custom hook for managing a Wordle game
const useWordle = (solution, validGuesses) => {
  // Initialize game state variables
  const [turn, setTurn] = useState(0); // Track the current turn
  const [guesses, setGuesses] = useState(Array(6).fill(null)); // Store the guesses
  const [currentGuess, setCurrentGuess] = useState(""); // Track the current guess being typed
  const [isCorrect, setIsCorrect] = useState(false); // Indicate if the game is over

  const setCustomAlert = (message) => {
    console.log(message);
    let snackbar = document.querySelector(".snackbar");
    snackbar.innerHTML = message;
    snackbar.classList.add("show");

    setTimeout(function () {
      snackbar.classList.remove("show");
    }, 2000);
  };

  // Function to format a guess into an array of letter objects
  const formatGuess = () => {
    // Convert the solution to an array
    let solutionArray = [...solution];
    // Map the current guess characters to letter objects
    let formattedGuess = [...currentGuess].map((char) => {
      return { key: char, state: "absent" }; // Initialize with "absent" state
    });

    // Compare each character in the guess to the solution
    formattedGuess.forEach((letter, i) => {
      if (solutionArray[i] === letter.key) {
        letter.state = "correct"; // Mark as "correct" if it matches the solution
      } else if (solutionArray.includes(letter.key)) {
        letter.state = "present"; // Mark as "present" if it exists in the solution
      } else {
        letter.state = "absent"; // Mark as "absent" if it doesn't match or exist
      }
    });

    return formattedGuess;
  };

  // Function to add a new guess to the game state
  const addNewGuess = (formattedGuess) => {
    // Check if the guess is correct and end the game if it is
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    // Add the new guess to the guesses state at the current turn
    setGuesses((guesses) => {
      guesses[turn] = formattedGuess;
      return guesses;
    });

    // Increment the turn count
    setTurn((turn) => {
      return turn + 1;
    });

    // Reset the current guess to an empty string
    setCurrentGuess("");
  };

  const addUsedKeys = (formattedGuess) => {
    // Loop through the formattedGuess
    formattedGuess.forEach((guess) => {
      // Loop through the flatKeypad to find a matching key
      flatKeypad.forEach((keypadKey) => {
        if (keypadKey.key === guess.key) {
          // Select the corresponding keypad button
          const keypadButton = document.querySelector(
            `[data-key="${keypadKey.key}"]`
          );

          // Check if the keypad button has a 'data-state' attribute
          if (keypadButton) {
            // Check if the current 'data-state' is not 'correct'
            if (keypadButton.getAttribute("data-state") !== "correct") {
              // Set the 'data-state' attribute to the 'state' property of the guess
              keypadButton.setAttribute("data-state", guess.state);
            }
          }
        }
      });
    });
  };

  // Function to handle keyboard key presses during the game
  const handleKeyboard = ({ key }) => {
    // Check if the Enter key is pressed
    if (key === "Enter") {
      console.log("Clicked key from Keyboard:", key);
      // Only add a guess if the turn limit is not reached
      if (turn > 5) {
        setCustomAlert("You've run out of guesses");
        return;
      }
      // Check if the current guess has exactly 5 characters
      if (currentGuess.length !== 5) {
        setCustomAlert("Not enough letters");
        return;
      }

      if (validGuesses.includes(currentGuess)) {
        // Format the guess and add it to the game
        const formatted = formatGuess();
        addNewGuess(formatted);
        // Add a delay of 2 seconds before calling addUsedKeys
        setTimeout(() => {
          addUsedKeys(formatted);
        }, 2000);
      } else {
        setCustomAlert("Not in word list");
      }
    }

    // Handle Backspace key to delete characters from the current guess
    if (key === "Backspace") {
      setCurrentGuess((currentGuess) => {
        return currentGuess.slice(0, -1);
      });
      return;
    }

    // Handle letter keys (a-zA-Z) to build the current guess
    if (/^[a-zA-Z]$/.test(key)) {
      // Ensure the current guess has less than 5 characters
      if (currentGuess.length < 5) {
        setCurrentGuess((currentGuess) => {
          return currentGuess + key.toUpperCase();
        });
      }
    }
  };

  // Function to handle keypad key presses during the game
  const handleKeypad = (event) => {
    let key = event.target.getAttribute("data-key");
    // Check if the Enter key is pressed
    if (key === "ENTER") {
      // Only add a guess if the turn limit is not reached
      if (turn > 5) {
        setCustomAlert("You've run out of guesses");
        return;
      }
      // Check if the current guess has exactly 5 characters
      if (currentGuess.length !== 5) {
        setCustomAlert("Not enough letters");
        return;
      }

      if (validGuesses.includes(currentGuess)) {
        // Format the guess and add it to the game
        const formatted = formatGuess();
        addNewGuess(formatted);
        // Add a delay of 2 seconds before calling addUsedKeys
        setTimeout(() => {
          addUsedKeys(formatted);
        }, 2000);
      } else {
        setCustomAlert("Not in word list");
      }
    }

    // Handle Backspace key to delete characters from the current guess
    if (key === "DEL") {
      setCurrentGuess((currentGuess) => {
        return currentGuess.slice(0, -1);
      });
      return;
    }

    // Handle other keypad keys
    else {
      // Ensure the current guess has less than 5 characters
      if (currentGuess.length < 5) {
        setCurrentGuess((currentGuess) => {
          return currentGuess + key.toUpperCase();
        });
      }
    }
  };

  // Provide game state and handling functions as return values
  return {
    turn,
    guesses,
    currentGuess,
    isCorrect,
    handleKeyboard,
    handleKeypad,
  };
};

export default useWordle;
