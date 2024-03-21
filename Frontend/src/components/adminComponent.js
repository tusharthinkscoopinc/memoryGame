
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setGameTimes } from "./redux/actions";

const AdminComponent = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setGameTimes(startTime, endTime));
  };

  return (
    <div>
      <h2>Set Game Times</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Start Time:</label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <br />
        <label>End Time:</label>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        <br />
        <button type="submit">Set Game Times</button>
      </form>
    </div>
  );
};

export default AdminComponent;
