import { SidebarButton } from "../atoms/SidebarButton";
import { useAppContext } from "@/hooks/useAppContext";

const SidebarMenuItem = ({ icon: Icon, label, path, color, bg, onNavigate }) => {
  // Forzar tamaño y strokeWidth para todos los íconos
  const iconSize = "h-5 w-5";
  const strokeWidth = 2;

  return (
    <SidebarButton
      icon={() => <Icon className={iconSize} strokeWidth={strokeWidth} />}
      label={label}
      to={path}
      color={color}
      bg={bg}
      onNavigate={onNavigate}
    />
  );
};

export default SidebarMenuItem;
  