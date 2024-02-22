import React, { useEffect, useState } from "react";
import { getCalenderData } from "../../utils";
import { monthMap } from "./contants";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";
import { WeekRenderer } from "../WeekRenderer/WeekRenderer";
import { DatesRenderer } from "../DatesRenderer/DatesRenderer";
import { YearsRenderer } from "../YearsRenderer/YearsRenderer";
import { Range } from "./interface";
export const Calender = () => {
  const date = new Date();
  const currentDate = date.getDate();
  const currentDay = date.getDay();

  const [currentMonth, setcurrentMonth] = useState(date.getMonth());
  const [currentYear, setcurrentYear] = useState(date.getFullYear());
  const [showOtherYears, setshowOtherYears] = useState(false);
  const [calenderData, setcalenderData] = useState(
    getCalenderData(currentYear, monthMap[currentMonth])
  );
  const [range, setRange] = useState<Range>({ first: null, second: null });
  console.log(range, "range");

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
    <div className="flex m-auto border-2 rounded-md p-6 border-gray-300 border-solid  flex-col w-max items-center justify-center my-8">
      <div className="mb-4 w-full flex justify-between">
        <button
          className="hover:bg-gray-300 rounded-md w-6 flex justify-center items-center"
          onClick={handlePrev}
        >
          <IoChevronBackOutline />
        </button>
        <button
          onClick={() => setshowOtherYears(!showOtherYears)}
          className="hover:bg-gray-300 cursor-pointer rounded-md  px-4 py-1"
        >
          {monthMap[currentMonth]} {currentYear}
        </button>
        <button
          className="hover:bg-gray-300 rounded-md w-6 flex justify-center items-center"
          onClick={handleNext}
        >
          <IoChevronForward />
        </button>
      </div>
      {showOtherYears ? (
        <YearsRenderer
          setcurrentYear={setcurrentYear}
          setCurrentMonth={setcurrentMonth}
          setshowOtherYears={setshowOtherYears}
          currentYear={currentYear}
        />
      ) : (
        <div>
          <WeekRenderer />
          <DatesRenderer
            currentMonth={currentMonth}
            currentYear={currentYear}
            setRange={setRange}
            calenderData={calenderData}
            range={range}
          />
        </div>
      )}
    </div>
  );
};
