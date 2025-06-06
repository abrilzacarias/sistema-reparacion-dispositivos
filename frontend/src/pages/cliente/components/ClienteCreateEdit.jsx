// src/components/organisms/ClienteCreateEdit.jsx

import ButtonDinamicForms from "@/components/atoms/ButtonDinamicForms";
import { ToastMessageCreate, ToastMessageEdit } from "@/components/atoms/ToastMessage";
import ErrorMessage from "@/components/molecules/ErrorMessage";
import { OpenContext } from "@/components/organisms/ModalFormTemplate";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SearchPersonas from "@/components/organisms/SearchPersonas";
import PersonaCreateEdit from "@/components/organisms/PersonaCreateEdit";

const API_URL = import.meta.env.VITE_API_URL;

const ClienteCreateEdit = ({ cliente, refreshClientes }) => {
  // Hook para manejar formulario
  const {
    register,
    handleSubmit,
    control,
    setValue,           // para precargar campos si edito
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      observaciones: cliente?.observaciones || "",
      // idPersona no va en defaultValues: lo seteamos al seleccionar Persona
    },
  });

  const { open, setOpen } = useContext(OpenContext);

  // Estados locales
  const [selectedPersona, setSelectedPersona] = useState(cliente?.persona || null);
  const [personaId, setPersonaId] = useState(cliente?.idPersona || null);
  const [isErrorApi, setIsErrorApi] = useState(false);
  const [error, setError] = useState("");
  const [apiErrors, setApiErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Si estoy editando, precargo la persona y el campo observaciones
  useEffect(() => {
    if (cliente) {
      setSelectedPersona(cliente.persona);
      setPersonaId(cliente.idPersona);
      setValue("observaciones", cliente.observaciones || "");
    }
  }, [cliente, setValue]);

  // Verificar si la persona ya es cliente activo (para evitar duplicados)
  useEffect(() => {
    if (selectedPersona) {
      // Aquí podrías llamar a un endpoint que te diga si existe un cliente asociado a esa persona activa.
      // Para simplificar: supongamos que al cargar “selectedPersona” (si viene con cliente.en uso),
      // ya tenemos esa info. Por eso:
      if (selectedPersona.cliente) {
        setIsErrorApi(
          `La persona ${selectedPersona.nombre} ${selectedPersona.apellido} ya está registrada como Cliente activo.`
        );
      } else {
        setIsErrorApi(false);
      }
    }
  }, [selectedPersona]);

  // Función al enviar datos
  const onSubmit = async (data) => {
    setError("");
    setApiErrors({});
    setIsLoading(true);

    try {
      if (!personaId) {
        setError("Debes seleccionar una persona para vincular al cliente.");
        setIsLoading(false);
        return;
      }

      const payload = {
        observaciones: data.observaciones,
        idPersona: personaId,
      };

      console.log("Payload de Cliente:", payload);

      const endpoint = cliente
        ? `${API_URL}/clientes/${cliente.idCliente}/`
        : `${API_URL}/clientes/`;
      const method = cliente ? axios.put : axios.post;

      await method(endpoint, payload);

      // Mostrar notificación de éxito
      cliente ? ToastMessageEdit() : ToastMessageCreate();
      refreshClientes();
      setOpen(false);
    } catch (err) {
      console.error("Error al guardar cliente:", err);
      if (err.response?.status === 422) {
        setApiErrors(err.response.data);
        setError("Error validando campos. Por favor, revisa los datos.");
      } else if (err.response?.status === 500) {
        setError("Error del servidor. Intenta más tarde.");
      } else {
        setError(err.message || "Error desconocido");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      {/* Paso 1: Buscador/creador de Persona */}
      <SearchPersonas
        setSelectedPersona={setSelectedPersona}
        selectedPersona={selectedPersona}
        startSearch={(e) => {}}
        personaId={personaId}
        data={[]}             // Aquí tu hook useSearchPersonas inyecta personas al buscar
        isLoading={false}     // controla con tu hook
        setPersonaId={setPersonaId}
        error={false}         // controla con tu hook
        handleChange={(e) => {}}
        setSearch={() => {}}
        search={""}
        variant="modal"
        label="Filtrar persona por nombre, apellido o CUIT"
      />

      {/* Mensaje de error si la persona ya existe como cliente */}
      <ErrorMessage message={isErrorApi ? isErrorApi : ""} />

      {/* Si la persona no existe o ya es cliente, permitir crear nueva Persona */}
      {(!selectedPersona || isErrorApi) && (
        <ModalFormTemplate
          title="Crear Nueva Persona"
          description="Ingrese los datos para crear una nueva persona."
          icon={<></>}
          label="Crear Persona"
          variant="default"
          className="border w-[40%] lg:w-[30%] mt-6 rounded-md justify-center flex mx-auto"
        >
          <PersonaCreateEdit
            refreshPersonas={() => {}}
            setSelectedPersona={setSelectedPersona}
            setPersonaId={setPersonaId}
          />
        </ModalFormTemplate>
      )}

      {/* Formulario de Cliente: solo aparece si hay persona válida y no existe error de duplicado */}
      {selectedPersona && !isErrorApi && (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label>Observaciones</Label>
            <Input
              type="text"
              {...register("observaciones")}
              placeholder="Escribe aquí alguna observación..."
            />
            <ErrorMessage message={errors.observaciones?.message || apiErrors?.observaciones} />
          </div>

          <div className="flex justify-end mt-4">
            <ButtonDinamicForms initialData={cliente} isLoading={isLoading} register />
          </div>

          <div className="flex justify-end">
            <ErrorMessage message={apiErrors?.detail || error} />
          </div>
        </form>
      )}
    </div>
  );
};

export default ClienteCreateEdit;
