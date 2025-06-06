import { AnimatePresence, motion } from "framer-motion"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const ErrorDuplicateMessage = ({ message }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="mt-3 text-red-700 animate-pulse rounded-md border-red-800 dark:text-red-400 dark:border-red-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ErrorDuplicateMessage
