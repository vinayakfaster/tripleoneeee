"use client";

import React from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../../styles/calendar-custom.css";

type Props = {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
};

function Calendar({ value, onChange, disabledDates }: Props) {
  return (
    <DateRange
      ranges={[value]}
      onChange={onChange}
      rangeColors={["#ff385c"]}

      // ✅ IMPORTANT FIX
      moveRangeOnFirstSelection={false}
      retainEndDateOnFirstSelection={false}

      direction="vertical"
      showDateDisplay={false}

      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
}

export default Calendar;