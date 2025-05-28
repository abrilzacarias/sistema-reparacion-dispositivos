import { createContext, useContext } from "react"
import { Toaster } from "sonner"
import { AppContext } from "./AppContext"

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const { darkMode } = useContext(AppContext)

  const theme = darkMode ? "dark" : "light"

  return (
    <ToastContext.Provider value={{ theme }}>
      {children}
      <Toaster
        richColors
        position="top-right"
        closeButton
        theme={theme ?? "system"}
      />
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext)
