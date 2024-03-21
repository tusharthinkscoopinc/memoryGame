import React, { useState, useRef } from "react";
import "./GameComponent.css";

const GameComponent = ({ onGameStarted }) => {
  const gridSize = 10;
  const sequenceLength = 10;
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [step, setStep] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [isGameActive, setIsGameActive] = useState(false);
  const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(false);
  const [isSequenceComplete, setIsSequenceComplete] = useState(false);
  const gridRef = useRef([]);

  const createGrid = () => {
    const grid = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      gridRef.current[i] = React.createRef();
      grid.push(
        <div
          key={i}
          className="cell"
          ref={gridRef.current[i]}
          onClick={() => cellClicked(i)}
        ></div>
      );
    }
    return grid;
  };

  const startGame = () => {
    setSequence([]);
    setUserSequence([]);
    setStep(0);
    setStatusMessage("");
    setIsGameActive(true);
    setIsSequenceComplete(false);
    setIsStartButtonDisabled(true);
    onGameStarted();
    const newSequence = [];
    for (let i = 0; i < sequenceLength; i++) {
      newSequence.push(Math.floor(Math.random() * gridSize * gridSize));
    }
    setSequence(newSequence);
    showSequence(newSequence);
  };

  const showSequence = (seq) => {
    let currentIndex = 0;

    const showNextCell = () => {
      if (currentIndex < seq.length) {
        const currentCell = gridRef.current[seq[currentIndex]].current;
        currentCell.classList.add("active");

        setTimeout(() => {
          currentCell.classList.remove("active");
          currentIndex++;
          if (currentIndex < seq.length) {
            showNextCell();
          } else {
            setStep(0);
            setIsSequenceComplete(true);
          }
        }, 1000);
      }
    };

    showNextCell();
  };

  const cellClicked = (index) => {
    if (!isGameActive || !isSequenceComplete) return;
    const cell = gridRef.current[index].current;

    if (sequence[step] === index) {
      setUserSequence((prevUserSequence) => [...prevUserSequence, index]);
      cell.classList.add("clicked");

      setTimeout(() => {
        cell.classList.remove("clicked");

        if (userSequence.length + 1 === sequence.length) {
          setStatusMessage("You won!");
          setIsGameActive(false);
          sendDataToBackend(name, email, "You won");
          setIsStartButtonDisabled(false);
        } else {
          setStep(step + 1);
        }
      }, 1000);
    } else {
      cell.classList.add("incorrect");

      setTimeout(() => {
        cell.classList.remove("incorrect");
      }, 500);

      setStatusMessage("You lost!");
      console.log(userSequence.length);
      setIsGameActive(false);
      sendDataToBackend(name, email, "You lost");
    }
  };

  const correctChoice = userSequence.length;
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const firstName = user.firstName;
  const lastName = user.lastName;
  const name = firstName + lastName;
  const email = user.email;

  const sendDataToBackend = async (name, email, gameResult) => {
    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString();
    console.log(name);
    console.log(email);
    console.log(formattedDateTime);
    console.log(typeof formattedDateTime);

    if (!gameResult) {
      console.log("Game Result empty");
    }
    try {
      const response = await fetch("http://localhost:3001/api/storeGameData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, formattedDateTime, gameResult, correctChoice }),
      });

      if (!response.ok) {
        throw new Error("Failed to send data to the server");
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div id="game" className="flex flex-col justify-between h-auto w-full max-w-xs mx-auto">
      <div>
        <div className="flex flex-col items-center mb-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-1"
            onClick={startGame}
            disabled={isStartButtonDisabled}
          >
            Start Game
          </button>
        </div>
        <div id="status" className="text-center flex flex-col items-center mb-3">
          {statusMessage}
        </div>
        <div id="grid" className="grid">
          {createGrid()}
        </div>
      </div>
    </div>
  );
};

export default GameComponent;