import { Loader2, Search } from "lucide-react"

const InputSearchApi = ({
  error,
  handleChange,
  handleKeyDown,
  handleSearchClick, // ✅ Nueva prop
  isLoading,
  label,
}) => {
  return (
    <div className="relative w-full group">
      <div className="input-with-placeholder">
        <input
          className={`input-custom outline-none rounded-full ${
            error ? "border border-red-400" : " "
          } `}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          id="username"
          autoComplete="off"
          required
        />

        <label className="text-primary" htmlFor="username">
          {label}
        </label>
        
        {/* ✅ Cambié div por button y agregué onClick */}
        <button 
          type="button"
          onClick={handleSearchClick}
          disabled={isLoading}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-aqua-700 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900/10 w-8 h-8 p-1 rounded-full transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-full h-full animate-spin" />
          ) : (
            <Search className="w-full h-full text-aqua-700 hover:text-aqua-800" />
          )}
        </button>
      </div>
    </div>
  )
}

export default InputSearchApi
