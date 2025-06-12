import React from "react";
import { useEffect, useState } from "react";
import { CurrencyList } from "./CurrencyList";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export const Converter = () => {
  const [firstBase, setFirstBase] = useState("INR - Indian Rupee");
  const [secBase, setSecBase] = useState("USD - United States Dollar");
  const [baseFlagFirst, changeBaseFlagFirst] = useState(
    "https://flagcdn.com/w320/in.png"
  );
  const [baseFlagSecond, changeBaseFlagSecond] = useState(
    "https://cdn-icons-png.flaticon.com/128/206/206626.png"
  );
  const [baseValue, setBaseValue] = useState(1);

  const [result, setResult] = useState("_______");
  const [subValues, setSubValues] = useState("____");

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
        // console.log(error, "error");
        if (error.status === 603) {
          setResult("Unable to Convert");
          setSubValues("some interner error occured. come soon!");
        }
      });
  };
  useEffect(() => {
    ConvertCurrency();
  }, []);

  return (
    <div className="w-full sm:w-2/3 m-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-center  mt-5 mb-8 tracking-tight">
        CURRENCY CONVERTER
      </h1>
      <div className="sm:w-1/2 w-[95%] m-auto sm:m-0 block my-5 ">
        <input
          type="number"
          name="Value"
          value={baseValue}
          onChange={(e) => setBaseValue(e.target.value)}
          onClick={(e) => e.target.select()}
          placeholder="Enter Amount"
          className="h-14 p-2 w-[95%]   sm:w-85 px-4 py-3 text-lg font-medium text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-0.5 transition-all focus:border-1 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col justify-between items-center sm:flex-row w-full h-60 mt-5 sm:h-20 m-auto sm:m-0">
        <div className="  w-[95%] sm:w-75  ">
          <CurrencyList
            baseCurr={firstBase}
            changeBase={setFirstBase}
            baseFlag={baseFlagFirst}
            ChangeFlag={changeBaseFlagFirst}
          />
        </div>
        <div className=" w-max my-0 sm:mx-3 rotate-90 sm:rotate-0">
          <img
            src="https://cdn-icons-png.flaticon.com/128/10042/10042544.png"
            alt="reverse"
            className="w-14 p-2 m-auto"
            onClick={reverseValue}
          />
        </div>
        <div className="w-[95%] sm:w-75  ">
          <CurrencyList
            baseCurr={secBase}
            changeBase={setSecBase}
            baseFlag={baseFlagSecond}
            ChangeFlag={changeBaseFlagSecond}
          />
        </div>
      </div>
      <div className="block m-auto  w-30 border-none text-center bg-linear-to-r from-cyan-500 to-blue-500 my-7  rounded-[10px] cursor-pointer transition-colors duration-300 ease-in-out hover:bg-blue-500 ">
        <button
          onClick={ConvertCurrency}
          className="font-bold px-4 py-3 text-white block w-30 text-center"
        >
          CONVERT
        </button>
      </div>

      {/* result */}

      <div className="m-3 ml-0 mt-8 p-5 shadow-2xs bg-[#f1f5f9] font-['segoe UI'] border-l-3 border-[#007bff] ">
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
          </>
        )}
      </div>
    </div>
  );
};
