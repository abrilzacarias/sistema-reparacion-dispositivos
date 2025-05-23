// components/atoms/SidebarButton.jsx
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

export const SidebarButton = ({ icon: Icon, label, to, color = "text-white", bg = "", activeColor = "bg-white/10" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.pathname === to;

  return (
    <button
      onClick={() => navigate(to)}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg w-full transition-all",
        isActive ? activeColor : "hover:bg-white/10",
        bg
      )}
    >
      <Icon className={cn("w-5 h-5", color)} />
      <span className={cn("text-sm", color)}>{label}</span>
    </button>
  );
};
