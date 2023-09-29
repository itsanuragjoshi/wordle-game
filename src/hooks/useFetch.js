// This code defines a "custom hook" for fetching data related to a Wordle game from three different endpoints.
import { useState, useEffect } from "react";
import { KEYPAD, SOLUTION_WORDLIST, VALID_WORDLIST } from "../data/constants";
// Custom hook for fetching Wordle game data

const useFetch = () => {
  // State variables to store fetched data
  const [solution, setSolution] = useState(null); // Store the Wordle solution
  const [validGuesses, setValidGuesses] = useState([]); // Store valid Wordle guesses
  const [keypadLetters, setKeypadLetters] = useState(null); // Store keypad data

  useEffect(() => {
    setKeypadLetters(KEYPAD);
  }, []);

  useEffect(() => {
    const randomSolution =
      SOLUTION_WORDLIST[Math.floor(Math.random() * SOLUTION_WORDLIST.length)]; // Get a random solution from the fetched data
    setSolution(randomSolution); // Update the solution in the parent component (Wordle)
  }, []);

  useEffect(() => {
    setValidGuesses(VALID_WORDLIST);
  }, []);
  // Return the fetched data as an object
  return {
    solution, // Wordle solution
    validGuesses, // List of valid Wordle guesses
    keypadLetters, // Keypad data
  };
};

export default useFetch;
