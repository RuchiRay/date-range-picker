import { CalenderData, Range } from "../calender/interface";

export interface DatesRendererProps {
  calenderData: CalenderData;
  setRange: React.Dispatch<React.SetStateAction<Range>>;
  currentMonth: number;
  currentYear: number;
  range: Range;
}
