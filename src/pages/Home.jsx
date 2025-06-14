import { useState } from "react";
import { Converter } from "../component/Converter";
import { CurrencyBoard } from "../component/CurrencyBoard";
import { Graph } from "../component/Graph";

export const Home = () => {
  const [firstBase, setFirstBase] = useState("USD - United States Dollar");
  const [secBase, setSecBase] = useState("INR - Indian Rupee");
  const [changeGraph, setChangeGraph] = useState(false);
  return (
    <div>
      <div className="w-full">
        <Converter
          firstBase={firstBase}
          setFirstBase={setFirstBase}
          setSecBase={setSecBase}
          secBase={secBase}
          changeGraph={setChangeGraph}
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
        <CurrencyBoard firstBase={firstBase} secBase={secBase} />
      </div>
    </div>
  );
};
