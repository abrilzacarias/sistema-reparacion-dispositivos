import { Loader2, AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "../ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  alertIconVariants,
  buttonVariants,
  childVariants,
  containerVariants,
  spinnerVariants,
} from "@/lib/variantsErrorApi"

const ErrorApiRefetch = ({ refetch, isRefetching }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <AnimatePresence>
      <motion.div
        className="flex h-full items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="text-center p-8 bg-red-50 border border-red-200 shadow-lg rounded-lg max-w-md dark:bg-red-900/10 dark:border-transparent"
          variants={containerVariants}
        >
          <motion.div
            className="flex justify-center mb-4"
            variants={childVariants}
          >
            <motion.div
              className="p-4 bg-red-100 rounded-full border-2 border-red-400 dark:bg-red-800 dark:border-red-700"
              variants={alertIconVariants}
              animate={["visible", "pulse"]}
            >
              <AlertTriangle
                size={32}
                className="text-red-600 dark:text-red-300"
              />
            </motion.div>
          </motion.div>

          <motion.h3
            className="text-xl font-bold text-red-800 dark:text-white"
            variants={childVariants}
          >
            Error al cargar los datos
          </motion.h3>

          <motion.p
            className="mt-3 text-red-600 dark:text-red-400"
            variants={childVariants}
          >
            Por favor, inténtelo más tarde o contacte con soporte técnico.
          </motion.p>

          <motion.div className="mt-6" variants={childVariants}>
            <motion.div
              variants={buttonVariants}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <Button

                variant={isRefetching ? "outline" : "outline"}
                className={`
                  mx-auto py-5 rounded-lg font-medium  shadow-none   
                  ${
                    isRefetching
                      ? "bg-white border-red-300 text-red-600 dark:bg-red-900 dark:border-red-700 dark:text-red-300"
                      : "bg-red-600 hover:bg-red-700 text-white border-none dark:bg-red-700/60 dark:hover:bg-red-600/40"
                  } 
                  transition-all duration-300 flex items-center gap-2 w-auto justify-center
                `}
                onClick={() => !isRefetching && refetch()}
                disabled={isRefetching}
              >
                {isRefetching ? (
                  <>
                    <motion.div
                      variants={spinnerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Loader2 size={18} />
                    </motion.div>
                    <span>Reintentando...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw
                      size={18}
                      className={`${
                        isHovered ? "animate-spin" : ""
                      } transition-all`}
                    />
                    <span>Reintentar</span>
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>

          {isRefetching && (
            <motion.div
              className="h-0.5 bg-red-400 mt-4 rounded-full dark:bg-red-600"
              initial={{ width: "0%" }}
              animate={{
                width: "100%",
                transition: { duration: 2, repeat: Infinity },
              }}
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ErrorApiRefetch
