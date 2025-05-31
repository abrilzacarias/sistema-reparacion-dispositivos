import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"
import "./App.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ToastProvider } from "./context/ToastContext"
import { AppContextProvider } from "./context/AppContextProvider"

const router = {
  future: {
    v7_relativeSplatPath: true,
  },
}

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <ToastProvider>
        <React.StrictMode>
          <BrowserRouter future={router}>
            <App />
          </BrowserRouter>
        </React.StrictMode>,
      </ToastProvider>
    </AppContextProvider>
  </QueryClientProvider>
)
