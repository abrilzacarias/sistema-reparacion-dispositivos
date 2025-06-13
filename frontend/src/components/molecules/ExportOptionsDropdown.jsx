import { Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const ExportOptionsDropdown = ({
  pdfComponent,
  buttonProps = {
    variant: "outline",
    size: "icon",
    label: "",
    className: "",
    icon: <Download className="h-4 w-4" />,
  },
  dropdownLabel = "Exportar datos",
  align = "end",
}) => {
  if (!pdfComponent) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={buttonProps.variant}
          size={buttonProps.size}
          className={buttonProps.className}
        >
          {buttonProps.icon ?? <Download className="h-4 w-4" />}
          {buttonProps.label && <span>{buttonProps.label}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <DropdownMenuLabel>{dropdownLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>{pdfComponent}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportOptionsDropdown;
