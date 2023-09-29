// This component provides a visual representation of an individual row of tiles for a Wordle guess, reflecting the current state of that guess.

const WordleRow = ({ guess, currentGuess }) => {
  if (currentGuess) {
    // Convert the currentGuess string into an array of characters
    const guessArray = currentGuess.split("");
    // Initialize a new array with 5 elements filled with null
    let fixedArray = new Array(5).fill(null);
    // Push each character from guessArray into fixedArray
    guessArray.forEach((char, i) => {
      fixedArray[i] = char;
    });

    // Render the grid row for the current guess
    return (
      <div className="grid-row">
        {/* Render each character in fixedArray in separate tiles */}
        {fixedArray.map((letter, i) => (
          <div className="grid-tile" key={i} data-state={letter ? "tbd" : null}>
            {letter}
          </div>
        ))}
      </div>
    );
  }

  if (guess) {
    // Render the grid row for a previous guess
    return (
      <div className="grid-row">
        {/* Render each guessed letter in separate tiles with their corresponding state */}
        {guess.map((letter, i) => (
          <div className="grid-tile" data-state={letter.state} key={i}>
            {letter.key}
          </div>
        ))}
      </div>
    );
  }

  // If no currentGuess or guess is available, render empty tiles
  return (
    <div className="grid-row">
      <div className="grid-tile"></div>
      <div className="grid-tile"></div>
      <div className="grid-tile"></div>
      <div className="grid-tile"></div>
      <div className="grid-tile"></div>
    </div>
  );
};

export default WordleRow;
