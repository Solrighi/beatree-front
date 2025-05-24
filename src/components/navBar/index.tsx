import { useState } from "react";
import { IconChevronRight, IconHome, IconLibrary } from "@tabler/icons-react";
import { NavLink, NavLinkProps } from "@mantine/core";

const data: NavLinkProps[] = [
  {
    label: "Inicio",
    leftSection: <IconHome size={16} stroke={1.5} />,
  },
  {
    label: "Biblioteca",
    leftSection: <IconLibrary size={16} stroke={1.5} />,
  },
];

export function Navbar() {
  const [active, setActive] = useState(0);

  const items = data.map((item, index) => (
    <NavLink
      {...item}
      href="#required-for-focus"
      key={index}
      active={index === active}
      label={item.label}
      onClick={() => setActive(index)}
      color="violet"
      rightSection={<IconChevronRight size={16} stroke={1.5} />}
    />
  ));

  return <>{items}</>;
}
