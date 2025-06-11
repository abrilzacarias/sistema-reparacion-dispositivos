from sqlalchemy.orm import Session, selectinload
from app.models.registroEstadoReparacion import RegistroEstadoReparacion
from app.utils import enviarWhatsapp

def notificar_cambio_estado_reparacion(db: Session, registro: RegistroEstadoReparacion):
    reparacion = registro.reparacion

    try:
        cliente = reparacion.diagnostico.dispositivo.cliente
        persona = cliente.persona

        tipo_telefono_id = 3  # El id del tipoContacto para teléfono

        contacto = next(
            (c for c in persona.contactos if c.esPrimario and c.idtipoContacto == tipo_telefono_id),
            None
        )

        if not contacto or not contacto.descripcionContacto:
            print("Cliente sin contacto primario telefónico. No se envió mensaje.")
            return

        # Obtener la descripción del estado desde el registro
        dispositivo = reparacion.diagnostico.dispositivo
        modelo = dispositivo.modeloDispositivo
        marca = modelo.marcaDispositivo.descripcionMarcaDispositivo
        descripcion_modelo = modelo.descripcionModeloDispositivo
        nombre_dispositivo = f"{marca} {descripcion_modelo}"
        

        descripcion_estado = registro.estadoReparacion.descripcionEstadoReparacion

        mensaje = (
            f"Hola {persona.nombre}, le informamos que el estado de su {nombre_dispositivo} ha cambiado a: {descripcion_estado}. "
            f"Consulte su cuenta o contáctese con soporte para más información."
        )

        enviarWhatsapp(contacto.descripcionContacto, mensaje)

    except AttributeError as e:
        print("No se pudo acceder al cliente desde la reparación:", e)

