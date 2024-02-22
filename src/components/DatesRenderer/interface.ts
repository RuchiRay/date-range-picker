import { Range } from "../calender/interface";

export interface CalenderData {
  day: string;
  date: number;
}

export interface DatesRendererProps {
  calenderData: CalenderData[][];
  setRange: React.Dispatch<React.SetStateAction<Range>>;
  currentMonth: number;
  currentYear: number;
  range: Range;
}
