import React, { useEffect, useState } from "react";
import { getCalenderData } from "../../utils";
import { monthMap } from "./contants";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";
export const Calender = () => {
  const date = new Date();
  const currentDate = date.getDate();
  const currentDay = date.getDay();
  const [currentMonth, setcurrentMonth] = useState(date.getMonth());
  const [currentYear, setcurrentYear] = useState(date.getFullYear());

  const [calenderData, setcalenderData] = useState(
    getCalenderData(currentYear, monthMap[currentMonth])
  );

  const handleNext = () => {
    if (currentMonth + 1 < 12) setcurrentMonth((prev) => prev + 1);
    else {
      setcurrentMonth(0);
      setcurrentYear((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentMonth - 1 >= 0) setcurrentMonth((prev) => prev - 1);
    else {
      setcurrentMonth(11);
      setcurrentYear((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const newCalenderData = getCalenderData(
      currentYear,
      monthMap[currentMonth]
    );
    setcalenderData(newCalenderData);
  }, [currentMonth, currentYear]);

  return (
    <div className="flex m-auto  flex-col w-max items-center justify-center my-8">
      <div className="mb-4 w-full flex justify-between">
        <button
          className="hover:bg-gray-300 rounded-md w-6 flex justify-center items-center"
          onClick={handlePrev}
        >
          <IoChevronBackOutline />
        </button>
        <button className="hover:bg-gray-300 rounded-md  px-4 py-1">
          {monthMap[currentMonth]} {currentYear}
        </button>
        <button
          className="hover:bg-gray-300 rounded-md w-6 flex justify-center items-center"
          onClick={handleNext}
        >
          <IoChevronForward />
        </button>
      </div>
      <div>
        <div className="flex">
          <p className="w-12 h-12">Su</p>
          <p className="w-12 h-12">Mo</p>
          <p className="w-12 h-12">Tu</p>
          <p className="w-12 h-12">We</p>
          <p className="w-12 h-12">Th</p>
          <p className="w-12 h-12">Fr</p>
          <p className="w-12 h-12">Sa</p>
        </div>
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
    </div>
  );
};
