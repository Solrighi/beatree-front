"use client";

import { IconChevronRight, IconHome, IconLibrary } from "@tabler/icons-react";
import { NavLink } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

const data = [
  {
    label: "Inicio",
    leftSection: <IconHome size={16} stroke={1.5} />,
    href: "/",
  },
  {
    label: "Biblioteca",
    leftSection: <IconLibrary size={16} stroke={1.5} />,
    href: "/library",
  },
];

export function Navbar() {
  const currentPath = usePathname();

  const items = data.map((item, index) => (
    <NavLink
      component={Link}
      {...item}
      key={index}
      active={item.href === currentPath}
      label={item.label}
      color="violet"
      rightSection={<IconChevronRight size={16} stroke={1.5} />}
    />
  ));

  return <>{items}</>;
}
