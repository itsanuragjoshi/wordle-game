// This React component renders the game's user interface components

import { useEffect } from "react";
import WordleGrid from "./WordleGrid"; // Importing the WordleGrid component
import Keypad from "./Keypad"; // Importing the Keypad component
import Result from "./Result";
import useWordle from "../hooks/useWordle"; // Importing a custom hook for game logic
import useFetch from "../hooks/useFetch"; // Importing another custom hook for fetching game data

// Wordle component that displays the game UI
const Wordle = ({ isGameOver, endGame, startGame, resetGame }) => {
  // Use the custom hook to manage the game logic and state
  const { solution, validGuesses, keypadLetters } = useFetch(); // Fetching game data
  const {
    turn,
    guesses,
    currentGuess,
    isCorrect,
    handleKeyboard,
    handleKeypad,
  } = useWordle(solution, validGuesses); // Initializing game logic and state

  // Add an event listener to handle key presses during the game
  useEffect(() => {
    window.addEventListener("keyup", handleKeyboard); // Listen for keyup events

    if (isCorrect || turn > 5) {
      window.removeEventListener("keyup", handleKeyboard); // Remove the event listener if the game is over or turn exceeds 5
      setTimeout(() => {
        endGame();
      }, 2000);
    }

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("keyup", handleKeyboard);
  }, [handleKeyboard, endGame, isCorrect, turn]); // The effect depends on the handleKeyboard function

  useEffect(() => {
    const keypadKeys = document.querySelectorAll(".keypad-key"); // Select all elements with the class "keypad-key"
    // console.log(keypadKeys);

    keypadKeys.forEach((keypadKey) => {
      keypadKey.addEventListener("click", handleKeypad); // Add a click event listener to each keypad key
    });

    if (isCorrect || turn > 5) {
      keypadKeys.forEach((keypadKey) => {
        keypadKey.removeEventListener("click", handleKeypad); // Remove the click event listener if the game is over or turn exceeds 5
      });
      setTimeout(() => {
        endGame();
      }, 2000);
    }

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      keypadKeys.forEach((keypadKey) => {
        keypadKey.removeEventListener("click", handleKeypad); // Remove click event listeners when the component unmounts
      });
    };
  }, [handleKeypad, endGame, isCorrect, turn]); // The effect depends on the handleKeypad function

  // Render the game UI
  return (
    <div className="wordle">
      {/* Element used to show custom alerts /temporary messages to the user */}
      <div className="snackbar"></div>

      {/* Create a container for the Wordle game */}
      <div className="wordle-container">
        {/* Display the title of the Wordle game */}
        <h1>Wordle</h1>

        {/* Render the WordleGrid component */}
        <WordleGrid currentGuess={currentGuess} guesses={guesses} turn={turn} />

        {/* Render the Keypad component */}
        <Keypad keypadLetters={keypadLetters} />
      </div>

      {/* Render the Keypad component if Game Over */}
      {isGameOver && (
        <Result
          isCorrect={isCorrect}
          turn={turn}
          startGame={startGame}
          resetGame={resetGame}
          solution={solution}
        />
      )}
    </div>
  );
};

export default Wordle;
