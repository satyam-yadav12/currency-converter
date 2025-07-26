import axios from "axios";
import React, { useEffect, useState } from "react";
import BasicTable from "../component/currencyBoard.BasicTable";

export const CurrencyBoard = ({ firstBase, changeBoard, setChangeBoard }) => {
  const [latestBoard, setLatestBoard] = useState([""]);
  const [toggleValues, setToggleValues] = useState(false);

  const fetchList = (firstBaseac) => {
    axios
      .get(
        `${import.meta.env.VITE_API_LATEST}api_key=${
          import.meta.env.VITE_API_KEY
        }&base=${
          firstBaseac.split("-")[0]
        }&symbols=USD,EUR,GBP,JPY,CHF,CAD,AUD,CNY,INR,SGD`
      )
      .then((response) => {
        // console.log(response.data.rates);
        setLatestBoard(response.data.rates);
        // console.log("updated");

        setChangeBoard(false);
      })
      .catch((error) => {
        alert("error fetching Chart");
        console.log(error);
      });
  };

  useEffect(() => {
    if (changeBoard) {
      fetchList(firstBase);
    }
  }, [changeBoard]);

  const changeToggle = () => {
    if (toggleValues === true) {
      setToggleValues(false);
    } else {
      setToggleValues(true);
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center m-5">
        Exchange Rates with Top Currencies
      </h1>
      <div className="m-auto w-[98%] sm:w-[95%] bg-white">
        <div>
          <img
            src={
              toggleValues
                ? "https://cdn-icons-png.flaticon.com/128/5683/5683514.png"
                : "https://cdn-icons-png.flaticon.com/128/5683/5683501.png"
            }
            alt=""
            onClick={changeToggle}
            className="inline h-16 w-16 p-2"
          />
          <p className="inline ml-2 font-bold">
            {toggleValues
              ? `Convert From ${firstBase.split("-")[0]}`
              : `Convert To ${firstBase.split("-")[0]}`}
          </p>
        </div>
        <BasicTable
          firstBase={firstBase}
          latestRates={latestBoard}
          toggleValues={toggleValues}
        />
      </div>
    </div>
  );
};
