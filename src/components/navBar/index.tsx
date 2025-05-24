"use client";

import { IconChevronRight, IconHome, IconLibrary } from "@tabler/icons-react";
import { NavLink } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

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
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const items = data.map((item, index) => (
    <NavLink
      component={Link}
      {...item}
      key={index}
      active={item.href === currentPath}
      label={item.label}
      color="violet"
      rightSection={<IconChevronRight size={16} stroke={1.5} />}
      onClick={() => setCurrentPath(item.href)}
    />
  ));

  return <>{items}</>;
}
