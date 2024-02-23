import {
  dayMap,
  monthDaysMap,
  monthMap,
} from "./components/RangePicker/contants";
import { CalenderData } from "./components/RangePicker/interface";

export const getFirstDayOfMonth = (
  currentYear: number,
  currentMonth: string
) => {
  let firstDate = new Date(`${currentYear}-${currentMonth}-01`);
  let firstDay = dayMap[firstDate.getDay()];
  return firstDay;
};

export const isLeapYear = (year: number) => {
  if (year % 4 === 0) return true;
  else return false;
};

export const getCalenderData = (currentYear: number, currentMonth: number) => {
  const firstDayOfMonth = getFirstDayOfMonth(
    currentYear,
    monthMap[currentMonth]
  );
  const calenderData: CalenderData = { month: currentMonth, dates: [] };

  let weekArray = [];
  let day = 0;
  for (const key in dayMap) {
    if (dayMap[key] !== firstDayOfMonth) {
      weekArray.push({ day: dayMap[key], date: 0 });
      day++;
    } else break;
  }

  const totalDays =
    isLeapYear(currentYear) && currentMonth === 1
      ? 29
      : monthDaysMap[monthMap[currentMonth]];

  for (let i = 1; i <= totalDays; i++) {
    weekArray.push({ day: dayMap[day], date: i });
    day++;
    if (day === 7) {
      calenderData.dates.push(weekArray);
      weekArray = [];
      day = 0;
    }
  }
  calenderData.dates.push(weekArray);

  return calenderData;
};

export const getYears = () => {
  let yearsData = [];
  for (let i = 1900; i <= 2100; i++) {
    let year = {
      year: i,
      months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    };
    yearsData.push(year);
  }
  return yearsData;
};

export const createDate = (date: number, month: number, year: number) => {
  const newDate = new Date(year, month, date);
  return newDate;
};

export const formatDate = (fullDate: Date | null) => {
  if (fullDate) {
    const month =
      fullDate.getMonth() > 9
        ? fullDate.getMonth() + 1
        : `0${fullDate.getMonth() + 1}`;
    const date =
      fullDate.getDate() > 9 ? fullDate.getDate() : `0${fullDate.getDate()}`;
    const newDate = `${fullDate.getFullYear()}-${month}-${date}`;
    return newDate;
  }
  return null;
};

export const getWeekendsBetweenDates = (startDate: Date, endDate: Date) => {
  const weekends = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      weekends.push(formatDate(new Date(currentDate)));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekends;
};
