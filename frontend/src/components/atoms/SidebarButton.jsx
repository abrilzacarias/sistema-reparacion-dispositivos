// components/atoms/SidebarButton.jsx
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "@/hooks/useAppContext";

export const SidebarButton = ({ icon: Icon, label, to, color = "text-white", bg = "", activeColor = "bg-white/10", onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sidebarExpanded } = useAppContext();
  const mobileOpen = typeof window !== 'undefined' && window.innerWidth < 768 && label;

  const isActive = location.pathname === to;

  return (
    <button
      onClick={() => {
        navigate(to);
        if (onNavigate) onNavigate();
      }}
      className={cn(
        "flex items-center gap-2 px-4 py-3 rounded-lg w-full transition-all",
        isActive ? activeColor : "hover:bg-white/10",
        bg,
        (sidebarExpanded || mobileOpen) ? "justify-start" : "justify-center"
      )}
    >
      <Icon className={cn("w-5 h-5", color)} />
      <span className={cn("text-sm", color)}>{label}</span>
    </button>
  );
};
