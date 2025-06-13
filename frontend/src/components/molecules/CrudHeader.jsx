const CrudHeader = ({ children, title, subTitle }) => {
  return (
    <div className="mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
      <div className="w-full sm:w-auto">
        <h2 className="text-xl sm:text-2xl text-aqua-700 font-bold tracking-tight">{title}</h2>
        <p className="text-sm sm:text-base text-aqua-700">{subTitle}</p>
      </div>
      <div className="flex flex-wrap gap-1 w-full sm:w-auto justify-start sm:justify-end items-center mt-2 sm:mt-0">
        {children}
      </div>
    </div>
  )
}

export default CrudHeader