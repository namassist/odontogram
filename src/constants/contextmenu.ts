import { ContextMenuItem } from "../types/contextmenu";

export const contextMenu: ContextMenuItem[] = [
  {
    id: 1,
    label: "Permukaan Gigi",
    subMenu: [
      { label: "Mesial", symbol: "M" },
      { label: "Occlusal", symbol: "O" },
      { label: "Distal", symbol: "D" },
      { label: "Vestibular", symbol: "V" },
      { label: "Lingual", symbol: "L" },
    ],
  },
  {
    id: 2,
    label: "Keadaan Gigi",
    subMenu: [
      { label: "Gigi Normal", symbol: "SOU" },
      { label: "Gigi Tidak Ada", symbol: "NON" },
      { label: "Un-erupted", symbol: "UNE" },
      { label: "Partial erupted", symbol: "PRE" },
      { label: "Impacted Visible", symbol: "IMV" },
      { label: "Anomali", symbol: "ANO" },
      { label: "Diastema", symbol: "DIA" },
      { label: "Atrisi", symbol: "ATT" },
      { label: "Abrasi", symbol: "ABR" },
      { label: "Caries", symbol: "CAR" },
      { label: "Fracture", symbol: "CFR" },
      { label: "Gigi Non Vital", symbol: "NVT" },
      { label: "Sisa Akar", symbol: "RRX" },
      { label: "Gigi Hilang", symbol: "MIS" },
    ],
  },
  {
    id: 3,
    label: "Bahan Restorasi",
    subMenu: [
      { label: "Amalgam", symbol: "AMF" },
      { label: "Silika", symbol: "GIF" },
      { label: "Composite", symbol: "COF" },
      { label: "Fissure Sealant", symbol: "FIS" },
      { label: "Inlay", symbol: "INL" },
      { label: "Onlay", symbol: "ONL" },
    ],
  },
  {
    id: 4,
    label: "Restorasi",
    subMenu: [
      { label: "Full Metal Crown", symbol: "FMC" },
      { label: "Porcelain Crown", symbol: "POC" },
      { label: "Metal Porcelain Crown", symbol: "MPC" },
      { label: "Gold Porcelain Crown", symbol: "GMC" },
      { label: "Root Canal Treatment", symbol: "RCT" },
      { label: "Implant", symbol: "IPX" },
      { label: "Metal Bridge", symbol: "MEB" },
      { label: "Porcelain Bridge", symbol: "POB" },
      { label: "Pontic", symbol: "PON" },
      { label: "Abutment", symbol: "ABU" },
    ],
  },
  {
    id: 5,
    label: "Protesa",
    subMenu: [
      { label: "Partial Denture", symbol: "PRD" },
      { label: "Full Denture", symbol: "FLD" },
      { label: "Acrylic", symbol: "ACR" },
    ],
  },
];
