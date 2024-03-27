import React, { useState, useEffect } from "react";
import GameComponent from "./GameComponent";
import { useSelector } from "react-redux";

const Homepage = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [shouldRenderGame, setShouldRenderGame] = useState(false);
  const [hasPlayedGame, setHasPlayedGame] = useState(false);
  const [timesUp, setTimesUp] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    const fetchGameTimes = async () => {
      try {
        const response = await fetch("/api/getGameTimes");
        if (!response.ok) {
          throw new Error('Failed to fetch game times');
        }
        const { gameStartTime, gameEndTime } = await response.json();
        setStartTime(new Date(gameStartTime)); 
        setEndTime(new Date(gameEndTime));
      } catch (error) {
        console.error("Error fetching game times:", error);
      }
    };

    fetchGameTimes();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (startTime !== null && endTime !== null) {
        const currentTime = new Date();
        if (
          currentTime.getTime() >= startTime.getTime() &&
          currentTime.getTime() < endTime.getTime()
        ) {
          setShouldRenderGame(true);
        } else {
          setShouldRenderGame(false);
        }

        if (currentTime.getTime() >= endTime.getTime()) {
          setShouldRenderGame(false);
          setTimesUp(true);
        }
      }
    }, 1000);

    const hasPlayed = sessionStorage.getItem("hasPlayedGame") === "true";
    setHasPlayedGame(hasPlayed);

    return () => {
      clearInterval(intervalId);
    };
  }, [startTime, endTime]);

  const onGameStartedHandler = () => {
    sessionStorage.setItem("hasPlayedGame", "true");
  };

  if (isLoggedIn) {
    if (timesUp) {
      return (
        <div className="text-red-500 flex justify-center">
          The Time for Today's Game Has Ended. Please try again tomorrow.
        </div>
        
      );
    } else if (shouldRenderGame && !hasPlayedGame) {
      return <GameComponent onGameStarted={onGameStartedHandler} />;
    } else if (shouldRenderGame && hasPlayedGame) {
      return (
        <div className="text-red-500 flex justify-center">
          You have already played the game once during this time interval.
        </div>
      );
    } else {
      return (
        <div className="text-red-500 flex justify-center">
          The Game Will Start at {startTime ? startTime.toLocaleTimeString() : 'unknown time'}
        </div>
      );
    }
  } else {
    return null;
  }
};

export default Homepage;
