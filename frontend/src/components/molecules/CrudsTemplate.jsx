import { cn } from "@/lib/utils"

const CrudsTemplate = ({ children, fixed, className,isFullscreen, ...props }) => {
  return (
    <div
      className={cn(
        "peer-[.header-fixed]/header:mt-10 transition-all duration-300 ",
        "px-4 py-6",
        fixed && "fixed-main flex grow flex-col overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        className={`transition-all duration-300 ${
          isFullscreen
            ? "fixed inset-0 z-50 bg-white dark:bg-black p-4 overflow-y-auto"
            : ""
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default CrudsTemplate
