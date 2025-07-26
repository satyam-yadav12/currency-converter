import React from "react";
import { useEffect, useState } from "react";
import { CurrencyList } from "../component/CurrencyList";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export const Converter = ({
  firstBase,
  setFirstBase,
  setSecBase,
  secBase,
  changeGraph,
  changeBoard,
  setSaveHistory,
}) => {
  const [baseFlagFirst, changeBaseFlagFirst] = useState(
    "https://cdn-icons-png.flaticon.com/128/206/206626.png"
  );
  const [baseFlagSecond, changeBaseFlagSecond] = useState(
    "https://flagcdn.com/w320/in.png"
  );
  const [baseValue, setBaseValue] = useState(1);
  const [result, setResult] = useState("");
  const [subValues, setSubValues] = useState("");
  const [fetchTime, setFetchTime] = useState(null);

  useEffect(() => {
    if (firstBase === "") {
      changeBaseFlagFirst(
        "https://cdn-icons-png.flaticon.com/128/6897/6897039.png"
      );
    }
    if (secBase === "") {
      changeBaseFlagSecond(
        "https://cdn-icons-png.flaticon.com/128/6897/6897039.png"
        // "https://cdn-icons-png.flaticon.com/128/9689/9689298.png"
      );
    }
  }, [firstBase, secBase]);

  const reverseValue = () => {
    const temp = firstBase;
    const tempFlag = baseFlagFirst;
    setFirstBase(secBase);
    setSecBase(temp);
    changeBaseFlagFirst(baseFlagSecond);
    changeBaseFlagSecond(tempFlag);
  };

  const ConvertCurrency = () => {
    // console.log(baseValue, firstBase.split("-")[0], secBase.split("-")[0]);

    const from = firstBase.split("-");
    const to = secBase.split("-");
    const emptyFlag = "https://cdn-icons-png.flaticon.com/128/6897/6897039.png";
    if (baseFlagFirst === emptyFlag || baseFlagSecond === emptyFlag) {
      setResult("Invalid Input");
      setSubValues("");
      return;
    }
    setResult("");
    axios
      .get(
        `${import.meta.env.VITE_API_URL}api_key=${
          import.meta.env.VITE_API_KEY
        }&from=${from[0]}&to=${to[0]}&amount=${baseValue}`
      )
      .then((response) => {
        // console.log(response);
        const resultVal = response.data.value.toFixed(2);
        const Output = `${response.data.amount} ${response.data.from} = ${resultVal} ${response.data.to}`;
        const singleAmountValue = (
          response.data.value / response.data.amount
        ).toFixed(4);

        const subresult = `1 ${from[1]} = ${singleAmountValue} ${to[1]} `;
        setSubValues(subresult);
        setResult(Output);
      })
      .catch((error) => {
        console.log(error, "error");
        if (error.status === 603) {
          setResult("Unable to Convert");
          setSubValues("some internal error occured. come soon!");
        } else {
          setResult("Oops! Something went wrong");
          setSubValues("");
        }
      });
    changeGraph(true);
    changeBoard(true);
    setSaveHistory(true);
  };
  useEffect(() => {
    ConvertCurrency();
  }, []);

  return (
    <div className="w-full  overflow-visible m-auto ">
      <div className="grid grid-cols-1 sm:grid-cols-13 gap-2 mt-5  m-auto w-[95%] sm:w-[95%]">
        <div className=" m-0 sm:col-span-4 ">
          <input
            type="number"
            name="Value"
            value={baseValue}
            onChange={(e) => setBaseValue(e.target.value)}
            placeholder="Enter Amount"
            className="h-20 w-full p-3 text-lg font-medium text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-1 transition-all focus:border-1 focus:border-blue-500"
          />
        </div>

        <div className="sm:col-span-4 h-20 w-full m-0 ">
          <CurrencyList
            baseCurr={firstBase}
            changeBase={setFirstBase}
            baseFlag={baseFlagFirst}
            ChangeFlag={changeBaseFlagFirst}
          />
        </div>
        <div className="sm:col-start-9 sm:col-end-10 flex items-center justify-center z-10 ">
          <button
            onClick={reverseValue}
            className="p-3 bg-white rounded-full shadow-md mx-2 hover:bg-gray-100 transition"
            title="Swap Currencies"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/10042/10042544.png"
              alt="swap"
              width={40}
              className="transform rotate-90 sm:rotate-0"
            />
          </button>
        </div>
        <div className="sm:col-span-4  ml-0 w-full">
          <CurrencyList
            baseCurr={secBase}
            changeBase={setSecBase}
            baseFlag={baseFlagSecond}
            ChangeFlag={changeBaseFlagSecond}
          />
        </div>
      </div>
      <div className="block m-auto  w-[50%] sm:w-[20%]  h-max border-none text-center bg-linear-to-r from-cyan-500 to-blue-500 my-7  rounded-[10px] cursor-pointer hover:from-cyan-600 hover:to-blue-600">
        <button
          onClick={ConvertCurrency}
          className="font-bold text-2xl p-4 text-white block  text-center m-auto "
        >
          CONVERT
        </button>
      </div>

      {/* result */}

      <div className="block mt-8 p-5 shadow-2xs bg-[#f1f5f9] font-['segoe UI'] border-l-3 border-[#007bff] sm:w-[95%] m-auto">
        {/* <h1 className="p-0.5 text-2xl font-bold">Result</h1> */}
        {result === "" ? (
          <div>
            <CircularProgress />
          </div>
        ) : (
          <>
            <p className="p-0.5 pb-0 mb-0 text-2xl font-bold text-[#222]">
              {result}
            </p>
            <p className="p-0 mt-0 font-mono text-lg pl-0.5 text-gray-600">
              {subValues}
            </p>
            <p className="p-0 mt-0 font-mono text-lg pl-0.5 text-gray-600">
              {fetchTime}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
