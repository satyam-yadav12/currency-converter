import React from "react";

export const SelectOptions = ({ value, flag, setInput }) => {
  const setval = () => {
    setInput(value, true, flag);
  };
  return (
    <div onClick={setval} className="">
      <img
        src={flag}
        alt="flag"
        className="p-1 m-1  ml-3 inline cursor-pointer"
      />
      <li className="inline list-none cursor-pointer  bg-white ">{value}</li>
    </div>
  );
};
