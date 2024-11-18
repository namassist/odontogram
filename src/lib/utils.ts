/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ToothState } from "../types/tooth";

type ToothCategory = keyof Pick<ToothState, "protesa" | "restorasi">;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getInverseArray(start: number, end: number): number[] {
  const list: number[] = [];

  for (let i = start; i >= end; i--) {
    list.push(i);
  }

  return list;
}

export function getArray(start: number, end: number): number[] {
  if (start > end) return getInverseArray(start, end);

  const list: number[] = [];
  for (let i = start; i <= end; i++) {
    list.push(i);
  }

  return list;
}

const hasPositiveValues = (obj: Record<string, any>): boolean => {
  return Object.values(obj).some((value) => {
    if (typeof value === "object" && value !== null) {
      return hasPositiveValues(value as Record<string, unknown>);
    }
    return typeof value === "number" && value > 0;
  });
};

export const formatToothData = (
  toothState: ToothState,
  toothId: number,
  isChildTooth = false
): string => {
  if (!toothState) return "";

  if (
    isChildTooth &&
    toothState.keadaanGigi.SOU === 1 &&
    !hasPositiveValues(toothState.permukaanGigi) &&
    !hasPositiveValues(toothState.bahanRestorasi) &&
    !hasPositiveValues(toothState.restorasi) &&
    !hasPositiveValues(toothState.protesa)
  ) {
    return "";
  }

  const categories = [`${toothId}:`];

  // Surface conditions
  const surfaces = Object.entries(toothState.permukaanGigi)
    .filter(([_, value]) => value > 0)
    .map(([key]) => key);
  if (surfaces.length > 0) {
    categories.push(surfaces.join("-").toUpperCase());
  }

  // Tooth conditions
  if (!isChildTooth && toothState.keadaanGigi.SOU > 0) {
    categories.push("sou");
  }

  // Add other tooth conditions except SOU and CAR
  Object.entries(toothState.keadaanGigi)
    .filter(
      ([key, value]) =>
        key !== "SOU" && key !== "CAR" && typeof value === "number" && value > 0
    )
    .forEach(([key]) => categories.push(key.toLowerCase()));

  // Add CAR if present
  if (hasPositiveValues(toothState.keadaanGigi.CAR)) {
    categories.push("car");
  }

  // Add prosthetics and restorations
  const categoryKeys: ToothCategory[] = ["protesa", "restorasi"];
  categoryKeys.forEach((category) => {
    Object.entries(toothState[category])
      .filter(([_, value]) => value > 0)
      .forEach(([key]) => categories.push(key.toLowerCase()));
  });

  // Add restoration materials
  Object.entries(toothState.bahanRestorasi)
    .filter(([_, positions]) => hasPositiveValues(positions))
    .forEach(([material]) => categories.push(material.toLowerCase()));

  return categories.join("-").replace(/:\s*-(\w+)/, ": $1");
};

export const dataURLtoBlob = (dataUrl: string) => {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};
