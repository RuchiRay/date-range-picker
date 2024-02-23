import React, { useState } from "react";
import { RangePicker } from "./components/RangePicker/RangePicker";

function App() {
  const [rangeSelected, setRangeSelected] = useState<(string | null)[][]>([]); // this will contain selected date range and any weekend dates within that range.

  console.log(rangeSelected, "range selected and weekends between the range");

  return (
    <div className="App">
      <RangePicker setRangeSelected={setRangeSelected} />
    </div>
  );
}

export default App;
