import { SidebarButton } from "../atoms/SidebarButton";
import { cloneElement } from "react";

const SidebarMenuItem = ({ icon, label, path, color, bg }) => {
  const iconWithProps = cloneElement(icon, {
    className: "w-5 h-5 " + (icon.props.className || ""),
  });

  return (
    <SidebarButton
      icon={() => iconWithProps}
      label={label}
      to={path}
      color={color}
      bg={bg}
    />
  );
};

export default SidebarMenuItem;
  