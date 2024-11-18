import { Tooth } from "@/components";
import { TeethProps } from "@/types/teeth";
import { getArray } from "@/lib/utils";
import { useTooth } from "@/context/tooth-context";

const Teeth: React.FC<TeethProps> = ({
  labelPlacement,
  toothType,
  start,
  end,
  x,
  y,
}) => {
  const { state } = useTooth();
  const tooths = getArray(start, end);

  return (
    <g transform="scale(1.4)" id="gmain">
      {tooths.map((i) => (
        <Tooth
          key={i}
          labelPlacement={labelPlacement}
          toothType={toothType}
          number={i}
          positionY={y}
          positionX={Math.abs((i - start) * 20) + x}
          toothState={state[i]}
        />
      ))}
    </g>
  );
};

export default Teeth;
