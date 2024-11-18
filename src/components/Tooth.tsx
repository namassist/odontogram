import { useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

import { Zone } from "@/types/teeth";
import { ToothProps } from "@/types/tooth";
import { useTooth } from "@/context/tooth-context";

const Tooth: React.FC<ToothProps> = ({
  labelPlacement,
  toothType,
  number,
  positionX,
  positionY,
  toothState,
}) => {
  const { state: allTethState, selectedOption } = useTooth();

  const milkTeeth = [
    51, 52, 53, 54, 55, 61, 62, 63, 64, 65, 71, 72, 73, 74, 75, 81, 82, 83, 84,
    85,
  ];

  const { show } = useContextMenu({
    id: import.meta.env.VITE_APP_MENU_ID,
  });

  function displayMenu(e: React.MouseEvent, zone: string) {
    show({
      event: e,
      props: {
        key: number,
        zone: zone,
      },
    });
  }

  const handleContextMenu = (e: React.MouseEvent, zone: string) => {
    if (selectedOption === "") {
      return null;
    }

    // gigi dewasa
    if (!(selectedOption === "dewasa" && milkTeeth.includes(number))) {
      displayMenu(e, zone);
    }
  };

  const getClassNamesByZone = (zone: Zone) => {
    let className = "";

    if (toothState.bahanRestorasi.AMF) {
      if (toothState.bahanRestorasi.AMF[zone] === 1) {
        className += "amalgam";
      }
    }

    if (toothState.bahanRestorasi.COF) {
      if (toothState.bahanRestorasi.COF[zone] === 1) {
        className += "composite";
      }
    }

    if (toothState.bahanRestorasi.FIS) {
      if (toothState.bahanRestorasi.FIS[zone] === 1) {
        className += "fissure";
      }
    }

    if (toothState.bahanRestorasi.INL || toothState.bahanRestorasi.ONL) {
      if (
        toothState.bahanRestorasi.INL[zone] === 1 ||
        toothState.bahanRestorasi.ONL[zone] === 1
      ) {
        className += "inlay";
      }
    }

    if (toothState.keadaanGigi.CAR) {
      if (toothState.keadaanGigi.CAR[zone] > 0) {
        className += " caries";
      }
    }

    return className;
  };

  const translate = `translate(${positionX},${positionY})`;

  return (
    <svg className="tooth">
      <g transform={translate}>
        <polygon
          points="5,5 15,5 15,15 5,15"
          onContextMenu={(e) => handleContextMenu(e, "center")}
          className={`tooth-${number} ${getClassNamesByZone("center")}`}
        />
        <polygon
          points={
            toothType === "front" ? "0,0 20,0 15,8 5,8" : "0,0 20,0 15,5 5,5"
          }
          onContextMenu={(e) => handleContextMenu(e, "top")}
          className={getClassNamesByZone("top")}
        />
        <polygon
          points={
            toothType === "front"
              ? "5,8 15,8 20,20 0,20"
              : "5,15 15,15 20,20 0,20"
          }
          onContextMenu={(e) => handleContextMenu(e, "bottom")}
          className={getClassNamesByZone("bottom")}
        />
        <polygon
          points={
            toothType === "front"
              ? "15,8 20,0 20,20 15,8"
              : "15,5 20,0 20,20 15,15"
          }
          onContextMenu={(e) => handleContextMenu(e, "left")}
          className={getClassNamesByZone("left")}
        />
        <polygon
          points={
            toothType === "front" ? "0,0 5,8 5,8 0,20" : "0,0 5,5 5,15 0,20"
          }
          onContextMenu={(e) => handleContextMenu(e, "right")}
          className={getClassNamesByZone("right")}
        />
        {drawToothActions()}
        <text
          x="6"
          y={labelPlacement === "top" ? "-3" : "30"}
          stroke="black"
          fill="black"
          strokeWidth="0.2"
          className="tooth"
        >
          {number}
        </text>
      </g>
    </svg>
  );

  function drawToothActions() {
    const otherFigures = [];

    if (selectedOption === "dewasa" && milkTeeth.includes(number)) {
      otherFigures.push(
        <g pointerEvents={"none"}>
          <line
            x1="0"
            y1="-8"
            x2="30"
            y2="-8"
            stroke="black"
            strokeWidth="1.5"
            transform={`translate(-5, 17)`}
          />
        </g>
      );
    }

    // keadaan gigi
    if (toothState.keadaanGigi.NON > 0) {
      otherFigures.push(
        <g pointerEvents={"none"}>
          <text
            x="10"
            y={labelPlacement === "top" ? "-13" : "40"}
            textAnchor="middle"
            fill="black"
            stroke="black"
            strokeWidth="0.2"
            className="tooth"
          >
            NON
          </text>
        </g>
      );
    }

    if (toothState.keadaanGigi.UNE > 0) {
      otherFigures.push(
        <g pointerEvents={"none"}>
          <text
            x="10"
            y={labelPlacement === "top" ? "-13" : "40"}
            textAnchor="middle"
            fill="black"
            stroke="black"
            strokeWidth="0.2"
            className="tooth"
          >
            UNE
          </text>
        </g>
      );
    }

    if (toothState.keadaanGigi.PRE > 0) {
      otherFigures.push(
        <g pointerEvents={"none"}>
          <text
            x="10"
            y={labelPlacement === "top" ? "-13" : "40"}
            textAnchor="middle"
            fill="black"
            stroke="black"
            strokeWidth="0.2"
            className="tooth"
          >
            PRE
          </text>
        </g>
      );
    }

    if (toothState.keadaanGigi.ANO > 0) {
      otherFigures.push(
        <g pointerEvents={"none"}>
          <text
            x="10"
            y={labelPlacement === "top" ? "-13" : "40"}
            textAnchor="middle"
            fill="black"
            stroke="black"
            strokeWidth="0.2"
            className="tooth"
          >
            ANO
          </text>
        </g>
      );
    }

    if (toothState.keadaanGigi.CFR > 0) {
      otherFigures.push(
        <g stroke="black" strokeWidth="2" fill="none" pointerEvents="none">
          {/* Vertical lines */}
          <line x1="6" y1="1" x2="6" y2="19" />
          <line x1="14" y1="1" x2="14" y2="19" />
          {/* Horizontal lines */}
          <line x1="1" y1="7" x2="19" y2="7" />
          <line x1="1" y1="13" x2="19" y2="13" />
        </g>
      );
    }

    if (toothState.keadaanGigi.NVT > 0) {
      otherFigures.push(
        <g
          stroke="black"
          pointerEvents={"none"}
          transform={
            labelPlacement === "top" ? "translate(-3,-5)" : "translate(-3, -35)"
          }
        >
          <path
            d="M12.5 35 L5 25 L20 25 Z"
            fill="white"
            stroke="black"
            strokeWidth=".5"
            transform={labelPlacement === "top" ? "" : "rotate(180, 12.5, 30)"}
          />
        </g>
      );
    }

    if (toothState.keadaanGigi.RRX > 0) {
      otherFigures.push(
        <g stroke="black" strokeWidth="2" fill="none" pointerEvents="none">
          <line x1="0" y1="0" x2="10" y2="20" /> {/* Left side of V */}
          <line x1="20" y1="0" x2="10" y2="20" /> {/* Right side of V */}
        </g>
      );
    }

    if (toothState.keadaanGigi.MIS > 0) {
      otherFigures.push(
        <g stroke="black">
          <line x1="0" y1="0" x2="20" y2="20" strokeWidth="2" />
          <line x1="0" y1="20" x2="20" y2="0" strokeWidth="2" />
        </g>
      );
    }

    // restorasi
    if (toothState.restorasi.FMC > 0) {
      otherFigures.push(
        <g stroke="black" strokeWidth="2" pointerEvents={"none"}>
          <rect x="1" y="1" width="18" height="18" fill="none" />
        </g>
      );
    }

    if (toothState.restorasi.POC > 0) {
      otherFigures.push(
        <g stroke="black" strokeWidth="2" pointerEvents={"none"}>
          <polygon points="3,0 3,20" className="stripe" />
          <polygon points="5,0 5,20" className="stripe" />
          <polygon points="7,0 7,20" className="stripe" />
          <polygon points="9,0 9,20" className="stripe" />
          <polygon points="11,0 11,20" className="stripe" />
          <polygon points="13,0 13,20" className="stripe" />
          <polygon points="15,0 15,20" className="stripe" />
          <polygon points="17,0 17,20" className="stripe" />
          <polygon points="19,0 19,20" className="stripe" />
          <rect x="1" y="1" width="18" height="18" fill="none" />
        </g>
      );
    }

    if (toothState.restorasi.IPX > 0) {
      otherFigures.push(
        <g stroke="black" strokeWidth="2" pointerEvents="none">
          <text
            x="10"
            y={
              (toothState.keadaanGigi.NON > 0 ||
                toothState.keadaanGigi.UNE > 0 ||
                toothState.keadaanGigi.PRE > 0 ||
                toothState.keadaanGigi.ANO > 0) &&
              (toothState.protesa.PRD > 0 || toothState.protesa.FLD > 0)
                ? labelPlacement === "top"
                  ? "30"
                  : "-5"
                : toothState.keadaanGigi.NON > 0 ||
                  toothState.keadaanGigi.UNE > 0 ||
                  toothState.keadaanGigi.PRE > 0 ||
                  toothState.keadaanGigi.ANO > 0 ||
                  toothState.protesa.PRD > 0 ||
                  toothState.protesa.FLD > 0
                ? labelPlacement === "top"
                  ? "-23"
                  : "50"
                : labelPlacement === "top"
                ? "-13"
                : "40"
            }
            textAnchor="middle"
            fill="black"
            stroke="black"
            strokeWidth="0.2"
            className="tooth"
          >
            IPX
          </text>
        </g>
      );
    }

    if (toothState.restorasi.RCT > 0) {
      otherFigures.push(
        <g
          stroke="black"
          pointerEvents={"none"}
          transform={
            labelPlacement === "top" ? "translate(-3,-5)" : "translate(-3, -35)"
          }
        >
          <path
            d="M12.5 35 L5 25 L20 25 Z"
            fill="black"
            stroke="black"
            strokeWidth=".5"
            transform={labelPlacement === "top" ? "" : "rotate(180, 12.5, 30)"}
          />
        </g>
      );
    }

    if (toothState.restorasi.MEB > 0 || toothState.restorasi.POB > 0) {
      const prevToothId = number - 1;
      const nextToothId = number + 1;
      const prevToothHadBridge =
        allTethState[prevToothId]?.restorasi.MEB > 0 ||
        allTethState[prevToothId]?.restorasi.POB > 0;
      const nextToothHadBridge =
        allTethState[nextToothId]?.restorasi.MEB > 0 ||
        allTethState[nextToothId]?.restorasi.POB > 0;

      // Menentukan apakah gigi berada di sisi kanan
      const isRightSide = [
        21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37, 38, 61, 62,
        63, 64, 65, 71, 72, 73, 74, 75,
      ].includes(number);

      const isBottomSide = [
        31, 32, 33, 34, 35, 36, 37, 38, 71, 72, 73, 74, 75, 41, 42, 43, 44, 45,
        46, 47, 48, 81, 82, 83, 84, 85,
      ].includes(number);

      otherFigures.push(
        <>
          <g stroke="black" strokeWidth="2" pointerEvents={"none"}>
            <rect x="1" y="1" width="18" height="18" fill="none" />
          </g>
          <g key="black" stroke="black" strokeWidth="1.5" pointerEvents="none">
            {isRightSide ? (
              <>
                {!prevToothHadBridge && (
                  <line
                    x1="20"
                    y1="-8"
                    x2="20"
                    y2="0"
                    stroke="black"
                    strokeWidth="1.5"
                    transform={`translate(-10, ${isBottomSide ? "28" : "0"})`}
                  />
                )}
                {prevToothHadBridge && (
                  <line
                    x1="0"
                    y1="-8"
                    x2="20"
                    y2="-8"
                    stroke="black"
                    strokeWidth="1.5"
                    transform={`translate(-10, ${isBottomSide ? "36" : "0"})`}
                  />
                )}
                {prevToothHadBridge && !nextToothHadBridge && (
                  <line
                    x1="20"
                    y1="-8"
                    x2="20"
                    y2="0"
                    stroke="black"
                    strokeWidth="1.5"
                    transform={`translate(-10, ${isBottomSide ? "28" : "0"})`}
                  />
                )}
                {!prevToothHadBridge && !nextToothHadBridge && (
                  <>
                    <line
                      x1="20"
                      y1="-8"
                      x2="20"
                      y2="0"
                      stroke="black"
                      strokeWidth="1.5"
                      transform={`translate(-10, ${isBottomSide ? "28" : "0"})`}
                    />
                    <line
                      x1="0"
                      y1="-8"
                      x2="20"
                      y2="-8"
                      stroke="black"
                      strokeWidth="1.5"
                      transform={`translate(10, ${isBottomSide ? "36" : "0"})`}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                {!prevToothHadBridge && (
                  <line
                    x1="20"
                    y1="-8"
                    x2="20"
                    y2="0"
                    stroke="black"
                    strokeWidth="1.5"
                    transform={`translate(-10, ${isBottomSide ? "28" : "0"})`}
                  />
                )}
                {prevToothHadBridge && (
                  <line
                    x1="0"
                    y1="-8"
                    x2="20"
                    y2="-8"
                    stroke="black"
                    strokeWidth="1.5"
                    transform={`translate(10, ${isBottomSide ? "36" : "0"})`}
                  />
                )}
                {prevToothHadBridge && !nextToothHadBridge && (
                  <line
                    x1="20"
                    y1="-8"
                    x2="20"
                    y2="0"
                    stroke="black"
                    strokeWidth="1.5"
                    transform={`translate(-10, ${isBottomSide ? "28" : "0"})`}
                  />
                )}
                {!prevToothHadBridge && !nextToothHadBridge && (
                  <>
                    <line
                      x1="20"
                      y1="-8"
                      x2="20"
                      y2="0"
                      stroke="black"
                      strokeWidth="1.5"
                      transform={`translate(-10, ${isBottomSide ? "28" : "0"})`}
                    />
                    <line
                      x1="0"
                      y1="-8"
                      x2="20"
                      y2="-8"
                      stroke="black"
                      strokeWidth="1.5"
                      transform={`translate(-10, ${isBottomSide ? "36" : "0"})`}
                    />
                  </>
                )}
              </>
            )}
          </g>
          {toothState.restorasi.POB > 0 && (
            <g stroke="black" strokeWidth="2" pointerEvents={"none"}>
              <polygon points="3,0 3,20" className="stripe" />
              <polygon points="5,0 5,20" className="stripe" />
              <polygon points="7,0 7,20" className="stripe" />
              <polygon points="9,0 9,20" className="stripe" />
              <polygon points="11,0 11,20" className="stripe" />
              <polygon points="13,0 13,20" className="stripe" />
              <polygon points="15,0 15,20" className="stripe" />
              <polygon points="17,0 17,20" className="stripe" />
              <polygon points="19,0 19,20" className="stripe" />
              <rect x="1" y="1" width="18" height="18" fill="none" />
            </g>
          )}
        </>
      );
    }

    // protesa
    if (toothState.protesa.FLD > 0) {
      otherFigures.push(
        <g stroke="black">
          <line x1="0" y1="0" x2="20" y2="20" strokeWidth="2" />
          <line x1="0" y1="20" x2="20" y2="0" strokeWidth="2" />
          <text
            x="10"
            y={
              toothState.keadaanGigi.NON > 0 ||
              toothState.keadaanGigi.UNE > 0 ||
              toothState.keadaanGigi.PRE > 0 ||
              toothState.keadaanGigi.ANO > 0
                ? labelPlacement === "top"
                  ? "-23"
                  : "50"
                : labelPlacement === "top"
                ? "-13"
                : "40"
            }
            textAnchor="middle"
            fill="black"
            stroke="black"
            strokeWidth="0.2"
            className="tooth"
          >
            FLD
          </text>
        </g>
      );
    }

    if (toothState.protesa.PRD > 0) {
      otherFigures.push(
        <g stroke="black">
          <line x1="0" y1="0" x2="20" y2="20" strokeWidth="2" />
          <line x1="0" y1="20" x2="20" y2="0" strokeWidth="2" />
          <text
            x="10"
            y={
              toothState.keadaanGigi.NON > 0 ||
              toothState.keadaanGigi.UNE > 0 ||
              toothState.keadaanGigi.PRE > 0 ||
              toothState.keadaanGigi.ANO > 0
                ? labelPlacement === "top"
                  ? "-23"
                  : "50"
                : labelPlacement === "top"
                ? "-13"
                : "40"
            }
            textAnchor="middle"
            fill="black"
            stroke="black"
            strokeWidth="0.2"
            className="tooth"
          >
            PRD
          </text>
        </g>
      );
    }

    return otherFigures;
  }
};

export default Tooth;
