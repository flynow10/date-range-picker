import { Dispatch, SetStateAction, useMemo, useRef } from "react";

type SliderProps = {
  minDate: Date;
  maxDate: Date;
  rangeMin: Date;
  rangeMax: Date;
  setRangeMin?: Dispatch<SetStateAction<Date>>;
  setRangeMax?: Dispatch<SetStateAction<Date>>;
};

const removeTime = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate;
};

export default function Slider(props: SliderProps) {
  const dateFormatter = useRef(
    new Intl.DateTimeFormat("en-US", { dateStyle: "short" })
  );

  const minDate = useMemo(() => removeTime(props.minDate), [props.minDate]);
  const maxDate = useMemo(() => removeTime(props.maxDate), [props.maxDate]);
  const rangeMin = useMemo(() => removeTime(props.rangeMin), [props.rangeMin]);
  const rangeMax = useMemo(() => removeTime(props.rangeMax), [props.rangeMax]);

  const minMaxRange = maxDate.getTime() - minDate.getTime();
  if (minMaxRange < 0) {
    throw new Error("Min date cannot be larger than max date!");
  }
  const minRangePercentage =
    (rangeMin.getTime() - minDate.getTime()) / minMaxRange;
  const maxRangePercentage =
    (rangeMax.getTime() - minDate.getTime()) / minMaxRange;

  return (
    <div
      style={{
        position: "relative",
        width: "200px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "4px",
        }}
      >
        <span>{dateFormatter.current.format(minDate)}</span>
        <span>{dateFormatter.current.format(maxDate)}</span>
      </div>
      <div
        style={{
          position: "relative",
          border: "1px solid #ccc",
          borderRadius: "5px",
          width: "100%",
          height: "10px",
        }}
      >
        <div
          style={{
            position: "absolute",
            backgroundColor: "#36a",
            width: `${((maxRangePercentage - minRangePercentage) * 100).toPrecision(3)}%`,
            height: "100%",
            top: "0",
            left: `${(minRangePercentage * 100).toPrecision(5)}%`,
          }}
        ></div>
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "100%",
            backgroundColor: "#38c",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%) translateX(-50%)",
            left: `${(minRangePercentage * 100).toPrecision(5)}%`,
          }}
        ></div>
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "100%",
            backgroundColor: "#38c",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%) translateX(-50%)",
            left: `${(maxRangePercentage * 100).toPrecision(5)}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
