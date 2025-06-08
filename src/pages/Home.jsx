import { useState } from "react";
import { CurrencyList } from "../component/CurrencyList";

export const Home = () => {
  const [firstBase, setFirstBase] = useState("INR");
  const [secBase, setSecBase] = useState("USD");
  const [baseFlagFirst, changeBaseFlagFirst] = useState(
    "https://cdn-icons-png.flaticon.com/128/14009/14009677.png"
  );
  const [baseFlagSecond, changeBaseFlagSecond] = useState(
    "https://cdn-icons-png.flaticon.com/128/206/206626.png"
  );
  const [baseValue, setBaseValue] = useState(1);
  const reverseValue = () => {
    const temp = firstBase;
    const tempFlag = baseFlagFirst;
    setFirstBase(secBase);
    setSecBase(temp);
    changeBaseFlagFirst(baseFlagSecond);
    changeBaseFlagSecond(tempFlag);
  };

  const ConvertCurrency = () => {
    console.log(
      firstBase,
      "firstBase",
      secBase,
      "secBase",
      baseValue,
      "baseValue"
    );
  };
  return (
    <div className="w-full sm:w-2/3 m-auto">
      <h1 className="text-3xl text-center font-bold m-3 my-5 ml-0">
        CURRENCY CONVERTER
      </h1>
      <div className="sm:w-1/2 w-[95%] m-auto sm:m-0 block my-5">
        <input
          type="number"
          name="Value"
          value={baseValue}
          onChange={(e) => setBaseValue(e.target.value)}
          className="h-14 p-2 border-1 w-[95%] m-auto sm:m-0  sm:w-83 focus:outline-none outline-none"
        />
      </div>
      <div className="flex flex-col justify-between items-center sm:flex-row w-full h-60  sm:h-20 m-auto sm:m-0">
        <div className="  w-[95%] sm:w-75  ">
          <CurrencyList
            baseCurr={firstBase}
            changeBase={setFirstBase}
            baseFlag={baseFlagFirst}
            ChangeFlag={changeBaseFlagFirst}
          />
        </div>
        <div className=" w-max mx-3 ">
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
      <div className="block m-auto w-30 border-1 bg-white my-5 ">
        <button onClick={ConvertCurrency} className="p-2 block w-30">
          SUBMIT
        </button>
      </div>

      {/* result */}

      <div className="m-3">
        <h1>Result</h1>
        <p>-- USD = -- INR</p>
        <p>1 USD = 84 INR</p>
      </div>
    </div>
  );
};
