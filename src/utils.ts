import { dayMap } from "./components/calender/contants";

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
