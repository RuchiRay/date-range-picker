import React, { useEffect, useState } from "react";
import { getFirstDayOfMonth, isLeapYear } from "../../utils";
import { dayMap, monthDaysMap, monthMap } from "./contants";

export const Calender = () => {
  const date = new Date();
  const currentDate = date.getDate();
  const currentDay = date.getDay();
  const [currentMonth, setcurrentMonth] = useState(date.getMonth());
  const currentYear = date.getFullYear();

  const [calenderData, setcalenderData] = useState(
    getCalenderData(currentYear, monthMap[currentMonth])
  );

  const handleNext = () => {
    setcurrentMonth((prev) => prev + 1);
  };
  const handlePrev = () => {
    setcurrentMonth((prev) => prev - 1);
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
        <button onClick={handlePrev}>prev</button>
        {monthMap[currentMonth]} , {currentYear}
        <button onClick={handleNext}>next</button>
      </div>
      <div>
        <div className="flex  ">
          <p className="w-12 h-12">Su</p>
          <p className="w-12 h-12">Mo</p>
          <p className="w-12 h-12">Tu</p>
          <p className="w-12 h-12">We</p>
          <p className="w-12 h-12 ">Th</p>
          <p className="w-12 h-12 ">Fr</p>
          <p className="w-12 h-12 ">Sa</p>
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

const getCalenderData = (currentYear: number, currentMonth: string) => {
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const calenderData = [];
  let weekArray = [];
  let day = 0;
  for (const key in dayMap) {
    if (dayMap[key] !== firstDayOfMonth) {
      weekArray.push({ day: dayMap[key], date: 0 });
      day++;
    } else break;
  }
  const totalDays =
    isLeapYear(currentYear) && monthDaysMap[currentMonth] === 28
      ? 29
      : monthDaysMap[currentMonth];
  for (let i = 1; i <= totalDays; i++) {
    weekArray.push({ day: dayMap[day], date: i });
    day++;
    if (day === 7) {
      calenderData.push(weekArray);
      weekArray = [];
      day = 0;
    }
  }
  calenderData.push(weekArray);
  return calenderData;
};
