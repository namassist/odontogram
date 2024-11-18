import { ItemParams } from "react-contexify";
import { ItemData, ItemProps } from "../types/contextmenu";
import React, { createContext, useContext, ReactNode } from "react";
import {
  DentalState,
  ResetStateAction,
  ToothContextType,
  ToothState,
  UpdateToothAction,
} from "../types/tooth";

const ToothContext = createContext<ToothContextType | undefined>(undefined);

function createInitialState(): DentalState {
  const state: DentalState = {};
  for (let i = 11; i <= 85; i++) {
    if (i % 10 === 9 || i % 10 === 0) continue;

    state[i] = {
      permukaanGigi: {
        M: 0,
        O: 0,
        D: 0,
        V: 0,
        L: 0,
      },
      keadaanGigi: {
        SOU: 1,
        NON: 0,
        UNE: 0,
        PRE: 0,
        IMV: 0,
        ANO: 0,
        DIA: 0,
        ATT: 0,
        ABR: 0,
        CFR: 0,
        NVT: 0,
        RRX: 0,
        MIS: 0,
        CAR: { center: 0, top: 0, bottom: 0, left: 0, right: 0 },
      },
      bahanRestorasi: {
        AMF: { center: 0, top: 0, bottom: 0, left: 0, right: 0 },
        GIF: { center: 0, top: 0, bottom: 0, left: 0, right: 0 },
        COF: { center: 0, top: 0, bottom: 0, left: 0, right: 0 },
        FIS: { center: 0, top: 0, bottom: 0, left: 0, right: 0 },
        INL: { center: 0, top: 0, bottom: 0, left: 0, right: 0 },
        ONL: { center: 0, top: 0, bottom: 0, left: 0, right: 0 },
      },
      restorasi: {
        FMC: 0,
        POC: 0,
        MPC: 0,
        GMC: 0,
        RCT: 0,
        IPX: 0,
        MEB: 0,
        POB: 0,
        PON: 0,
        ABU: 0,
      },
      protesa: {
        PRD: 0,
        FLD: 0,
        ACR: 0,
      },
    };
  }
  return state;
}

function odontogramReducer(
  state: DentalState,
  action: UpdateToothAction | ResetStateAction
): DentalState {
  switch (action.type) {
    case "RESET_STATE":
      return action.payload;
    case "UPDATE_TOOTH": {
      console.log(
        "Odontogram received update for tooth:",
        action.toothId,
        action.toothState
      );
      const newState = {
        ...state,
        [action.toothId]: action.toothState,
      };
      console.log(
        "New odontogram state after update:",
        newState[action.toothId]
      );
      return newState;
    }
    default:
      return state;
  }
}

interface OdontogramProviderProps {
  children: ReactNode;
}

