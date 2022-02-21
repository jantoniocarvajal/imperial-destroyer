import React from "react";
import { NavLink } from "react-router-dom";
import "./navItem.scss";

interface Props {
  href: string;
  icon: string;
  title: string;
}
export const NavItem = ({ icon, href, title }: Props) => {
  return (
    <div className="navItem">
      <i className={`navIcon fa ${icon}`}></i>
      <NavLink className="navLabel" to={href}>
        {title}
      </NavLink>
    </div>
  );
};
