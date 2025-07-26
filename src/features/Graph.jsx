import { CircularProgress } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export const Graph = ({ firstBase, secBase, changeGraph, setChangeGraph }) => {
  const [DaysList, setDaysList] = useState([""]);
  const [TimeData, setTimeData] = useState([""]);
  const [label, setLabel] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [daysNumber, setDaysNumber] = useState(30);
  const [graphBaseList, setGraphBaseList] = useState({
    first: firstBase,
    second: secBase,
  });
  const [LoadedChart, setLoadedChart] = useState({
    Base: "select",
    secondary: "select",
  });
  const [GraphSummary, setGraphSummary] = useState({ high: 0, low: 0, avg: 0 });
  const [GraphDrop, setGraphDrop] = useState(false);
  const firstRef = useRef(null);

  const deviceWidth = window.innerWidth;
  // console.log(deviceWidth, "width");

  useEffect(() => {
    const obj = {
      first: firstBase,
      second: secBase,
    };

    setGraphBaseList(obj);
  }, [firstBase, secBase]);

  const fetchSeries = (firstValue, secValue) => {
    setShowChart(false);
    const today = new Date();
    const start = `${String(today.getFullYear())}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const endDate = new Date(today);
    const NumberOfDays = daysNumber - 1;
    endDate.setDate(today.getDate() - NumberOfDays);

    const end = `${String(endDate.getFullYear())}-${String(
      endDate.getMonth() + 1
    ).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;
    // console.log(start, end, "correct dates");

    axios
      .get(
        `${import.meta.env.VITE_API_SERIES}api_key=${
          import.meta.env.VITE_API_KEY
        }&base=${
          firstValue.split("-")[0]
        }&start_date=${end}&end_date=${start}&symbols=${secValue.split("-")[0]}`
      )
      .then((response) => {
        // console.log(response.data, "response data");

        const timeLine = response.data.response;

        let currencyArray = [];

        for (const [key, value] of Object.entries(timeLine)) {
          // console.log(key, "key", "value ->", value);
          const obj = value;
          for (const [key, value] of Object.entries(obj)) {
            currencyArray.push(value);
          }
        }
        setTimeData(currencyArray);
        setLabel(
          `price of 1 ${firstValue.split("-")[0]} in ${secValue.split("-")[0]}`
        );
        setShowChart(true);
        const obj = {
          Base: firstValue,
          secondary: secValue,
        };
        setLoadedChart(obj);
      })

      .catch((error) => {
        setShowChart(false);
        console.log("some error occured", error);
      });
  };

  const getListOfDays = () => {
    const monthList = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let list = [];
    const NumberOfDays = daysNumber;
    for (let a = 0; a < NumberOfDays; a++) {
      const today = new Date();
      const previousDate = new Date(today);
      previousDate.setDate(today.getDate() - a);
      const month = previousDate.getMonth();

      const date = previousDate.getDate();
      const value = `${date} ${monthList[month]}`;
      list = [...list, value];
    }
    list = list.reverse();
    setDaysList(list);
  };

  useEffect(() => {
    const first = graphBaseList.first;
    const second = graphBaseList.second;

    if (changeGraph) {
      getListOfDays();
      fetchSeries(first, second);
      setChangeGraph(false);
    }
  }, [changeGraph]);

  const changeNumberOfDays = (e) => {
    const daysValue = e.target.value;
    setDaysNumber(daysValue);
    setChangeGraph(true);
  };

  const changeGraphBaseList = (e) => {
    const value = graphBaseList.second;
    const value2 = graphBaseList.first;
    // console.log(e);
    const obj = { first: value, second: value2 };
    setGraphBaseList(obj);
    setGraphDrop(false);

    setDaysNumber(30);
    setChangeGraph(true);
  };

  const calculateGraphSummery = () => {
    if (TimeData.length === 0) {
      return;
    }
    let lowest = Number(TimeData[0]);
    let highest = 0;
    let sum = 0;
    TimeData.forEach((element) => {
      sum = sum + element;
      if (element > highest) {
        highest = element;
      } else if (element < lowest) {
        lowest = element;
      }
    });
    const average = sum / TimeData.length;
    const obj = { high: highest, low: lowest, avg: average };
    setGraphSummary(obj);
  };
  useEffect(() => {
    calculateGraphSummery();
  }, [TimeData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (firstRef.current && !firstRef.current.contains(event.target)) {
        if (GraphDrop) {
          setGraphDrop(false);
        }
        // Close dropdown when clicking outside
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-center mt-5 mb-5 font-bold ">
        {LoadedChart.Base.split("-")[0]} To{" "}
        {LoadedChart.secondary.split("-")[0]} Chart
      </h1>
      <div className=" mt-0 p-4 pt-0 px-0 ">
        <section className="w-[98%] sm:w-[95%] flex justify-evenly items-center bg-white m-auto  p-3 px-0">
          <div>
            <div
              className=" relative overflow-hidden p-1 py-2 sm:p-2 cursor-pointer bg-gray-50  text-black border-1 border-gray-200 hover:bg-gray-200  selection:bg-gray-200 sm:w-30   mt-0 m-1 shadow-xl  rounded-lg inline "
              onClick={() => setGraphDrop(!GraphDrop)}
              ref={firstRef}
            >
              Change Base{" "}
              <img
                src="https://cdn-icons-png.flaticon.com/128/6364/6364586.png"
                alt="^"
                className="inline h-2.5 w-3  pt-0 "
              />
              <div className={GraphDrop ? "absolute w-max " : "hidden"}>
                <ul className="border-1 border-gray-200 bg-gray-100 rounded-sm  shadow-lg m-0.5 p-0.5">
                  <li
                    onClick={changeGraphBaseList}
                    className="list-none p-1 bg-gray-100  hover:bg-gray-200  cursor-pointer"
                  >
                    {LoadedChart.secondary}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <button
            className=" p-1 sm:p-2 cursor-pointer bg-gray-50 text-black border-1 border-gray-200 hover:bg-gray-200  selection:bg-gray-200 sm:w-30   m-1 shadow-xl rounded-lg"
            value={7}
            onClick={changeNumberOfDays}
          >
            7 days
          </button>
          <button
            className="cursor-pointer bg-gray-50 text-black border-1 border-gray-200 hover:bg-gray-200  selection:bg-gray-200 sm:w-30 p-1 sm:p-2 m-1 shadow-xl rounded-lg"
            value={30}
            onClick={changeNumberOfDays}
          >
            30 days
          </button>
          <button
            className=" cursor-pointer bg-gray-50 text-black border-1 border-gray-200 hover:bg-gray-200  selection:bg-gray-200 sm:w-30 p-1 sm:p-2 m-1 shadow-xl rounded-lg"
            value={90}
            onClick={changeNumberOfDays}
          >
            90 days
          </button>
        </section>
        <section className="mt-0 w-full pl-0 ml-0 overflow-hidden">
          {showChart ? (
            TimeData.every((element) => element === null) ? (
              <div className="text-3xl text-center flex items-center w-[75%] m-auto justify-center py-4 mt-4 my-4  bg-white h-20">
                No Data to Show
              </div>
            ) : (
              <div className="bg-white  scroll-auto w-[100%] sm:w-[95%] ml-0  sm:m-auto grid h-85 sm:h-110 object-cover pt-0 pb-6 pl-0 ">
                <LineChart
                  xAxis={[
                    {
                      scaleType: "point",
                      data: DaysList,
                      labelMarkType: "square",
                    },
                  ]}
                  series={[
                    {
                      data: TimeData,
                      label: label,
                      labelMarkType: "square",
                      showMark:
                        deviceWidth > 500 && daysNumber <= 30 ? true : false,
                    },
                  ]}
                  grid={{ vertical: false, horizontal: true }}
                  showToolbar={true}
                  height={deviceWidth > 500 ? 420 : 260}
                />
              </div>
            )
          ) : (
            <div className="h-7 flex justify-center items-center">
              <CircularProgress />
            </div>
          )}
        </section>
      </div>
      <div className="m-auto p-5 shadow-2xs bg-[#f1f5f9] font-['segoe UI'] border-l-3 border-[#007bff] w-full sm:w-[95%] font-semibold  grid grid-cols-1 sm:grid-cols-3">
        <p className="p-1 ">
          <span className="text-blue-600 inline font-semibold">Highest:</span>{" "}
          {GraphSummary.high.toFixed(6)}
        </p>
        <p className="p-1 ">
          <span className="text-blue-600 inline font-semibold">Lowest:</span>{" "}
          {GraphSummary.low.toFixed(6)}
        </p>
        <p className="p-1 ">
          <span className="text-blue-600 inline font-semibold">Average:</span>{" "}
          {GraphSummary.avg.toFixed(6)}
        </p>
      </div>
    </div>
  );
};