export function ToothProvider({ children }: OdontogramProviderProps) {
  const [state, dispatch] = React.useReducer(
    odontogramReducer,
    createInitialState()
  );
  const [selectedOption, setSelectedOption] = React.useState("");

  const handleToothUpdate = React.useCallback(
    (id: number, toothState: ToothState) => {
      dispatch({
        type: "UPDATE_TOOTH",
        toothId: id,
        toothState,
      });
      console.log(`Odontogram state after update:`, state);
    },
    [state]
  );

  function handleZoneBasedProperty(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prevState: any,
    zone: string,
    value: number
  ) {
    return {
      ...prevState,
      [zone]: value,
    };
  }

  const handleStateChange = React.useCallback(
    (type: string, value: number, toothId: number, zone: string = "all") => {
      let newState = { ...state[toothId] };

      // Helper function untuk menentukan kategori
      const getCategoryFromType = (type: string): string => {
        const categories = {
          permukaanGigi: ["M", "O", "D", "V", "L"],
          keadaanGigi: [
            "SOU",
            "NON",
            "UNE",
            "PRE",
            "IMV",
            "ANO",
            "DIA",
            "ATT",
            "ABR",
            "CFR",
            "NVT",
            "RRX",
            "MIS",
            "CAR",
          ],
          restorasi: [
            "FMC",
            "POC",
            "MPC",
            "GMC",
            "RCT",
            "IPX",
            "MEB",
            "POB",
            "PON",
            "ABU",
          ],
          protesa: ["PRD", "FLD", "ACR"],
        };

        for (const [category, types] of Object.entries(categories)) {
          if (types.includes(type)) {
            return category;
          }
        }
        return "";
      };

      // reset semua nilai dalam kategori kecuali type yang aktif
      const resetCategoryValues = (category: string, activeType: string) => {
        switch (category) {
          case "permukaanGigi":
            Object.keys(newState.permukaanGigi).forEach((key) => {
              if (key !== activeType) {
                newState.permukaanGigi[key] = 0;
              }
            });
            break;
          case "keadaanGigi":
            Object.keys(newState.keadaanGigi).forEach((key) => {
              if (key !== activeType) {
                // Jika activeType adalah CAR, reset semua kecuali CAR
                if (activeType === "CAR") {
                  if (key !== "CAR") {
                    newState.keadaanGigi[key] = 0;
                  }
                }
                // Jika activeType bukan CAR, reset semua termasuk CAR (semua zones)
                else {
                  if (key === "CAR") {
                    newState.keadaanGigi[key] = {
                      center: 0,
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                    };
                  } else {
                    newState.keadaanGigi[key] = 0;
                  }
                }
              }
            });
            break;
          case "restorasi":
            Object.keys(newState.restorasi).forEach((key) => {
              if (key !== activeType) {
                newState.restorasi[key] = 0;
              }
            });
            break;
          case "protesa":
            Object.keys(newState.protesa).forEach((key) => {
              if (key !== activeType) {
                newState.protesa[key] = 0;
              }
            });
            break;
        }
      };

      // Dapatkan kategori dari type
      const category = getCategoryFromType(type);

      // Jika value > 0, reset nilai lain dalam kategori yang sama
      if (value > 0 && category) {
        resetCategoryValues(category, type);
      }

      switch (type) {
        case "M":
          newState.permukaanGigi.M = value;
          break;
        case "O":
          newState.permukaanGigi.O = value;
          break;
        case "D":
          newState.permukaanGigi.D = value;
          break;
        case "V":
          newState.permukaanGigi.V = value;
          break;
        case "L":
          newState.permukaanGigi.L = value;
          break;

        case "SOU":
          newState.keadaanGigi.SOU = value;
          break;
        case "NON":
          newState.keadaanGigi.NON = value;
          break;
        case "UNE":
          newState.keadaanGigi.UNE = value;
          break;
        case "PRE":
          newState.keadaanGigi.PRE = value;
          break;
        case "IMV":
          newState.keadaanGigi.IMV = value;
          break;
        case "ANO":
          newState.keadaanGigi.ANO = value;
          break;
        case "DIA":
          newState.keadaanGigi.DIA = value;
          break;
        case "ATT":
          newState.keadaanGigi.ATT = value;
          break;
        case "ABR":
          newState.keadaanGigi.ABR = value;
          break;
        case "CFR":
          newState.keadaanGigi.CFR = value;
          break;
        case "NVT":
          newState.keadaanGigi.NVT = value;
          break;
        case "RRX":
          newState.keadaanGigi.RRX = value;
          break;
        case "MIS":
          newState.keadaanGigi.MIS = value;
          break;
        case "CAR":
          newState.keadaanGigi.CAR = handleZoneBasedProperty(
            newState.keadaanGigi.CAR,
            zone,
            value
          );
          break;

        case "AMF":
          newState.bahanRestorasi.AMF = handleZoneBasedProperty(
            newState.bahanRestorasi.AMF,
            zone,
            value
          );
          break;
        case "GIF":
          newState.bahanRestorasi.GIF = handleZoneBasedProperty(
            newState.bahanRestorasi.GIF,
            zone,
            value
          );
          break;
        case "COF":
          newState.bahanRestorasi.COF = handleZoneBasedProperty(
            newState.bahanRestorasi.COF,
            zone,
            value
          );
          break;
        case "FIS":
          newState.bahanRestorasi.FIS = handleZoneBasedProperty(
            newState.bahanRestorasi.FIS,
            zone,
            value
          );
          break;
        case "INL":
          newState.bahanRestorasi.INL = handleZoneBasedProperty(
            newState.bahanRestorasi.INL,
            zone,
            value
          );
          break;
        case "ONL":
          newState.bahanRestorasi.ONL = handleZoneBasedProperty(
            newState.bahanRestorasi.ONL,
            zone,
            value
          );
          break;

        case "FMC":
          newState.restorasi.FMC = value;
          break;
        case "POC":
          newState.restorasi.POC = value;
          break;
        case "MPC":
          newState.restorasi.MPC = value;
          break;
        case "GMC":
          newState.restorasi.GMC = value;
          break;
        case "RCT":
          newState.restorasi.RCT = value;
          break;
        case "IPX":
          newState.restorasi.IPX = value;
          break;
        case "MEB":
          newState.restorasi.MEB = value;
          break;
        case "POB":
          newState.restorasi.POB = value;
          break;
        case "PON":
          newState.restorasi.PON = value;
          break;
        case "ABU":
          newState.restorasi.ABU = value;
          break;

        case "PRD":
          newState.protesa.PRD = value;
          break;
        case "FLD":
          newState.protesa.FLD = value;
          break;
        case "ACR":
          newState.protesa.ACR = value;
          break;

        case "CLEAR":
          newState = {
            permukaanGigi: {
              M: 0,
              O: 0,
              D: 0,
              V: 0,
              L: 0,
            },
            keadaanGigi: {
              SOU: 1,
              NON: 0,
              UNE: 0,
              PRE: 0,
              IMV: 0,
              ANO: 0,
              DIA: 0,
              ATT: 0,
              ABR: 0,
              CFR: 0,
              NVT: 0,
              RRX: 0,
              MIS: 0,
              CAR: { center: 0, top: 0, bottom: 0, left: 0, right: 0 },
            },
            bahanRestorasi: {
              AMF: { center: 0, top: 0, bottom: 0, left: 0, right: 0 },
              GIF: { center: 0, top: 0, bottom: 0, left: 0, right: 0 },
              COF: { center: 0, top: 0, bottom: 0, left: 0, right: 0 },
              FIS: { center: 0, top: 0, bottom: 0, left: 0, right: 0 },
              INL: { center: 0, top: 0, bottom: 0, left: 0, right: 0 },
              ONL: { center: 0, top: 0, bottom: 0, left: 0, right: 0 },
            },
            restorasi: {
              FMC: 0,
              POC: 0,
              MPC: 0,
              GMC: 0,
              RCT: 0,
              IPX: 0,
              MEB: 0,
              POB: 0,
              PON: 0,
              ABU: 0,
            },
            protesa: {
              PRD: 0,
              FLD: 0,
              ACR: 0,
            },
          };
          break;
        default:
          break;
      }

      handleToothUpdate(toothId, newState);
    },
    [state, handleToothUpdate]
  );

  const handleItemClick = React.useCallback(
    ({ id, props }: ItemParams<ItemProps, ItemData>) => {
      const currentTooth = props?.key as number;
      const zone = props?.zone as string;

      switch (id) {
        case "M":
          handleStateChange("M", 1, currentTooth);
          break;
        case "O":
          handleStateChange("O", 1, currentTooth);
          break;
        case "D":
          handleStateChange("D", 1, currentTooth);
          break;
        case "V":
          handleStateChange("V", 1, currentTooth);
          break;
        case "L":
          handleStateChange("L", 1, currentTooth);
          break;

        case "SOU":
          handleStateChange("SOU", 1, currentTooth);
          break;
        case "NON":
          handleStateChange("NON", 1, currentTooth);
          break;
        case "UNE":
          handleStateChange("UNE", 1, currentTooth);
          break;
        case "PRE":
          handleStateChange("PRE", 1, currentTooth);
          break;
        case "IMV":
          handleStateChange("IMV", 1, currentTooth);
          break;
        case "ANO":
          handleStateChange("ANO", 1, currentTooth);
          break;
        case "DIA":
          handleStateChange("DIA", 1, currentTooth);
          break;
        case "ATT":
          handleStateChange("ATT", 1, currentTooth);
          break;
        case "ABR":
          handleStateChange("ABR", 1, currentTooth);
          break;
        case "CFR":
          handleStateChange("CFR", 1, currentTooth);
          break;
        case "NVT":
          handleStateChange("NVT", 1, currentTooth);
          break;
        case "RRX":
          handleStateChange("RRX", 1, currentTooth);
          break;
        case "MIS":
          handleStateChange("MIS", 1, currentTooth);
          break;
        case "CAR":
          handleStateChange("CAR", 1, currentTooth, zone);
          break;

        case "AMF":
          handleStateChange("AMF", 1, currentTooth, zone);
          break;
        case "GIF":
          handleStateChange("GIF", 1, currentTooth, zone);
          break;
        case "COF":
          handleStateChange("COF", 1, currentTooth, zone);
          break;
        case "FIS":
          handleStateChange("FIS", 1, currentTooth, zone);
          break;
        case "INL":
          handleStateChange("INL", 1, currentTooth, zone);
          break;
        case "ONL":
          handleStateChange("ONL", 1, currentTooth, zone);
          break;

        case "FMC":
          handleStateChange("FMC", 1, currentTooth);
          break;
        case "POC":
          handleStateChange("POC", 1, currentTooth);
          break;
        case "MPC":
          handleStateChange("MPC", 1, currentTooth);
          break;
        case "GMC":
          handleStateChange("GMC", 1, currentTooth);
          break;
        case "RCT":
          handleStateChange("RCT", 1, currentTooth);
          break;
        case "IPX":
          handleStateChange("IPX", 1, currentTooth);
          break;
        case "MEB":
          handleStateChange("MEB", 1, currentTooth);
          break;
        case "POB":
          handleStateChange("POB", 1, currentTooth);
          break;
        case "PON":
          handleStateChange("PON", 1, currentTooth);
          break;
        case "ABU":
          handleStateChange("ABU", 1, currentTooth);
          break;

        case "PRD":
          handleStateChange("PRD", 1, currentTooth);
          break;
        case "FLD":
          handleStateChange("FLD", 1, currentTooth);
          break;
        case "ACR":
          handleStateChange("ACR", 1, currentTooth);
          break;

        case "clear":
          handleStateChange("CLEAR", 0, currentTooth);
          break;
        default:
          console.log("default");
          break;
      }
    },
    [handleStateChange]
  );

  const resetState = React.useCallback(() => {
    const newState = createInitialState();
    dispatch({ type: "RESET_STATE", payload: newState });
  }, []);

  React.useEffect(() => {
    // Reset state saat selectedOption berubah
    resetState();
  }, [selectedOption, resetState]);

  return (
    <ToothContext.Provider
      value={{
        state,
        dispatch,
        handleToothUpdate,
        handleItemClick,
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </ToothContext.Provider>
  );
}

export function useTooth() {
  const context = useContext(ToothContext);
  if (context === undefined) {
    throw new Error("useTooth must be used within a ToothProvider");
  }
  return context;
}
