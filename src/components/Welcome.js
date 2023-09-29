// This React component renders the welcome UI for the game

const Welcome = ({ startGame }) => {
  return (
    <div className="welcome">
      <div className="welcome-container">
        {/* Game title */}
        <h1>Wordle</h1>
        {/* Game description */}
        <h2>Get 6 chances to guess a 5-letter word.</h2>

        {/* Container for buttons */}
        <div className="button-container">
          {/* Primary button to start the game */}
          <button
            data-id="play"
            type="button"
            className="primary"
            onClick={startGame} // Trigger the 'startGame' function on click
          >
            Play
          </button>
          {/* Secondary button for game instructions */}
          <button data-id="how-to-play" type="button" className="secondary">
            How to play
          </button>
        </div>

        {/* Footer with developer information */}
        <div className="footer">
          <p>developed by</p> {/* Text */}
          <a
            href="https://github.com/itsanuragjoshi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ANURAG JOSHI
          </a>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
