// Import the necessary styles from the "index.css" file
import "./index.css";

// Import the Wordle component from "./components/Wordle"
import Wordle from "./components/Wordle";
import Welcome from "./components/Welcome";
import { useState } from "react";

// App component

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const startGame = () => {
    setIsGameStarted(true);
    setIsGameOver(false);
  };

  const endGame = () => {
    setIsGameOver(true);
  };

  const resetGame = () => {
    setIsGameStarted(false);
  };
  const checkDarkMode = () => {
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    document.body.classList.toggle("dark", isDarkMode);
  };

  checkDarkMode();
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", checkDarkMode);

  return (
    <div className="App">
      {isGameStarted ? (
        <Wordle
          isGameOver={isGameOver}
          endGame={endGame}
          startGame={startGame}
          resetGame={resetGame}
        />
      ) : (
        <Welcome startGame={startGame} />
      )}
    </div>
  );
}

// Export the App component as the default export of this module
export default App;
