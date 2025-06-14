import React from "react";

export const SelectOptions = ({
  value,
  flag,
  setInput,
  setfirstInteraction,
}) => {
  const setval = () => {
    setInput(value, true, flag);
    setfirstInteraction(false);
  };
  return (
    <div onClick={setval} className="">
      <img
        src={flag}
        alt="flag"
        className="p-1 m-1  ml-3 inline cursor-pointer w-12 h-10"
      />
      <li className="inline list-none cursor-pointer  bg-white">{value}</li>
    </div>
  );
};
