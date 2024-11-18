import { Menu, Submenu, Item, Separator } from "react-contexify";
import { ContextMenuItem, ContextSubMenuItem } from "@/types/contextmenu";
import { contextMenu } from "@/constants/contextmenu";
import { useTooth } from "@/context/tooth-context";

export default function ContextMenu() {
  const { handleItemClick } = useTooth();

  return (
    <Menu id={import.meta.env.VITE_APP_MENU_ID}>
      {contextMenu.map((menu: ContextMenuItem) => (
        <Submenu label={menu.label} key={menu.id}>
          {menu.subMenu.map((subMenu: ContextSubMenuItem) => (
            <Item
              id={subMenu.symbol}
              key={subMenu.label}
              onClick={handleItemClick}
            >
              {subMenu.label}
            </Item>
          ))}
        </Submenu>
      ))}
      <Separator />
      <Item id="clear" onClick={handleItemClick}>
        Clear
      </Item>
    </Menu>
  );
}
