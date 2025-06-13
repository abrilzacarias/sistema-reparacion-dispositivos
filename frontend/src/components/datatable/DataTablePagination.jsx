import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const DataTablePagination = ({
  hasNextPage,
  table,
  isError,
  fetchNextPage,
  isLoading,
  isFetching,
}) => {
  return (
    <div className="flex flex-col  lg:flex-row items-center justify-between px-2 py-2">
      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 w-full">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium whitespace-nowrap">
            Filas
            <span className="hidden lg:inline ml-1"> por página</span>
          </p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5,7, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center">
          {isFetching && (
            <Button variant="ghost" className="text-aqua-700" disabled>
              Cargando..
            </Button>
          )}

          {!isLoading && !isError && hasNextPage === true && !isFetching && (
            <Button
              variant="custom"
              className="border-none text-aqua-700 w-full sm:w-auto truncate overflow-hidden text-ellipsis whitespace-nowrap"
              onClick={() => fetchNextPage()}
            >
              Cargar más resultados
            </Button>
          )}

          {!isLoading && !isFetching && !isError && hasNextPage === false && (
            <p className="text-aqua-700 text-center truncate overflow-hidden text-ellipsis whitespace-nowrap">
              No hay más resultados
            </p>
          )}

          {isError && (
            <p className="text-red-500 truncate overflow-hidden text-ellipsis whitespace-nowrap">
              No hay más resultados
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center mt-2 lg:mt-0">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center text-sm font-medium whitespace-nowrap">
            <span className="hidden lg:inline mr-2">Página</span>
            {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            className="bg-primary text-primary-foreground h-8 w-8 p-0 hover:bg-primary/80 hover:text-primary-foreground"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="bg-primary text-primary-foreground h-8 w-8 p-0 hover:bg-primary/80 hover:text-primary-foreground"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="bg-primary text-primary-foreground h-8 w-8 p-0 hover:bg-primary/80 hover:text-primary-foreground"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="bg-primary text-primary-foreground h-8 w-8 p-0 hover:bg-primary/80 hover:text-primary-foreground"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
