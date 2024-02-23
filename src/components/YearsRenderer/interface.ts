export interface YearsRendererProps {
  currentYear: number;
  currentMonth: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
  setcurrentYear: React.Dispatch<React.SetStateAction<number>>;
  setshowOtherYears: React.Dispatch<React.SetStateAction<boolean>>;
}
