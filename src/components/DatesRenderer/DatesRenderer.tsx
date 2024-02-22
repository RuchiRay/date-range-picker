import React from "react";
import { DatesRendererProps } from "./interface";

export const DatesRenderer = ({ calenderData }: DatesRendererProps) => {
  const date = new Date();
  const currentDate = date.getDate();
  console.log(currentDate);

  return (
    <div>
      {calenderData.map((week) => {
        return (
          <div className="flex">
            {week.map((date) => {
              return (
                <p
                  className={`w-12 h-12 flex justify-center items-center cursor-pointer rounded-md hover:bg-blue-100 hover:text-blue-600  ${
                    date.date === 0 && "opacity-0"
                  } ${
                    date.date === currentDate && "border-2  border-blue-400"
                  } `}
                >
                  {date.date}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
