import { dayMap, monthDaysMap } from "./components/calender/contants";

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

export const getCalenderData = (currentYear: number, currentMonth: string) => {
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
