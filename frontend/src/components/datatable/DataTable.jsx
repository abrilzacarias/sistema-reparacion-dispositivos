import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useEffect, useState } from "react"
import LoaderRefetch from "./LoaderRefetch"
import { motion } from "framer-motion"
import DataTableHeader from "./DataTableHeader"
import { DataTablePagination } from "./DataTablePagination"

export const DataTable = ({
  data,
  columns,
  searchTarget,
  refetch,
  totalUsers,
  fetchNextPage,
  isLoading,
  isError,
  hasNextPage,
  isFetching,
  placeholder,
  tapValue,
}) => {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5, //por defecto
  })

  useEffect(() => {
    refetch()
  }, [tapValue])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  })

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="rounded-lg transition-all dark:shadow-inner relative"
    >
      <div className="w-full max-w-[99%] bg-secondary dark:bg-background rounded-md px-0 py-2 overflow-y-auto lg:max-w-full mx-auto">
        <div className="space-y-4">
          {searchTarget && (
            <div className="flex items-center justify-between ">
              <DataTableHeader
                placeholder={placeholder}
                searchTarget={searchTarget}
                table={table}
                totalUsers={totalUsers}
              />
            </div>
          )}
        </div>

        <div className="rounded-md  min-h-[290px] text-center bg-white dark:bg-inherit">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup?.id}>
                  {headerGroup?.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-foreground text-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows?.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns?.length}
                    className="h-24 text-center"
                  >
                    Sin resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {fetchNextPage && (
          <div className="mt-2">
            <DataTablePagination
              isFetching={isFetching}
              hasNextPage={hasNextPage}
              isLoading={isLoading}
              isError={isError}
              table={table}
              fetchNextPage={fetchNextPage}
            />
          </div>
        )}
      </div>
      <LoaderRefetch label="Cargando"  loading={isLoading} />
    </motion.div>
  )
}
