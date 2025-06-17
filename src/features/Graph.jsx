import { CircularProgress } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
  const [GraphSummary, setGraphSummary] = useState({ high: 0, low: 0, avg: 0 });
  const [GraphDrop, setGraphDrop] = useState(false);

  const deviceWidth = window.innerWidth;
  // console.log(deviceWidth, "width");
  /*   https://api.currencybeacon.com/v1/timeseries?api_key=NozTkg8PyYgvjMJ1HuNdITIIGmvxnnaB&base=USD&start_date=2025-05-01&end_date=2025-06-01&symbols=INR */
  useEffect(() => {
    const obj = {
      first: firstBase,
      second: secBase,
    };

    setGraphBaseList(obj);
  }, [changeGraph]);
  const fetchSeries = (firstValue, secValue) => {
    setShowChart(false);
    const today = new Date();
    const start = `${today.getFullYear()}-0${
      today.getMonth() + 1
    }-${today.getDate()}`;
    const endDate = new Date(today);
    const NumberOfDays = daysNumber - 1;
    endDate.setDate(today.getDate() - NumberOfDays);

    const end = `${endDate.getFullYear()}-0${
      endDate.getMonth() + 1
    }-${endDate.getDate()}`;
    console.log(start, end);

    axios
      .get(
        `${import.meta.env.VITE_API_SERIES}api_key=${
          import.meta.env.VITE_API_KEY
        }&base=${
          firstValue.split("-")[0]
        }&start_date=${end}&end_date=${start}&symbols=${secValue.split("-")[0]}`
      )
      .then((response) => {
        console.log(response.data, "response data");

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
  }, [graphBaseList]);

  const changeNumberOfDays = (e) => {
    const daysValue = e.target.value;
    setDaysNumber(daysValue);
    setChangeGraph(true);
  };

  const changeGraphBaseList = (e) => {
    const value = graphBaseList.second;
    const value2 = graphBaseList.first;
    console.log(e);
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
  return (
    <div>
      <h1 className="text-3xl text-center mt-4 mb-0">Time Series</h1>
      <div className=" mt-0 p-4 px-0 pt-2">
        <section className="w-[98%] sm:w-[70%] flex justify-evenly items-center bg-white m-auto mt-8 p-3 px-0">
          <div>
            <div
              className="cursor-pointer bg-gray-50 relative text-black border-1 border-gray-200 hover:bg-gray-200  selection:bg-gray-200 sm:w-30  p-2 m-1 shadow-xl  rounded-lg inline"
              onClick={() => setGraphDrop(!GraphDrop)}
            >
              Change Base{" "}
              <img
                src="https://cdn-icons-png.flaticon.com/128/6364/6364586.png"
                alt="^"
                className="inline h-2.5 w-3  pt-0 m-0"
              />
              <div className={GraphDrop ? "absolute w-max " : "hidden"}>
                <ul className="border-1 border-gray-200 bg-gray-100 rounded-sm  shadow-lg m-0.5 p-0.5">
                  <li
                    onClick={changeGraphBaseList}
                    className="list-none p-1 bg-gray-100  hover:bg-gray-200  cursor-pointer"
                  >
                    {graphBaseList.second}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <button
            className="cursor-pointer bg-gray-50 text-black border-1 border-gray-200 hover:bg-gray-200  selection:bg-gray-200 sm:w-30  p-2 m-1 shadow-xl rounded-lg"
            value={7}
            onClick={changeNumberOfDays}
          >
            7 days
          </button>
          <button
            className="cursor-pointer bg-gray-50 text-black border-1 border-gray-200 hover:bg-gray-200  selection:bg-gray-200 sm:w-30 p-2 m-1 shadow-xl rounded-lg"
            value={30}
            onClick={changeNumberOfDays}
          >
            30 days
          </button>
          <button
            className=" cursor-pointer bg-gray-50 text-black border-1 border-gray-200 hover:bg-gray-200  selection:bg-gray-200 sm:w-30 p-2 m-1 shadow-xl rounded-lg"
            value={90}
            onClick={changeNumberOfDays}
          >
            90 days
          </button>
        </section>
        <section className="mt-0 w-full pl-0 ">
          {showChart ? (
            TimeData.every((element) => element === null) ? (
              <div className="text-3xl text-center flex items-center w-[75%] m-auto justify-center py-4 mt-4 my-4  bg-white h-20">
                No Data to Show
              </div>
            ) : (
              <div className="bg-white  scroll-auto w-[100%] sm:w-[70%] m-auto grid h-80 sm:h-100 object-cover pt-0 pb-6 pl-0 ">
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
                  height={deviceWidth > 500 ? 380 : 240}
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
      <div className="p-3 text-3xl m-auto text-center">
        <p className="p-1 ">Highest: {GraphSummary.high.toFixed(6)}</p>
        <p className="p-1 ">Lowest: {GraphSummary.low.toFixed(6)}</p>
        <p className="p-1 ">Average: {GraphSummary.avg.toFixed(6)}</p>
      </div>
    </div>
  );
};
