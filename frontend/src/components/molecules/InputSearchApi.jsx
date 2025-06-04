import { Loader2, Search } from "lucide-react"

const InputSearchApi = ({
  error,
  handleChange,
  handleKeyDown,
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
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-aqua-700  bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900/10 w-8 h-8 p-1 rounded-full ">
          {isLoading ? (
            <Loader2 className="w-full h-full" />
          ) : (
            <Search className="text-aqua-700/10 flex items-center justify-center hover:bg-none" />
          )}
        </div>
      </div>
    </div>
  )
}

export default InputSearchApi
