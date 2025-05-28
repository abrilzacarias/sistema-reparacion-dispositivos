import React from "react"
import { Button } from "../ui/button"
import { Eye, UserPlus } from "lucide-react"

const TableResultsHeader = ({ table, totalUsers, setValue, value }) => {
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
    </>
  )
}

export default TableResultsHeader
