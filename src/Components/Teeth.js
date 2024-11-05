import React from "react";
import Tooth from "./Tooth";

function Teeth({ labelPlacement, toothType, start, end, x, y, handleChange, teethState  }) {
  let tooths = getArray(start, end);

  return (
    <g transform="scale(1.4)" id="gmain">
      {tooths.map((i) => (
        <Tooth
          labelPlacement={labelPlacement}
          toothType={toothType}
          onChange={handleChange}
          key={i}
          number={i}
          positionY={y}
          positionX={Math.abs((i - start) * 20) + x}
          toothState={teethState[i]}
          allTeethState={teethState}
          start={start}
          end={end}
        />
      ))}
    </g>
  );
}

function getArray(start, end) {
  if (start > end) return getInverseArray(start, end);

  let list = [];
  for (var i = start; i <= end; i++) {
    list.push(i);
  }

  return list;
}

function getInverseArray(start, end) {
  let list = [];

  for (var i = start; i >= end; i--) {
    list.push(i);
  }

  return list;
}

export default Teeth;
