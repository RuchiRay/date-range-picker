export interface YearsRendererProps {
  currentYear: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
  setcurrentYear: React.Dispatch<React.SetStateAction<number>>;
  setshowOtherYears: React.Dispatch<React.SetStateAction<boolean>>;
}
