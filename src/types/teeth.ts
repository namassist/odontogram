export interface TeethProps {
  labelPlacement: string;
  toothType: string;
  start: number;
  end: number;
  x: number;
  y: number;
}

export interface HandleStateChange {
  (type: string, value: number, zone?: Zone | null): void;
}

export type Zone = "center" | "top" | "bottom" | "left" | "right";
