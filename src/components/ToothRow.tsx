import { formatToothData } from "@/lib/utils";
import { ToothRowProps } from "@/types/tooth";

const ToothRow: React.FC<ToothRowProps> = ({
  leftTooth,
  rightTooth,
  state,
  selectedOption,
}) => {
  const childTooth = leftTooth < 46 ? leftTooth + 40 : null;
  const rightChildTooth = rightTooth < 36 ? rightTooth + 40 : null;

  const getToothData = (tooth: number, childTooth: number | null) => {
    const mainToothData = formatToothData(state[tooth], tooth, false);
    const childToothData = childTooth
      ? formatToothData(state[childTooth], childTooth, true)
      : "";

    return [mainToothData, childToothData].filter(Boolean).join("; ") || "-";
  };

  const renderToothNumber = (tooth: number, childTooth: number | null) => (
    <>
      {tooth}{" "}
      {childTooth && (
        <>
          {selectedOption === "dewasa" ? (
            <span className="line-through">[{childTooth}]</span>
          ) : (
            `[${childTooth}]`
          )}
        </>
      )}
    </>
  );

  return (
    <tr>
      <td className="border border-slate-400 text-slate-500 w-20 text-center">
        {renderToothNumber(leftTooth, childTooth)}
      </td>
      <td className="border border-slate-400 text-slate-500 px-4">
        {getToothData(leftTooth, childTooth)}
      </td>
      <td className="border border-slate-400 text-slate-500 px-4">
        {getToothData(rightTooth, rightChildTooth)}
      </td>
      <td className="border border-slate-400 text-slate-500 w-20 text-center">
        {renderToothNumber(rightTooth, rightChildTooth)}
      </td>
    </tr>
  );
};

export default ToothRow;
