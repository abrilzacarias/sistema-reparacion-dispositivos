import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"

const LoaderRefetch = ({ isRefetching, loading , label="Actualizando" }) => {
  return (
    <AnimatePresence>
      {(isRefetching || loading) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-card p-6 rounded-lg shadow-lg flex items-center gap-3"
          >
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <p className="text-sm font-medium">{label} datos...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoaderRefetch
