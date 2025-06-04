import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Dialog } from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { Check, ChevronsUpDown, Loader2, User2Icon, Users } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

const SearchResultsList = ({
  data = [],
  setPersonaId,
  selectedPersona,
  setSelectedPersona,
  isLoading,
}) => {
  const [open, setOpen] = useState(false)
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!isLoading && data.length > 0 && searchQuery.trim() !== "") {
      setOpen(true)
    }
  }, [isLoading, data])

  const getPersonaFullName = useMemo(
    () => (persona) => {
      if (!persona) return ""

      if (persona?.nombre) {
        return `${persona.nombre || ""} ${persona.apellido || ""} - ${
          persona?.cuit || ""
        }`.trim()
      }
    },
    []
  )

  const getResults = useMemo(
    () => () => {
      if (!data || data.length === 0) return "Sin resultados"
      if (data.length === 1) return "Una coincidencia"
      return `${data.length} coincidencias`
    },
    [data]
  )

  // Filtrado de datos basado en la búsqueda
  const filteredData = useMemo(() => {
    if (!searchQuery) return data
    return data.filter((item) =>
      getPersonaFullName(item).toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [data, searchQuery, getPersonaFullName])

  const handleSelect = (item) => {
    setSelectedPersona(item)
    setTimeout(() => setOpen(false), 100)

    setPersonaId(item.idPersona)
  }

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <div className="relative">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-label="Select a Persona"
              className={cn(
                "w-full justify-between transition-all duration-200",
                selectedPersona && "bg-secondary/20"
              )}
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 bg-secondary/30">
                  {selectedPersona ? (
                    <span className="text-xs font-medium uppercase flex items-center justify-center w-full">
                      {selectedPersona?.nombre?.[0] ||
                        selectedPersona?.persona?.[0] ||
                        "U"}
                    </span>
                  ) : (
                    <User2Icon className="h-4 w-4" />
                  )}
                  <AvatarFallback className="sr-only">U</AvatarFallback>
                </Avatar>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={selectedPersona?.idPersona || "default"}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="truncate max-w-[420px] capitalize"
                  >
                    {isLoading
                      ? "Cargando usuarios..."
                      : getPersonaFullName(selectedPersona) || getResults()}
                  </motion.span>
                </AnimatePresence>
              </div>

              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ChevronsUpDown className="h-4 w-4 opacity-50 transition-transform duration-200" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[350px]" align="center">
            <Command className="rounded-lg border">
              <CommandInput
                placeholder="Filtrar usuarios..."
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <CommandList className="max-h-[300px] overflow-auto">
                <CommandEmpty>
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <Users className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No se encontraron usuarios
                    </p>
                  </div>
                </CommandEmpty>

                {filteredData.length > 0 && (
                  <CommandGroup heading={getResults()}>
                    <AnimatePresence>
                      {filteredData.map((item, index) => (
                        <motion.div
                          key={item.idPersona}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                        >
                          <CommandItem
                            onSelect={() => handleSelect(item)}
                            className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-secondary/20 transition-colors"
                          >
                            <Avatar className="h-6 w-6 bg-primary/10">
                              <span className="text-xs font-medium capitalize w-full flex items-center justify-center">
                                {item?.full_name?.[0] || "U"}
                              </span>
                              <AvatarFallback className="sr-only">
                                U
                              </AvatarFallback>
                            </Avatar>
                            <span className="flex-1 truncate capitalize">
                              {getPersonaFullName(item)}
                            </span>

                            {selectedPersona?.idPersona === item.idPersona && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </CommandItem>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </Dialog>
  )
}

export default SearchResultsList
