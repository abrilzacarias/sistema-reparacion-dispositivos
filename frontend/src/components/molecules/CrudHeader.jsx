const CrudHeader = ({ children, title, subTitle }) => {
  return (
    <div className="mb-2  flex flex-wrap items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl text-aqua-700 font-bold tracking-tight">
          {title}
        </h2>
        <p className=" text-aqua-700">{subTitle}</p>
      </div>
      <div className="flex gap-2">{children}</div>
    </div>
  )
}

export default CrudHeader


