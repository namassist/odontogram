export interface ItemProps {
  key: number;
  zone: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ItemData = any;

export interface ContextSubMenuItem {
  label: string;
  symbol: string;
}

export interface ContextMenuItem {
  id: number;
  label: string;
  subMenu: ContextSubMenuItem[];
}
