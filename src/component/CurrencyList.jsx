import { React, useState } from "react";
import currency from "../assets/countries.json";
import { SelectOptions } from "./CurrencyList.Options";

export const CurrencyList = ({
  baseCurr,
  changeBase,
  ChangeFlag,
  baseFlag,
}) => {
  // const [baseCurr, setSearchInput] = useState(baseCurr);
  // const [flag, setFlag] = useState(Dflag);
  const [showDropDown, setShowDropDown] = useState(true);

  function setInput(value, bool, img) {
    changeBase(value);
    setShowDropDown(bool);
    ChangeFlag(img);
  }

  return (
    <div>
      <div className="border-1 h-14 p-0 w-[95%] sm:w-max">
        <img
          src={baseFlag}
          alt="flag"
          className="inline p-1.5 py-0 h-12  pr-0 pt-0   border-none border-r-0"
        />
        <input
          type="text"
          value={baseCurr}
          onChange={(e) => changeBase(e.target.value)}
          onDrop={(e) => e.preventDefault()}
          onClick={(e) => {
            setShowDropDown(false);
            return e.target.select();
          }}
          className="p-1.5 m-3 border-none h-12  mt-1  pt-1 ml-2 border-l-0 outline-none focus:outline-none w-[70%] sm:w-65"
        />
      </div>

      <div
        className={
          showDropDown
            ? "hidden"
            : "h-80 bg-white rounded-2xl overflow-auto w-70  absolute z-999 "
        }
      >
        {baseCurr === "" || baseCurr === "INR" || baseCurr === "USD"
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
