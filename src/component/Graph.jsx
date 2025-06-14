import { CircularProgress } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const Graph = ({ firstBase, secBase, changeGraph, setChangeGraph }) => {
  const [DaysList, setDaysList] = useState([""]);
  const [TimeData, setTimeData] = useState([""]);
  const [label, setLabel] = useState("");
  const [showChart, setShowLoading] = useState(false);

  const deviceWidth = window.innerWidth;
  console.log(deviceWidth, "width");
  /*   https://api.currencybeacon.com/v1/timeseries?api_key=NozTkg8PyYgvjMJ1HuNdITIIGmvxnnaB&base=USD&start_date=2025-05-01&end_date=2025-06-01&symbols=INR */

  const fetchSeries = (firstBase, secBase) => {
    setShowLoading(false);
    const today = new Date();
    const start = `${today.getFullYear()}-0${
      today.getMonth() + 1
    }-${today.getDate()}`;
    const endDate = new Date(today);
    endDate.setDate(today.getDate() - 29);

    const end = `${endDate.getFullYear()}-0${
      endDate.getMonth() + 1
    }-${endDate.getDate()}`;
    console.log(start, end);

    axios
      .get(
        `${import.meta.env.VITE_API_SERIES}api_key=${
          import.meta.env.VITE_API_KEY
        }&base=${
          firstBase.split("-")[0]
        }&start_date=${end}&end_date=${start}&symbols=${secBase.split("-")[0]}`
      )
      .then((response) => {
        console.log(response.data);
        const timeLine = response.data.response;

        let currencyArray = [];

        for (const [key, value] of Object.entries(timeLine)) {
          console.log(key, "key", "value ->", value);
          const obj = value;
          for (const [key, value] of Object.entries(obj)) {
            currencyArray.push(value);
          }
        }
        setTimeData(currencyArray);
        setLabel(
          `price of 1 ${firstBase.split("-")[0]} in ${secBase.split("-")[0]}`
        );
        setShowLoading(true);
      })
      .catch((error) => {
        setShowLoading(false);
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

    for (let a = 0; a < 30; a++) {
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
    if (changeGraph) {
      getListOfDays();
      fetchSeries(firstBase, secBase);
      setChangeGraph(false);
    }
  }, [changeGraph]);

  return (
    <div>
      <h1 className="text-3xl text-center my-4">Time Series</h1>
      {showChart ? (
        TimeData.every((element) => element === null) ? (
          <div className="text-3xl text-center flex items-center w-[70%] m-auto justify-center py-4 my-4 bg-white h-20">
            No Data to Show
          </div>
        ) : (
          <div className="bg-white  scroll-auto w-[100%] sm:w-[70%] m-auto grid h-80 sm:h-120 object-cover">
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
                  showMark: deviceWidth > 500 ? true : false,
                },
              ]}
              grid={{ vertical: false, horizontal: true }}
              showToolbar={true}
              height={deviceWidth > 500 ? 440 : 240}
            />
          </div>
        )
      ) : (
        <div className="h-6 flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};
