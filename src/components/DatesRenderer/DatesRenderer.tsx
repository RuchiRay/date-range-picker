import React, { useState } from "react";
import { DatesRendererProps } from "./interface";
import { createDate } from "../../utils";

export const DatesRenderer = ({
  calenderData,
  currentMonth,
  currentYear,
  setRange,
  range,
}: DatesRendererProps) => {
  const [hoveredDate, setHoveredDate] = useState();

  const handleRange = (date: number, day: string) => {
    const fullDate = createDate(date, currentMonth, currentYear);
    if (day === "Sa" || day === "Su") {
      setRange({
        first: null,
        second: null,
      });
    } else if (range.first && range.second) {
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
  console.log(range);

  const handlehover = (date: number, day: string) => {
    const fullDate = createDate(date, currentMonth, currentYear);
    if (range.first) {
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {calenderData.dates.map((week) => {
        return (
          <div key={Math.random()} className="flex gap-1">
            {week.map((date) => {
              const fullDate = createDate(
                date.date,
                calenderData.month,
                currentYear
              );
              // console.log(
              //   fullDate.getTime() === range.first?.getTime(),
              //   "check",
              //   fullDate.getTime(),
              //   range.first?.getTime(),
              //   date,
              //   fullDate
              // );

              return (
                <button
                  onMouseOver={() => handlehover(date.date, date.day)}
                  onClick={() => handleRange(date.date, date.day)}
                  key={Math.random()}
                  className={`w-11 h-11 flex justify-center items-center cursor-pointer rounded-md  ${
                    date.date === 0 && "opacity-0"
                  } ${
                    (fullDate.getTime() === range.first?.getTime() ||
                      fullDate.getTime() === range.second?.getTime()) &&
                    "bg-blue-700 text-white"
                  } ${
                    range?.first &&
                    fullDate > range?.first &&
                    range?.second &&
                    fullDate < range?.second &&
                    date.day !== "Su" &&
                    date.day !== "Sa" &&
                    "bg-blue-200 text-blue-700"
                  } ${
                    (date.day === "Su" || date.day === "Sa") &&
                    "cursor-not-allowed"
                  } ${
                    fullDate.getTime() !== range.first?.getTime() &&
                    fullDate.getTime() !== range.second?.getTime() &&
                    "hover:bg-blue-200 hover:text-blue-700"
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
