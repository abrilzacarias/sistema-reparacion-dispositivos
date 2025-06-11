import ErrorMessage from "@/components/atoms/ErrorMessage"
import { cn } from "@/lib/utils"
import InputSearchApi from "../molecules/InputSearchApi"
import SearchResultsList from "../molecules/SearchResultsList"

const SearchPersonas = ({
  startSearch,
  data,
  isLoading,
  setPersonaId,
  error,
  setSelectedPersona,
  selectedPersona,
  personaId,
  setSearch,
  handleChange,
  search,
  label = "Buscar persona existente...",
  variant = "defaultVariants",
  // resetQuery,
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // resetQuery()
      startSearch(search)
    }
  }

  const variants = {
    defaultVariants: "w-[90%] lg:w-[50%] mt-1",
    modal: "w-full mt-6",
    modalShhet: "w-full mt-0 mb-6",
  }

  return (
    <>
      <div
        className={cn(
          "flex items-center gap-3 mb-2 m-auto flex-col justify-between",
          variants[variant]
        )}
      >
     
        <InputSearchApi
          error={error}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
          isLoading={isLoading}
          label={label}
        />

        {selectedPersona && !isLoading && (
          <SearchResultsList
            data={data}
            startSearch={startSearch}
            search={search}
            setSearch={setSearch}
            setPersonaId={setPersonaId}
            selectedPersona={selectedPersona}
            setSelectedPersona={setSelectedPersona}
            isLoading={isLoading}
            personaId={personaId}
          />
        )}
      </div>
      <ErrorMessage message={error} />
    </>
  )
}

export default SearchPersonas
