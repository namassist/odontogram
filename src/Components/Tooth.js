import React from "react";
import useContextMenu from "contextmenu";
import "contextmenu/ContextMenu.css";
import "./Tooth.css";

function Tooth({
  labelPlacement = "bottom",
  toothType = "back",
  number,
  positionX,
  positionY,
  onChange,
  toothState,
  allTeethState,
  start,
  end
}) {
  // const initialState = useMemo(() => toothState, [toothState]);

//   const getAdjacentTeeth = () => {
//     // const isAscending = start < end;
//   return {
//     prevTooth:   number - 1 <= start ? null : allTeethState[number - 1],
//     nextTooth: number + 1 >= end ? null : allTeethState[number + 1]
//   };
// };

//  // Function to handle logic based on adjacent teeth
//  const handleAdjacentTeethLogic = (currentState, prevTooth, nextTooth) => {
//   // Example: If both adjacent teeth are missing, you might want to highlight this tooth
//   if (prevTooth?.MIS && nextTooth?.MIS) {
//     // Add special handling here
//     console.log(`Tooth ${number} has missing teeth on both sides`);
//   }
  
//   // Example: Check for bridge conditions
//   if (currentState.MIS && (prevTooth?.FMC || nextTooth?.FMC)) {
//     console.log(`Potential bridge situation for tooth ${number}`);
//   }
// };
// function reducer(state, action) {
//   let newState;
//   switch (action.type) {
//     case "FMC":
//       newState = { ...state, FMC: action.value };
//       break;
//     case "MIS":
//       newState = { ...state, MIS: action.value };
//       break;
//     case "RRX":
//       newState = { ...state, RRX: action.value };
//       break;
//     case "CFR":
//       newState = { ...state, CFR: action.value };
//       break;
//     case "carie":
//       newState = {
//         ...state,
//         Cavities: setCavities(state, action.zone, action.value)
//       };
//       break;
//     case "clear":
//       newState = initialState;
//       break;
//     default:
//       return state;
//   }
//   return newState;
// }

  // const FMC = (val) => ({ type: "FMC", value: val });
  // const MIS = (val) => ({ type: "MIS", value: val });
  // const RRX = (val) => ({ type: "RRX", value: val });
  // const CFR = (val) => ({ type: "CFR", value: val });
  // const carie = (z, val) => ({ type: "carie", value: val, zone: z });
  // const MEB = (val) => ({ type: "MEB", value: val });
  // const POB = (val) => ({ type: "POB", value: val });
  // const clear = () => ({ type: "clear" });

  const [contextMenu, useCM] = useContextMenu({ submenuSymbol: ">" });


 

  // // Get teeth in the same quadrant
  // const getTeethInQuadrant = () => {
  //   const quadrantStart = Math.floor(number / 10) * 10;
  //   const quadrantEnd = quadrantStart + 8;
    
  //   return Object.entries(allTeethState)
  //     .filter(([id, state]) => {
  //       const toothId = parseInt(id);
  //       return toothId >= quadrantStart && toothId <= quadrantEnd;
  //     })
  //     .map(([id, state]) => state);
  // };

  const handleStateChange = (type, value, zone = null) => {
    let newState = { ...toothState };
    
    switch (type) {
      case "FMC":
        newState.FMC = value;
        break;
      case "MIS":
        newState.MIS = value;
        break;
      case "RRX":
        newState.RRX = value;
        break;
      case "CFR":
        newState.CFR = value;
        break;
      case "carie":
        newState.Cavities = setCavities(newState, zone, value);
        break;
      case "MEB":
        newState.MEB = value;
      break;
      case "POB":
        newState.POB = value;
      break;
      case "M":
        newState.M = value;
      break;
      case "O":
        newState.O = value;
      break;
      case "D":
        newState.D = value;
      break;
      case "V":
        newState.V = value;
      break;
      case "L":
        newState.L = value;
      break;
      case "SOU":
        newState.SOU = value;
      break;
      case "NON":
        newState.NON = value;
      break;
      case "UNE":
        newState.UNE = value;
      break;
      case "PRE":
        newState.PRE = value;
      break;
      case "IMV":
        newState.IMV = value;
      break;
      case "ANO":
        newState.ANO = value;
      break;
      case "DIA":
        newState.DIA = value;
      break;
      case "ATT":
        newState.ATT = value;
      break;
      case "ABR":
        newState.ABR = value;
      break;
      case "CAR":
        newState.CAR = value;
      break;
      case "NVT":
        newState.NVT = value;
      break;
      case "AMF":
        newState.AMF = setCavities(newState.AMF, zone, value);
      break;
      case "GIF":
        newState.GIF = setCavities(newState.GIF, zone, value);
      break;
      case "COF":
        newState.COF = setCavities(newState.COF, zone, value);
      break;
      case "FIS":
        newState.FIS = setCavities(newState.FIS, zone, value);
      break;
      case "INL":
        newState.INL = setCavities(newState.INL, zone, value);
      break;
      case "ONL": 
        newState.ONL = setCavities(newState.ONL, zone, value);
      break;
      case "clear":
        newState = {
          id: number,
          AMF: {
            center: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          },
          GIF: {
            center: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          },
          COF: {
            center: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          },
          FIS: {
            center: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          },
          INL: {
            center: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          },
          ONL: {
            center: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          },
          MIS: 0,
          FMC: 0,
          POC:0,
          MPC:0,
          RCT:0,
          IPX:0,
          PON:0,
          ABU:0,
          RRX: 0,
          CFR: 0,
          MEB: 0,  
          POB: 0,
          O:0,
          M:0,
          D:0,
          V:0,
          L:0,
          SOU:0,
          NON:0,
          UNE:0,
          PRE:0,
          IMV:0,
          ANO:0,
          DIA:0,
          ATT:0,
          ABR:0,
          CAR:0,
          NVT:0,
          PRD:0,
          FLD:0,
          ACR:0
        };
        break;
    }
      onChange(number, newState);
  };
 // Todo SubMenu
 const todoPermukaanGigi = (place, value) => {
  return {
    "Mesial": () => handleStateChange("M", value),
    "Occlusal": () => handleStateChange("O", value),
    "Distal": () => handleStateChange("D", value),
    "Vestibular": () => handleStateChange("V", value),
    "Lingual": () => handleStateChange("L", value),
  };
};

  const todoKeadaanGigi = (place, value) => {
    return {
    "Gigi Normal": () => handleStateChange("SOU", value),
    "Gigi Tidak Ada": () => handleStateChange("NON", value),
    "Un-erupted": () => handleStateChange("UNE", value),
    "Partial erupted": () => handleStateChange("PRE", value),
    "Impacted Visible": () => handleStateChange("IMV", value),
    "Anomali": () => handleStateChange("ANO", value),
    "Diastema": () => handleStateChange("DIA", value),
    "Atrisi": () => handleStateChange("ATT", value),
    "Abrasi": () => handleStateChange("ABR", value),
    "Caries": () => handleStateChange("CAR", value),
    "Fracture": () => handleStateChange("CFR", value),
    "Gigi Non Vital": () => handleStateChange("NVT", value),
    "Sisa Akar": () => handleStateChange("RRX", value),
    "Gigi Hilang": () => handleStateChange("MIS", value),
    };
};

const todoBahanRestorasi = (place, value) => {
  return {
    "Amalgam": () => handleStateChange("AMF", value, place),
    "Silika": () => handleStateChange("GIF", value, place),
    "Composite": () => handleStateChange("COF", value, place),
    "Fissure Sealant": () => handleStateChange("FIS", value, place),
    "Inlay": () => handleStateChange("INL", value, place),
    "Onlay": () => handleStateChange("ONL", value, place),
  };
};

const todoRestorasi = (place, value) => {
  return {
    "Full Metal Crown": () => handleStateChange("FMC", value),
    "Porceline Crown": () => handleStateChange("POC", value),
    "Metal Porcelian Crown": () => handleStateChange("MPC", value),
    "Gold Porcelian Crown": () => handleStateChange("GMC", value),
    "Root Canal Treatment": () => handleStateChange("RCT", value),
    "Implant": () => handleStateChange("IPX", value),
    "Metal Bridge": () => handleStateChange("MEB", value),
    "Porcelain Bridge": () => handleStateChange("POB", value),
    "Pontic": () => handleStateChange("PON", value),
    "Abutment": () => handleStateChange("ABU", value),
  };
};

const todoProtesa = (place, value) => {
  return {
    "Partial Denture": () => handleStateChange("PRD", value),
    "Full Denture": () => handleStateChange("FLD", value),
    "Acrilic": () => handleStateChange("ACR", value),
  };
};
  // Main ContextMenu
  const menuConfig = (place) => {
    return {
      "Permukaan Gigi": todoPermukaanGigi(place, 1),
      "Keadaan Gigi": todoKeadaanGigi(place, 1),
      "Bahan Restorasi": todoBahanRestorasi(place, 1),
      "Restorasi": todoRestorasi(place, 1),
      "Protesa": todoProtesa(place, 1),
      "Clear All": () => handleStateChange("clear")
    };
  };

let getClassNamesByZone = (zone) => {
  if (toothState.AMF) {
    if (toothState.AMF[zone] === 1) {
      return "to-do";
    } else if (toothState.AMF[zone] === 2) {
      return "done";
    }
  }
  return "";
};

  // Tooth position
  const translate = `translate(${positionX},${positionY})`;

  return (
    <svg className="tooth">
      <g transform={translate}>
        <polygon
          points="5,5 15,5 15,15 5,15"
          onContextMenu={useCM(menuConfig("center"))}
          className={getClassNamesByZone("center")}
        />
        <polygon
          points={
            toothType === "front" ? "0,0 20,0 15,8 5,8" : "0,0 20,0 15,5 5,5"
          }
          onContextMenu={useCM(menuConfig("top"))}
          className={getClassNamesByZone("top")}
        />
        <polygon
          points={
            toothType === "front"
              ? "5,8 15,8 20,20 0,20"
              : "5,15 15,15 20,20 0,20"
          }
          onContextMenu={useCM(menuConfig("bottom"))}
          className={getClassNamesByZone("bottom")}
        />
        <polygon
          points={
            toothType === "front"
              ? "15,8 20,0 20,20 15,8"
              : "15,5 20,0 20,20 15,15"
          }
          onContextMenu={useCM(menuConfig("left"))}
          className={getClassNamesByZone("left")}
        />
        <polygon
          points={
            toothType === "front" ? "0,0 5,8 5,8 0,20" : "0,0 5,5 5,15 0,20"
          }
          onContextMenu={useCM(menuConfig("right"))}
          className={getClassNamesByZone("right")}
        />
        {drawToothActions()}
        <text
          x="6"
          y="5"
          stroke="black"
          fill="black"
          strokeWidth="0.2"
          className="tooth"
        >
        </text>
        <text
          x="6"
          y={labelPlacement === "top" ? "0" : "30"}
          stroke="black"
          fill="black"
          strokeWidth="0.2"
          className="tooth"
        >
          {number}
        </text>
      </g>
      {contextMenu}
    </svg>
  );

  function setCavities(prevState, zone, value) {
      const newCavities = { ...prevState };
      if (zone === "all") {
        return {
          center: value,
          top: value,
          bottom: value,
          left: value,
          right: value
        };
      } else {
        newCavities[zone] = value;
        return newCavities;
      }
    
  }

  function drawToothActions() {
    let otherFigures = [];
    if (toothState.MIS > 0) {
      otherFigures.push (
        <g stroke={toothState.MIS === 1 ? "red" : "blue"}>
          <line x1="0" y1="0" x2="20" y2="20" strokeWidth="2" />
          <line x1="0" y1="20" x2="20" y2="0" strokeWidth="2" />
        </g>
      );
    }

    if (toothState.CFR > 0) {
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

    if (toothState.RRX > 0) {
      otherFigures.posh (
        <g stroke="black" strokeWidth="2" fill="none" pointerEvents="none">
            <line x1="0" y1="0" x2="10" y2="20" />  {/* Left side of V */}
            <line x1="20" y1="0" x2="10" y2="20" /> {/* Right side of V */}
        </g>
      );
    }

    if (toothState.FMC > 0) {
      otherFigures.push (
        <g stroke="black" strokeWidth="2" pointerEvents={"none"}>
            <rect x="1" y="1" width="18" height="18" fill="none" />
        </g>
      );
    }

// Add bridge connections if this tooth has MEB or POB
if (toothState.MEB === 1 || toothState.POB === 1) {
  const prevToothNumber = number - 1;
  const nextToothNumber = number + 1;
  const prevToothHadBridge = allTeethState[prevToothNumber]?.MEB === 1 || 
                            allTeethState[prevToothNumber]?.POB === 1 ;
  const nextToothHadBridge = allTeethState[nextToothNumber]?.MEB === 1 || 
                            allTeethState[nextToothNumber]?.POB === 1;

  otherFigures.push(
    <g key="black" stroke="black" strokeWidth="1.5" pointerEvents="none">
      {/* Top horizontal connecting line */}
      
      {/* Add vertical line only if previous tooth didn't have bridge */}
      <line x1="10" y1="-5" x2="20" y2="-5" stroke="black" strokeWidth="1.5" />
      
      {!prevToothHadBridge && (
        <line x1="10" y1="-5" x2="10" y2="0" stroke="black" strokeWidth="1.5" />
      )}
      {/* {!nextToothHadBridge && (
      <line x1="10" y1="0" x2="60" y2="0" stroke="black" strokeWidth="1.5" />
    )} */}
    </g>
  );
}

    return otherFigures;
  }
}

export default Tooth;
