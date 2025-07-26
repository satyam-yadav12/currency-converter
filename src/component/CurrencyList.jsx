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
  const [firstInteraction, setfirstInteraction] = useState(false);

  function setInput(value, bool, img) {
    changeBase(value);
    setShowDropDown(bool);
    ChangeFlag(img);
  }

  const handleInputChange = (e) => {
    changeBase(e.target.value);
    if (firstInteraction) {
      ChangeFlag("https://cdn-icons-png.flaticon.com/128/6897/6897039.png");
      setfirstInteraction(false);
    }
  };

  return (
    <div>
      <div className=" relative border-1 border-[#ccc]  h-20  shadow-lg rounded-lg bg-white transition-colors duration-300 ease-in-out focus-within:border-blue-500  hover:border-blue-500 font-semibold  sm:w-full">
        <img
          src={baseFlag}
          alt="flag"
          className="inline  h-20 ml-2 object-contain w-14  border-0 "
        />
        <input
          type="text"
          value={baseCurr}
          onChange={handleInputChange}
          onDrop={(e) => e.preventDefault()}
          onClick={(e) => {
            setShowDropDown(true);
            setfirstInteraction(true);
            return e.target.select();
          }}
          placeholder="Enter currency code/country Name"
          className=" absolute border-none h-20 ml-2 w-[70%]  border-l-0 outline-none focus:outline-none  sm:w-[70%] sm:pr-2  lg:pr-0 sm:overflow-ellipsis lg:w-65"
        />
      </div>

      <div
        className={
          !showDropDown
            ? "hidden"
            : "max-h-70 h-max bg-white rounded-2xl overflow-auto max-w-82 w-82  absolute z-999  whitespace-nowrap text-ellipsis overflow-x-auto scrollbar "
        }
      >
        {baseCurr === "" || firstInteraction == true
          ? currency.map((data, index) => {
              return (
                <SelectOptions
                  key={index}
                  value={`${data.code} - ${data.name}`}
                  flag={data.flag}
                  setInput={setInput}
                  setfirstInteraction={setfirstInteraction}
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
                    setfirstInteraction={setfirstInteraction}
                  />
                );
              }
            })}
      </div>
    </div>
  );
};
