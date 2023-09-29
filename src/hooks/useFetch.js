// This code defines a "custom hook" for fetching data related to a Wordle game from three different endpoints.
import { useState, useEffect } from "react";

// Custom hook for fetching Wordle game data
const useFetch = () => {
  // State variables to store fetched data
  const [solution, setSolution] = useState(null); // Store the Wordle solution
  const [validGuesses, setValidGuesses] = useState([]); // Store valid Wordle guesses
  const [keypadLetters, setKeypadLetters] = useState(null); // Store keypad data

  // Fetch a random Wordle solution from an API when the component mounts
  useEffect(() => {
    fetch("http://localhost:8000/solution-wordlelist") // Fetch data from the specified URL
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        const randomSolution = data[Math.floor(Math.random() * data.length)]; // Get a random solution from the fetched data
        setSolution(randomSolution); // Update the solution in the parent component (Wordle)
      })
      .catch((error) => console.log(error)); // Handle any errors that occur during the fetch
  }, []); // This effect runs once when the component mounts, indicated by the empty dependency array

  // Fetch the list of valid Wordle guesses from an API
  useEffect(() => {
    fetch("http://localhost:8000/valid-wordlelist") // Fetch data from the specified URL
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setValidGuesses(data); // Update the valid guesses
      })
      .catch((error) => console.log(error)); // Handle any errors that occur during the fetch
  }, []); // This effect runs once when the component mounts, indicated by the empty dependency array

  // Fetch keypad data from an API when the component mounts
  useEffect(() => {
    fetch("http://localhost:8000/keypad") // Fetch data from the specified URL
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setKeypadLetters(data); // Update the keypad data
      })
      .catch((error) => console.log(error)); // Handle any errors that occur during the fetch
  }, []); // This effect runs once when the component mounts, indicated by the empty dependency array

  // Return the fetched data as an object
  return {
    solution, // Wordle solution
    validGuesses, // List of valid Wordle guesses
    keypadLetters, // Keypad data
  };
};

export default useFetch;
