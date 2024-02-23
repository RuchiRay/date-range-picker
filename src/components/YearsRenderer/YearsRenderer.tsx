import { getYears } from "../../utils";
import { YearsRendererProps } from "./interface";

export const YearsRenderer = ({
  currentYear,
  currentMonth,
  setCurrentMonth,
  setcurrentYear,
  setshowOtherYears,
}: YearsRendererProps) => {
  const yearsData = getYears();
  const handleChange = (month: number, year: number) => {
    setcurrentYear(year);
    setCurrentMonth(month);
    setshowOtherYears(false);
  };
  return (
    <div className="w-[336px] h-[300px] overflow-y-auto">
      {yearsData.map((year) => {
        return (
          <div
            key={year.year}
            className="flex py-2 border-b-2 border-b-gray-300 border-dashed items-center gap-4"
          >
            <p className={year.year === currentYear ? "text-blue-700" : ""}>
              {year.year}
            </p>
            <div className="flex flex-wrap">
              {year.months.map((month) => {
                return (
                  <button
                    key={month}
                    onClick={() => handleChange(month, year.year)}
                    className={`cursor-pointer w-11 h-11 flex justify-center items-center rounded-md ${
                      month === currentMonth &&
                      year.year === currentYear &&
                      "bg-blue-700 text-white"
                    } hover:bg-blue-100 hover:text-blue-600`}
                  >
                    {month + 1}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
