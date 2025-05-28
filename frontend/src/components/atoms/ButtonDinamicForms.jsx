import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"

const ButtonDinamicForms = ({ initialData, isLoading, register = false }) => {
  const variants = {
    defaultVariants: {
      labelCreate: "Crear",
      labelCreateLoading: "Creando",
      labelEdit: "Actualizar",
      labelEditLoading: "Actualizando",
    },
    register: {
      labelCreate: "Registrar",
      labelCreateLoading: "Registrando",
      labelEdit: "Actualizar",
      labelEditLoading: "Actualizando",
    },
  }

  const variant = register ? variants.register : variants.defaultVariants

  return (
    <Button type="submit" variant="custom" className="rounded-full" disabled={isLoading}>
      {!isLoading ? (
        initialData ? (
          variant.labelEdit
        ) : (
          variant.labelCreate
        )
      ) : (
        <>
          {initialData ? variant.labelEditLoading : variant.labelCreateLoading}
          <Loader2 className="animate-spin" />
        </>
      )}
    </Button>
  )
}

export default ButtonDinamicForms
