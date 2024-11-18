import { ItemParams } from "react-contexify";
import { ItemData, ItemProps } from "./contextmenu";

interface PermukaanGigi {
  M: number;
  O: number;
  D: number;
  V: number;
  L: number;
  [key: string]: number;
}

interface Zone {
  center: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  [key: string]: number;
}

interface KeadaanGigi {
  SOU: number;
  NON: number;
  UNE: number;
  PRE: number;
  IMV: number;
  ANO: number;
  DIA: number;
  ATT: number;
  ABR: number;
  CFR: number;
  NVT: number;
  RRX: number;
  MIS: number;
  CAR: Zone;
  [key: string]: number | { [key: string]: number };
}

interface BahanRestorasi {
  AMF: Zone;
  GIF: Zone;
  COF: Zone;
  FIS: Zone;
  INL: Zone;
  ONL: Zone;
  [key: string]: { [key: string]: number };
}

interface Restorasi {
  FMC: number;
  POC: number;
  MPC: number;
  GMC: number;
  RCT: number;
  IPX: number;
  MEB: number;
  POB: number;
  PON: number;
  ABU: number;
  [key: string]: number;
}

interface Protesa {
  PRD: number;
  FLD: number;
  ACR: number;
  [key: string]: number;
}

export interface ToothState {
  permukaanGigi: PermukaanGigi;
  keadaanGigi: KeadaanGigi;
  bahanRestorasi: BahanRestorasi;
  restorasi: Restorasi;
  protesa: Protesa;
}

export interface DentalState {
  [key: number]: ToothState;
}

export interface ToothProps {
  labelPlacement: string;
  toothType: string;
  number: number;
  positionX: number;
  positionY: number;
  toothState: ToothState;
}

export interface UpdateToothAction {
  type: "UPDATE_TOOTH";
  toothId: number;
  toothState: ToothState;
}

export interface ResetStateAction {
  type: "RESET_STATE";
  payload: DentalState;
}

export interface ToothContextType {
  state: DentalState;
  dispatch: React.Dispatch<UpdateToothAction>;
  handleToothUpdate: (id: number, toothState: ToothState) => void;
  handleItemClick: ({ id }: ItemParams<ItemProps, ItemData>) => void;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

export interface ToothRowProps {
  leftTooth: number;
  rightTooth: number;
  state: Record<number, ToothState>;
  selectedOption: string;
}

export interface ToothTableProps {
  position: "top" | "bottom";
  state: Record<number, ToothState>;
  selectedOption: string;
}

export interface UploadOdontogramData {
  metadata: string;
  image: Blob;
}
