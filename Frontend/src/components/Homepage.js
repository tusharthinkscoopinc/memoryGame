import React, { useState, useEffect } from "react";
import GameComponent from "./GameComponent";
import { useSelector } from "react-redux";

const Homepage = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [shouldRenderGame, setShouldRenderGame] = useState(false);
  const [hasPlayedGame, setHasPlayedGame] = useState(false);
  const [timesUp, setTimesUp] = useState(false);
  const startTime = [14,53];
  const endTime = [14,55];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const currentTotalSeconds =
        currentTime.getHours() * 3600 +
        currentTime.getMinutes() * 60 +
        currentTime.getSeconds();

      const startTimeInSeconds = startTime[0] * 3600 + startTime[1] * 60;
      const endTimeInSeconds = endTime[0] * 3600 + endTime[1] * 60;

      if (
        currentTotalSeconds >= startTimeInSeconds &&
        currentTotalSeconds < endTimeInSeconds
      ) {
        setShouldRenderGame(true);
      } else {
        setShouldRenderGame(false);
      }

      if (currentTotalSeconds >= endTimeInSeconds) {
        setShouldRenderGame(false);
        setTimesUp(true);
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
          The Time for Todays Game Has Ended Please try tomorrow on {startTime[0]}:{startTime[1]}.
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
          The Game Will Start on {startTime[0]}:{startTime[1]}
        </div>
      );
    }
  } else {
    return null;
  }
};

export default Homepage;