import React from "react";
import { DatesRendererProps } from "./interface";

export const DatesRenderer = ({ calenderData }: DatesRendererProps) => {
  return (
    <div>
      {calenderData.map((week) => {
        return (
          <div className="flex">
            {week.map((date) => {
              return (
                <p className={`w-12 h-12 ${date.date === 0 && "opacity-0"}`}>
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
