import { React, useState } from "react";
import currency from "../assets/countries.json";
import { SelectOptions } from "./CurrencyList.Options";
import "../App.css";

export const CurrencyList = ({
  baseCurr,
  changeBase,
  ChangeFlag,
  baseFlag,
}) => {
  // const [baseCurr, setSearchInput] = useState(baseCurr);
  // const [flag, setFlag] = useState(Dflag);
  const [showDropDown, setShowDropDown] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);

  function setInput(value, bool, img) {
    changeBase(value);
    setShowDropDown(bool);
    ChangeFlag(img);
  }

  const handleInputChange = (e) => {
    changeBase(e.target.value);
    if (updateFlag) {
      ChangeFlag("https://cdn-icons-png.flaticon.com/128/6897/6897039.png");
      setUpdateFlag(false);
    }
  };

  return (
    <div>
      <div className="border-1 border-[#ccc]  h-16 p-1 pr-0 shadow-lg rounded-lg bg-white transition-colors duration-300 ease-in-out focus-within:border-blue-500  hover:border-blue-500 font-semibold w-[95%] sm:w-max">
        <img
          src={baseFlag}
          alt="flag"
          className="inline p-1.5 py-0 h-14  pr-0 pt-0 object-contain w-14  border-0 "
        />
        <input
          type="text"
          value={baseCurr}
          onChange={handleInputChange}
          onDrop={(e) => e.preventDefault()}
          onClick={(e) => {
            setShowDropDown(true);
            setUpdateFlag(true);
            return e.target.select();
          }}
          placeholder="Enter currency code/ country Name"
          className="p-1.5 m-4 border-none h-12 w-[70%]  mt-1  pt-1 ml-2 border-l-0 outline-none focus:outline-none  sm:w-65"
        />
      </div>

      <div
        className={
          !showDropDown
            ? "hidden"
            : "max-h-70 h-max bg-white rounded-2xl overflow-auto max-w-87 w-max  absolute z-999  whitespace-nowrap text-ellipsis overflow-x-hidden scrollbar"
        }
      >
        {baseCurr === "" ||
        baseCurr === "INR - Indian Rupee" ||
        baseCurr === "USD - United States Dollar"
          ? currency.map((data, index) => {
              return (
                <SelectOptions
                  key={index}
                  value={`${data.code} - ${data.name}`}
                  flag={data.flag}
                  setInput={setInput}
                />
              );
            })
          : currency.map((data, index) => {
              const value = data.code;
              const country = data.country;

              if (
                value.includes(baseCurr.trim()) ||
                value.includes(baseCurr.toUpperCase().trim()) ||
                country.includes(
                  (baseCurr.charAt(0).toUpperCase() + baseCurr.slice(1)).trim()
                )
              ) {
                return (
                  <SelectOptions
                    key={index}
                    value={`${data.code} - ${data.name}`}
                    flag={data.flag}
                    setInput={setInput}
                  />
                );
              }
            })}
      </div>
    </div>
  );
};
