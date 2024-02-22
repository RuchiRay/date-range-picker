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
  console.log(range);

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

              return (
                <button
                  onClick={() => handleRange(date.date)}
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
