// This component provides a visual representation of the entire Wordle game grid.

import WordleRow from "./WordleRow";

const WordleGrid = ({ currentGuess, guesses, turn }) => {
  return (
    <div className="board">
      <div className="grid">
        {/* Map over the guesses array to render WordleRow components */}
        {guesses.map((guess, i) => {
          if (i === turn) {
            // Check if this is the current turn being played
            // Render a WordleRow component for the current turn with the currentGuess
            return <WordleRow key={i} currentGuess={currentGuess} />;
          } else {
            // Render a WordleRow component for previous turns with the corresponding guess data
            return <WordleRow key={i} guess={guess} />;
          }
        })}
      </div>
    </div>
  );
};

export default WordleGrid;
