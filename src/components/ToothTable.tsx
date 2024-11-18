import { ToothRow } from "@/components";
import { ToothTableProps } from "@/types/tooth";

const ToothTable: React.FC<ToothTableProps> = ({
  position,
  state,
  selectedOption,
}) => {
  const teethRange =
    position === "top"
      ? [11, 12, 13, 14, 15, 16, 17, 18]
      : [48, 47, 46, 45, 44, 43, 42, 41];

  return (
    <table
      className={`${position}-table border-collapse table-fixed w-full text-sm`}
    >
      <tbody>
        {teethRange.map((leftTooth) => (
          <ToothRow
            key={leftTooth}
            leftTooth={leftTooth}
            rightTooth={position === "top" ? leftTooth + 10 : leftTooth - 10}
            state={state}
            selectedOption={selectedOption}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ToothTable;
