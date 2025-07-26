import { Button, Drawer } from "@mui/material";
import React, { useState, useEffect } from "react";
import { History } from "../features/history";

export const Navbar = ({ saveHistory, setSaveHistory, firstBase, secBase }) => {
  const [open, setOpen] = useState(false);
  const [recent, setRecent] = useState([""]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    if (saveHistory) {
      // console.log("history save intialize");
      let localHistory = JSON.parse(
        localStorage.getItem("PastConversion") || "[]"
      );

      const RecentSearch = {
        firstVal: firstBase.split("-")[0],
        secVal: secBase.split("-")[0],
      };
      let duplicate = false;
      recent.forEach((element) => {
        if (JSON.stringify(RecentSearch) === JSON.stringify(element)) {
          duplicate = true;
        }
      });

      if (duplicate == true) {
        // console.log(duplicate);
        // console.log("duplicate found");
      } else {
        localHistory.push(RecentSearch);
        if (localHistory.length > 10) {
          localHistory.shift();
        }
      }

      // console.log(localHistory);
      localStorage.setItem("PastConversion", JSON.stringify(localHistory));

      setSaveHistory(false);
    } else {
      const localHistory = JSON.parse(
        localStorage.getItem("PastConversion") || "[]"
      );

      setRecent(localHistory);
    }
    // console.log("history save success");
  }, [saveHistory]);

  return (
    <div>
      <div className="flex flex-row  mt-2 mb-5 p-3">
        <div className="text-3xl font-bold text-left ml-[2%] w-[70%] ">
          Prime Converter
        </div>
        <div className="ml-auto sm:mr-8 mr-2 font-bold">
          <Button onClick={toggleDrawer(true)}>
            <span>
              <img
                src="https://cdn-icons-png.flaticon.com/128/8166/8166558.png"
                alt=">"
                className="inline w-8 h-8 p-1"
              />
            </span>
            <span className="font-bold ">Sidebar</span>
          </Button>
        </div>
        <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
          <History
            toggleDrawer={toggleDrawer}
            recent={recent}
            setRecent={setRecent}
          />
        </Drawer>
      </div>
    </div>
  );
};
