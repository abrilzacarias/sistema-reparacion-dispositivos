// components/molecules/SidebarMenuItem.jsx
import { SidebarButton } from "../atoms/SidebarButton";

const SidebarMenuItem = ({ icon, label, path, color, bg }) => {
  return (
    <SidebarButton
      icon={icon}
      label={label}
      to={path}
      color={color}
      bg={bg}
    />
  );
};

export default SidebarMenuItem;