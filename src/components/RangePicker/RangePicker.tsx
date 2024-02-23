import React, { useEffect, useState } from "react";
import {
  formatDate,
  getCalenderData,
  getLast7DaysWithoutWeekends,
  getWeekWithoutWeekends,
  getWeekendsBetweenDates,
  isLeapYear,
} from "../../utils";
import { monthDaysMap, monthMap } from "./contants";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";
import { WeekRenderer } from "../WeekRenderer/WeekRenderer";
import { DatesRenderer } from "../DatesRenderer/DatesRenderer";
import { YearsRenderer } from "../YearsRenderer/YearsRenderer";
import { Range, RangePickerProps } from "./interface";
export const RangePicker = ({ setRangeSelected }: RangePickerProps) => {
  const date = new Date();

  const [currentMonth, setcurrentMonth] = useState(date.getMonth());
  const [currentYear, setcurrentYear] = useState(date.getFullYear());
  const [showOtherYears, setshowOtherYears] = useState(false);
  const [calenderData, setcalenderData] = useState(
    getCalenderData(currentYear, currentMonth)
  );
  const [range, setRange] = useState<Range>({ first: null, second: null });

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
    const newCalenderData = getCalenderData(currentYear, currentMonth);
    setcalenderData(newCalenderData);
  }, [currentMonth, currentYear]);

  const handleLastDays = (days: number) => {
    const { first, second } = getLast7DaysWithoutWeekends(days);

    if (first && second) {
      setcurrentMonth(first?.getMonth());
      setcurrentYear(first.getFullYear());
      setRange({ first, second });
    }
  };

  const handleLastWeek = () => {
    const { first, second } = getWeekWithoutWeekends(-1);
    if (first && second) {
      setcurrentMonth(first?.getMonth());
      setcurrentYear(first.getFullYear());
      setRange({ first, second });
    }
  };

  const handleNextWeek = () => {
    const { first, second } = getWeekWithoutWeekends(1);
    if (first && second) {
      setcurrentMonth(first?.getMonth());
      setcurrentYear(first.getFullYear());
      setRange({ first, second });
    }
  };

  const handleMonth = (val: number) => {
    let first = new Date(currentYear, currentMonth - val, 1);
    if (first.getDay() === 6) {
      first.setDate(first.getDate() + 2);
    }
    if (first.getDay() === 0) first.setDate(first.getDate() + 1);
    let second = new Date(
      currentYear,
      currentMonth - val,
      isLeapYear(currentYear) && currentMonth - val === 1
        ? 29
        : monthDaysMap[monthMap[currentMonth - val]]
    );
    if (second.getDay() === 6) {
      second.setDate(second.getDate() - 1);
    }
    if (second.getDay() === 0) second.setDate(second.getDate() - 2);
    setRange({ first, second });
    setcurrentMonth(first?.getMonth());
    setcurrentYear(first.getFullYear());
  };

  useEffect(() => {
    if (range.first && range.second) {
      const dateRange = [formatDate(range.first), formatDate(range.second)];
      const weekends = getWeekendsBetweenDates(range.first, range.second);
      if (dateRange && weekends) setRangeSelected([dateRange, weekends]);
    }
  }, [range, setRangeSelected]);

  return (
    <div className="flex w-[401px] m-auto border-2 rounded-md p-6 border-gray-300 border-solid  flex-col  items-center justify-center my-8">
      <div className="border-b-2 border-b-gray-300 w-full text-center pb-4 mb-4">
        {formatDate(range.first) ?? "yyyy-mm-dd"}~
        {formatDate(range.second) ?? "yyyy-mm-dd"}
      </div>

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
          currentMonth={currentMonth}
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
          <div className="flex flex-wrap gap-4 mt-4 cursor-pointer border-t-2 border-t-gray-300 pt-5">
            <button
              onClick={() => handleLastDays(7)}
              className="rounded-md py-1 px-3 hover:bg-gray-300 bg-gray-200"
            >
              Last 7 days
            </button>
            <button
              onClick={() => handleLastDays(30)}
              className="rounded-md py-1 px-3 hover:bg-gray-300 bg-gray-200"
            >
              Last 30 days
            </button>
            <button
              onClick={() => handleMonth(0)}
              className="rounded-md py-1 px-3 hover:bg-gray-300 bg-gray-200"
            >
              This month
            </button>
            <button
              onClick={handleLastWeek}
              className="rounded-md py-1 px-3 hover:bg-gray-300 bg-gray-200"
            >
              Last week
            </button>
            <button
              onClick={handleNextWeek}
              className="rounded-md py-1 px-3 hover:bg-gray-300 bg-gray-200"
            >
              Next week
            </button>
            <button
              onClick={() => handleMonth(1)}
              className="rounded-md py-1 px-3 hover:bg-gray-300 bg-gray-200"
            >
              Last Month
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
