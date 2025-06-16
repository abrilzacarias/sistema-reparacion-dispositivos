import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const SettingsProfilePage = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      nombre: "",
      apellido: "",
      fechaNacimiento: "",
      domicilio: "",
    }
  })

  const onSubmit = (data) => {
    console.log("Enviando datos actualizados:", data)
    // Aquí podés hacer un fetch/axios para hacer PUT a tu backend
  }

  return (
    <Card className="max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Configuración de Perfil</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" {...register("nombre", { required: "Nombre requerido" })} />
              {errors.nombre && <p className="text-sm text-red-500 mt-1">{errors.nombre.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido</Label>
              <Input id="apellido" {...register("apellido", { required: "Apellido requerido" })} />
              {errors.apellido && <p className="text-sm text-red-500 mt-1">{errors.apellido.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
              <Input
                id="fechaNacimiento"
                type="date"
                {...register("fechaNacimiento", { required: "Fecha requerida" })}
              />
              {errors.fechaNacimiento && (
                <p className="text-sm text-red-500 mt-1">{errors.fechaNacimiento.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="domicilio">Domicilio</Label>
              <Input id="domicilio" {...register("domicilio")} />
            </div>
          </div>

          <div className="text-right">
            <Button type="submit">Guardar cambios</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default SettingsProfilePage
