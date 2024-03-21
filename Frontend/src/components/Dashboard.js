import React, { useState } from "react";
import JobForm from "./JobForm";
import GameComponent from "./GameComponent";

const OverviewComponent = () => <h1>Overview Component</h1>;
const ViewJobComponent = () => <h1>View Job Component</h1>;

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Overview");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const currentDate = new Date();
  const currentTotalSeconds =
    currentDate.getHours() * 3600 +
    currentDate.getMinutes() * 60 +
    currentDate.getSeconds();
  console.log(currentTotalSeconds);
  const startTime = 13 * 3600 + 38 * 60;
  console.log(startTime);
  const endTime = 13 * 3600 + 39 * 60;
  console.log(endTime);

  const renderComponent = () => {
    switch (selectedOption) {
      case "Post a Job":
        return <JobForm />;
      case "View Job":
        return <ViewJobComponent />;
      case "Memory Game":
        if (currentTotalSeconds >= startTime && currentTotalSeconds < endTime) {
          
          return <GameComponent />;
        } else {
          
          return (
            <div className="text-red-500 flex justify-center ">The Game Will Start on 6:00 PM</div>
          );
        }
      default:
        return <OverviewComponent />;
    }
  };

  return (
    <>
      <div className="container 2xl:max-w-[90vw] mx-auto px-4 flex flex-wrap font-helvetica-neue">
        <div className="w-1/4 px-3 h-[89vh]">
          <div className="pt-6 border-slate-100 border-r-2 min-h-[89vh]">
            <h3 className="mb-3 text-xs font-medium">Dashboard</h3>
            <ul className="list-none">
              <li>
                <button
                  onClick={() => handleOptionSelect("Overview")}
                  className={`w-full py-2 px-4 text-left border-l-4 border-l-white ${
                    selectedOption === "Overview" ? "border-l-cyan-800 bg-gray-200" : ""
                  } hover:bg-gray-100`}
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOptionSelect("Post a Job")}
                  className={`w-full py-2 px-4 text-left border-l-4 border-l-white ${
                    selectedOption === "Post a Job" ? "border-l-cyan-800 bg-gray-200" : ""
                  } hover:bg-gray-100`}
                >
                  Post a Job
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOptionSelect("View Job")}
                  className={`w-full py-2 px-4 text-left border-l-4 border-l-white ${
                    selectedOption === "View Job" ? "border-l-cyan-800 bg-gray-200" : ""
                  } hover:bg-gray-100`}
                >
                  View Job
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOptionSelect("Memory Game")}
                  className={`w-full py-2 px-4 text-left border-l-4 border-l-white ${
                    selectedOption === "Memory Game" ? "border-l-cyan-800 bg-gray-200" : ""
                  } hover:bg-gray-100`}
                >
                  Memory Game
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-3/4 px-3 max-h-[89vh] overflow-y-auto ">
          {renderComponent()}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
