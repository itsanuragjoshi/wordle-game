// This React component renders the game result modal
const Result = ({ isCorrect, turn, resetGame, solution }) => {
  return (
    // Result container
    <div className="result">
      <div className="result-container">
        {/* Display if the user guessed the word correctly */}
        {isCorrect && (
          <div>
            <h2>Congratulations!</h2>
            <p>
              You cracked the word in just {turn}{" "}
              {turn === 1 ? "turn" : "turns"}! 🎉
            </p>
          </div>
        )}

        {/* Display if the user ran out of guesses */}
        {!isCorrect && (
          <div>
            <h2>Out of guesses! 👎</h2>
            <p>The word was '{solution}' </p>
          </div>
        )}

        {/* Button container for the "Play Again" button */}
        <div className="button-container">
          <button
            data-id="replay"
            type="button"
            className="primary" // A button with a primary-reverse style
            onClick={() => {
              resetGame(); // When clicked, call the resetGame function
            }}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
