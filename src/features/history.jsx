import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

export const History = ({ toggleDrawer, recent, setRecent }) => {
  const resetHistory = () => {
    localStorage.removeItem("PastConversion");
    setRecent([""]);
    console.log("history cleared");
  };
  return (
    <div>
      <div className="flex flex-row w-full sm:w-[400px]">
        <h1
          className="text-2xl font-semibold p-5 cursor-default sm:w-[80%] w-[80%] text-left "
          onClick={toggleDrawer(false)}
        >
          Recent conversions
        </h1>
        <button
          onClick={toggleDrawer(false)}
          className="ml-auto cursor-pointer mr-6 sm:mr-8 sm:pt-6 sm:flex  sm:w-[10%]"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/9777/9777566.png"
            alt="Close"
            className="h-8 w-8 p-1 "
          />
        </button>
      </div>
      {recent[0] != [""] ? (
        <div>
          {" "}
          {recent.map((value, index) => {
            // console.log(recent);

            return (
              <div key={index} className="ml-3">
                <li className="list-none p-2">
                  <span className="p-1">{value.firstVal}</span>{" "}
                  <span className="p-1">{"\u27A1"} </span>
                  <span className="p-1">{value.secVal}</span>{" "}
                </li>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <p className="p-5 text-gray-400">
            Recent conversion will appear hear!
          </p>
        </div>
      )}

      <div className="p-2">
        <Button onClick={resetHistory}>Clear all</Button>
      </div>
      <p className="p-5 text-gray-400 w-63 sm:w-90 text-justify">
        <strong className="text-gray-600">Prime Converter: </strong>Your trusted
        source for accurate currency conversions. Stay informed with real-time
        exchange rates, available anytime, anywhere.
      </p>
    </div>
  );
};
