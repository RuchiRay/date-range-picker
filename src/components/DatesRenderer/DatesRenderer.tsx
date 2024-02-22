import React from "react";
import { DatesRendererProps } from "./interface";
import { createDate } from "../../utils";

export const DatesRenderer = ({
  calenderData,
  currentMonth,
  currentYear,
  setRange,
  range,
}: DatesRendererProps) => {
  const handleRange = (date: number) => {
    const fullDate = createDate(date, currentMonth, currentYear);
    if (range.first && range.second) {
      setRange({
        first: fullDate,
        second: null,
      });
    } else if (range.first) {
      if (range.first > fullDate) {
        setRange({ first: fullDate, second: range.first });
      } else
        setRange((prev) => {
          return { ...prev, second: fullDate };
        });
    } else {
      setRange((prev) => {
        return { ...prev, first: fullDate };
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
                    (date.date === range.first?.getDate() ||
                      date.date === range.second?.getDate()) &&
                    "bg-blue-700 text-white"
                  } ${
                    range?.first?.getDate() &&
                    date.date > range?.first?.getDate() &&
                    range?.second?.getDate() &&
                    date.date < range?.second?.getDate() &&
                    "bg-blue-300"
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
