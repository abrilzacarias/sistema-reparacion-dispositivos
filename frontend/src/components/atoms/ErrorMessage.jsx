import { AlertCircle } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

const ErrorMessage = ({ message,  }) => {
  if (!message) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: -10, height: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="w-full flex items-center justify-center"
      >
        <motion.div
          className="flex items-center gap-1 text-red-400  bg-red-50 dark:bg-red-900/10 rounded-md"
          animate={{
            scale: [1, 1.03, 1],
           
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          <AlertCircle size={16} />
          <p className="text-xs">{message}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ErrorMessage

export const ErrorMessageLarge = ({ message, className = "" }) => {
  if (!message) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: -10, height: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="w-full flex items-center justify-center"
      >
        <motion.div
          className="flex items-center gap-2 text-red-400  bg-red-50 dark:bg-red-900/10 px-4 py-1 rounded-md"
          animate={{
            scale: [1, 1.03, 1],
            boxShadow: [
              "0 0 0 rgba(255, 0, 0, 0)",
              "0 0 8px rgba(255, 0, 0, 0.3)",
              "0 0 0 rgba(255, 0, 0, 0)",
            ],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          <AlertCircle size={16} />
          <p className="text-xs">{message}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
