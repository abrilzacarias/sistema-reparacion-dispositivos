import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import useFetchAll from "@/hooks/useFetchAll"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"

const FormSelectSearch = ({
  label,
  endpoint,
  value,
  setValue,
  displayKey = "name",
  valueKey = "id",
  placeholder = "Seleccione una opción...",
}) => {
  const { data, loading } = useFetchAll(endpoint)
  const [open, setOpen] = useState(false)

  const getValue = (item) => (typeof valueKey === "function" ? valueKey(item) : item[valueKey]);

  const selectedItem = data?.find((item) => String(getValue(item)) === String(value));

  return (
    <div className="flex gap-2 capitalize flex-col justify-center m-auto">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className="flex items-center outline-noney justify-between mx-auto"
          asChild
        >
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full">
            <p className="w-auto text-md">
            {!selectedItem 
              ? placeholder 
              : typeof displayKey === "function" 
                ? displayKey(selectedItem) 
                : selectedItem[displayKey]}
          </p>

            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder={`Buscar ${label.toLowerCase()}...`} />
            <CommandList>
              {!loading && data?.length === 0 && (
                <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              )}
              <CommandGroup>
                {loading ? (
                  [...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-4 w-full rounded-md" />
                    </div>
                  ))
                ) : (
                  data?.map((item) => (
                    <CommandItem
                key={getValue(item)}
                value={typeof displayKey === "function" ? displayKey(item) : item[displayKey]}
                onSelect={(e) => {
                  if (typeof setValue === 'function') {
                    setValue(getValue(item));
                  } else {
                    console.error('setValue function is not provided to FormSelectSearch');
                  }
                  setTimeout(() => setOpen(false), 100);
                }}
              >
                {typeof displayKey === "function" ? displayKey(item) : item[displayKey]}
                <Check
                  className={cn(
                    "ml-auto",
                    value === getValue(item)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
                  ))
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default FormSelectSearch