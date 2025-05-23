import { Input } from "@/components/ui/input"
import TableResultsHeader from "./TableResultsHeader"

const DataTableHeader = ({
  table,
  searchTarget,
  totalUsers,
  placeholder = "Filtrar registros...",
}) => {
  return (
    <div className="flex  justify-center items-center gap-1 lg:gap-3 mb-3">
      <Input
        placeholder={placeholder}
        value={table.getColumn(searchTarget)?.getFilterValue() ?? ""}
        onChange={(event) =>
          table.getColumn(searchTarget)?.setFilterValue(event.target.value)
        }
        className="h-8 w-full max-w-[150px] lg:max-w-full rounded-sm bg-white/80  dark:bg-transparent lg:w-auto shadow-none "
      />

      <TableResultsHeader table={table} totalUsers={totalUsers} />
    </div>
  )
}

export default DataTableHeader
