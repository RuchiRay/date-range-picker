import React from "react";
import { DatesRendererProps } from "./interface";

export const DatesRenderer = ({
  calenderData,
  currentMonth,
  currentYear,
  setRange,
  range,
}: DatesRendererProps) => {
  const date = new Date();
  const currentDate = date.getDate();
  console.log(currentDate);
  const handleRange = (date: number) => {
    if (range.first.length && range.second.length) {
      setRange({ first: `${date}`, second: "" });
    } else if (range.first.length) {
      if (Number(range.first) > date) {
        setRange({ first: `${date}`, second: range.first });
      } else
        setRange((prev) => {
          return { ...prev, second: `${date}` };
        });
    } else {
      setRange((prev) => {
        return { ...prev, first: `${date}` };
      });
    }
  };

  return (
    <div>
      {calenderData.map((week) => {
        return (
          <div key={Math.random()} className="flex">
            {week.map((date) => {
              return (
                <button
                  onClick={() => handleRange(date.date)}
                  key={Math.random()}
                  className={`w-12 h-12 flex justify-center items-center cursor-pointer rounded-md  ${
                    date.date === 0 && "opacity-0"
                  } ${
                    (date.date === Number(range.first) ||
                      date.date === Number(range.second)) &&
                    "bg-blue-700 text-white"
                  } `}
                >
                  {date.date}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
