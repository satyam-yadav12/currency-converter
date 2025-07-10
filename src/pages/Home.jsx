import { useState } from "react";
import { Converter } from "../features/Converter";
import { CurrencyBoard } from "../features/CurrencyBoard";
import { Graph } from "../features/Graph";

export const Home = () => {
  const [firstBase, setFirstBase] = useState("USD - United States Dollar");
  const [secBase, setSecBase] = useState("INR - Indian Rupee");
  const [changeGraph, setChangeGraph] = useState(false);
  const [changeCurrencyBoard, setChangeCurrencyBoard] = useState(false);
  return (
    <div>
      <div className="w-full">
        <Converter
          firstBase={firstBase}
          setFirstBase={setFirstBase}
          setSecBase={setSecBase}
          secBase={secBase}
          changeGraph={setChangeGraph}
          changeBoard={setChangeCurrencyBoard}
        />
      </div>
      <div>
        <Graph
          firstBase={firstBase}
          secBase={secBase}
          changeGraph={changeGraph}
          setChangeGraph={setChangeGraph}
        />
      </div>
      <div>
        <CurrencyBoard
          firstBase={firstBase}
          changeBoard={changeCurrencyBoard}
          setChangeBoard={setChangeCurrencyBoard}
        />
      </div>
    </div>
  );
};
