import {
  AlertCircle,
  CircleCheck,
  Info,
  TriangleAlert
} from "lucide-react"
import { toast } from "sonner"

const icons = [
  {
    state: "info",
    icon: Info,
    className: "text-primary text-white mr-6 w-[30px] h-[45px]",
  },
  {
    state: "success",
    icon: CircleCheck,
    className: "text-primary text-white mr-6 w-[30px] h-[45px]",
  },
  {
    state: "error",
    icon: AlertCircle,
    className: "text-primary text-white mr-6 w-[30px] h-[45px]",
  },
  {
    state: "warning",
    icon: TriangleAlert,
    className: "text-primary text-white mr-6 w-[30px] h-[45px]",
  },
]

const searchIconState = (state) => {
  const targetIcon = icons.find((i) => i.state === state)
  if (targetIcon && targetIcon.icon) {
    const IconComponent = targetIcon.icon
    return <IconComponent className={targetIcon.className} />
  }
  return null
}

const stateClasses = {
  info: "text-primary",
  success: "text-primary",
  error: "text-primary",
  warning: "text-primary",
}

export const ToastMessage = ({ ...props }) => {
  const containerClasses = `flex items-center text-lg rounded-lg  ${
    stateClasses[props.state] || "bg-white"
  }`

  toast(
    <div className={containerClasses}>
      {props.state && searchIconState(props.state)}
      <div>
        <strong className="text-lg">
          {props.title || (props.state === "error" && "Algo salió mal")}
        </strong>
        <p className="text-sm text-gray-700">
          {props.subtitle && (
            <>
              {props.subtitle}
              <br />
            </>
          )}

          <span className="font-medium">
            {props.description || "La operación se realizó correctamente."}
          </span>
        </p>
      </div>
    </div>
  )
}

export const ToastMessageCreate = () => {
  toast(
    <div className=" flex items-center text-lg rounded-lg text-aqua-700">
      <CircleCheck className="text-aqua-700 mr-6 w-[30px] h-[45px]" />
      <div>
        <strong className="text-lg">¡Operación exitosa!</strong>
        <p className="text-sm text-gray-700">
          Proceso finalizado
          <br />
          <span className="font-medium">
            El registro se ha guardado correctamente
          </span>
        </p>
      </div>
    </div>
  )
}

export const ToastMessageEdit = () => {
  toast(
    <div className=" flex items-center text-lg rounded-lg text-aqua-700">
      <CircleCheck className="text-aqua-700 mr-6 w-[30px] h-[45px]" />
      <div>
        <strong className="text-lg">¡Modificación realizada!</strong>
        <p className="text-sm text-gray-700">
          Proceso finalizado <br />
          <span className="font-medium">
            Los cambios han sido guardados correctamente.
          </span>
        </p>
      </div>
    </div>
  )
}
