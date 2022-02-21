import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { NavItem } from "./NavItem";

const items = [
  {
    href: "/",
    icon: "fa-globe",
    title: "Planets",
  },
  {
    href: "/starships",
    icon: "fa-fighter-jet",
    title: "Starships",
  },
  {
    href: "/pleoples",
    icon: "fa-users",
    title: "Peoples",
  },
  {
    href: "/vehicles",
    icon: "fa-truck",
    title: "Vehicles",
  },
];

interface Props {
  openMobile: boolean;
  onMobileClose: () => void;
}

export const NavBar = ({ onMobileClose, openMobile = false }: Props) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname, onMobileClose, openMobile]);

  return (
    <nav>
      {items.map((item, index) => {
        return <NavItem key={index} icon={item.icon} href={item.href} title={item.title} />;
      })}
    </nav>
  );
};
