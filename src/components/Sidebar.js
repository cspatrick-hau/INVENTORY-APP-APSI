import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  ShoppingCart,
  Package,
  ClipboardList,
  CheckSquare,
  Users,
} from "lucide-react";

const baseLinkStyle = {
  display: "flex",
  alignItems: "center",
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  color: "#ffffff",
  textDecoration: "none",
  border: "none",
  outline: "none",
  transition: "background-color 0.2s ease",
};

const getLinkStyle = (isActive, isHovered) => {
  if (isActive) {
    return { ...baseLinkStyle, backgroundColor: "#262C4B", fontWeight: 600 };
  }
  if (isHovered) {
    return { ...baseLinkStyle, backgroundColor: "#262C4B" };
  }
  return baseLinkStyle;
};

function NavItem({ to, icon, label }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <NavLink
      to={to}
      style={({ isActive }) => getLinkStyle(isActive, isHovered)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {React.cloneElement(icon, { style: { marginRight: "8px" } })}
      {label}
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <NavItem to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" />
      <NavItem
        to="/retailers"
        icon={<Briefcase size={18} />}
        label="Retailer/Supplier Records"
      />
      <NavItem
        to="/purchasing"
        icon={<ShoppingCart size={18} />}
        label="Purchasing"
      />
      <NavItem
        to="/warehouse"
        icon={<Package size={18} />}
        label="Warehouse Operations"
      />
      <NavItem
        to="/itemassign"
        icon={<ClipboardList size={18} />}
        label="Item Assignment"
      />
      <NavItem
        to="/approvals"
        icon={<CheckSquare size={18} />}
        label="Approvals"
      />
      <NavItem
        to="/retailerandbilling"
        icon={<Users size={18} />}
        label="Retailer & Billing"
      />
    </nav>
  );
}
