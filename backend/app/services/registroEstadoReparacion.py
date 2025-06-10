from sqlalchemy.orm import Session
from app.models.registroEstadoReparacion import RegistroEstadoReparacion
from app.schemas import registroEstadoReparacion as schemas
from app.services.whatsapp import enviar_whatsapp
from app.models.reparacion import Reparacion  # si tenés este modelo
from app.models.cliente import Cliente  # idem
from app.models.persona import Persona  # idem
from app.services.contacto import obtener_telefono_de_persona_o_contactos

def get_registros(db: Session):
    return db.query(RegistroEstadoReparacion)

def get_registro(db: Session, id_registro: int):
    return db.query(RegistroEstadoReparacion).filter(RegistroEstadoReparacion.idRegistroEstadoReparacion == id_registro).first()

def create_registro(db: Session, registro: schemas.RegistroEstadoReparacionCreate):
    db_registro = RegistroEstadoReparacion(**registro.dict())
    db.add(db_registro)
    db.commit()
    db.refresh(db_registro)

    # Obtener el teléfono del cliente asociado a la reparación
    reparacion = db.query(Reparacion).filter(Reparacion.idReparacion == db_registro.idReparacion).first()
    if reparacion:
        cliente = db.query(Cliente).filter(Cliente.idCliente == reparacion.idCliente).first()
        if cliente:
            # Suponiendo que tenés el teléfono en la persona o en contactos (ajustar según tu modelo)
            persona = db.query(Persona).filter(Persona.idPersona == cliente.idPersona).first()
            if persona:
                # Por ejemplo, si persona tiene un atributo 'telefono' (o tomalo de contactos)
                telefono = obtener_telefono_de_persona_o_contactos(persona)  # Definir esta función según modelo
                if telefono:
                    mensaje = f"El estado de su reparación ha cambiado a: {db_registro.estadoReparacion.nombreEstado}"  # o el texto que quieras
                    enviar_whatsapp(telefono, mensaje)

    return db_registro

def update_registro(db: Session, id_registro: int, registro: schemas.RegistroEstadoReparacionUpdate):
    db_registro = get_registro(db, id_registro)
    if not db_registro:
        return None
    for key, value in registro.dict().items():
        setattr(db_registro, key, value)
    db.commit()
    db.refresh(db_registro)
    return db_registro

def delete_registro(db: Session, id_registro: int):
    registro = db.query(RegistroEstadoReparacion).filter(
        RegistroEstadoReparacion.idRegistroEstadoReparacion == id_registro
    ).first()
    if registro:
        db.delete(registro)
        db.commit()
        return True
    return False

def get_estado_actual(db: Session, id_reparacion: int):
    return (
        db.query(RegistroEstadoReparacion)
        .filter(RegistroEstadoReparacion.idReparacion == id_reparacion)
        .order_by(RegistroEstadoReparacion.fechaHoraRegistroEstadoReparacion.desc())
        .first()
    )