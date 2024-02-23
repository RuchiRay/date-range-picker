export interface DayMap {
  [key: number]: string;
}

export interface MonthMap {
  [key: number]: string;
}

export interface MonthDaysMap {
  [key: string]: number;
}

export interface Range {
  first: Date | null;
  second: Date | null;
}

export interface CalenderData {
  month: number;
  dates: CalenderDate[][];
}

export interface CalenderDate {
  day: string;
  date: number;
}

export interface RangePickerProps {
  setRangeSelected: React.Dispatch<React.SetStateAction<(string | null)[][]>>;
}
