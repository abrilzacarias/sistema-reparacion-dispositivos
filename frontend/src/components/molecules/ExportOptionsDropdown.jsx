import { Download } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

// agregar csv si es necesario
const ExportOptionsDropdown = ({
  excelComponent,
  pdfComponent,
  formats = { excel: true, pdf: true },
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
  const showExcel = formats.excel && excelComponent
  const showPDF = formats.pdf && pdfComponent

  if (!showExcel && !showPDF) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={buttonProps.variant} size={buttonProps.size} className={buttonProps.className}>
          <Download className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <DropdownMenuLabel>{dropdownLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {showExcel && <DropdownMenuItem onSelect={(e) => e.preventDefault()}>{excelComponent}</DropdownMenuItem>}

        {showExcel && showPDF && <DropdownMenuSeparator />}

        {showPDF && <DropdownMenuItem>{pdfComponent}</DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ExportOptionsDropdown
