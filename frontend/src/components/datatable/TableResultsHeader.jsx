import React from "react"
import { Button } from "../ui/button"
import { Eye, RotateCcw, UserPlus } from "lucide-react"

const TableResultsHeader = ({ table, totalUsers, setValue, value }) => {
  const resetTable = () => {
    table.resetColumnFilters()
    setValue("")
  }
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="h-8 text-primary hover:bg-primary hover:text-secondary dark:hover:bg-secondary dark:text-white bg-transparent shadow-none border-primary"
      >
        <Eye />
        {table.getRowCount()}
        <span className="hidden lg:block">Resultados</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-8 text-primary hover:bg-primary hover:text-secondary dark:hover:bg-secondary dark:text-white border-primary shadow-none lg:flex"
      >
        <UserPlus />
        {totalUsers}
      </Button>

      {value  && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-none bg-transparent shadow-none text-aqua-700 lg:flex border-aqua-700/60"
          onClick={() => resetTable()}
        >
          <RotateCcw />
          <span className="hidden lg:block">Reset</span>
        </Button>
      )}
    </>
  )
}

export default TableResultsHeader
