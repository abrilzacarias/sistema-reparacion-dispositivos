import { RefreshCw } from "lucide-react"
import { Button } from "../ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { motion } from "framer-motion"
import { buttonVariants } from "../ui/button"

const ButtonRefetch = ({ refetch, loading, isRefetching }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={loading || isRefetching}
              className="flex items-center gap-1 border-none text-aqua-700 dark:text-gray-200"

            >
              <RefreshCw
                className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`}
              />
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Actualizar datos</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ButtonRefetch
