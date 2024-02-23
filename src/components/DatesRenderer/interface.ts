import { CalenderData, Range } from "../RangePicker/interface";

export interface DatesRendererProps {
  calenderData: CalenderData;
  setRange: React.Dispatch<React.SetStateAction<Range>>;
  currentMonth: number;
  currentYear: number;
  range: Range;
}
