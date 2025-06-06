from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from app.models import Persona, Contacto, Domicilio
from app.schemas.persona import PersonaUpdate

def get_persona(db: Session, idPersona: int):
    return db.query(Persona).filter(Persona.idPersona == idPersona).first()

def get_personas(db: Session, search: str = None):
    query = db.query(Persona)
    if search:
        search = f"%{search.lower()}%"
        query = query.filter(
            or_(
                func.lower(Persona.nombre).like(search),
                func.lower(Persona.apellido).like(search),
                func.lower(Persona.cuit).like(search)
            )
        )
    return query

def create_persona(db, persona_in):
    # persona_in es el Pydantic model con los datos de entrada
    contactos = [Contacto(**c.dict()) for c in persona_in.contactos]
    domicilios = [Domicilio(**d.dict()) for d in persona_in.domicilios]

    db_persona = Persona(
        cuit=persona_in.cuit,
        nombre=persona_in.nombre,
        apellido=persona_in.apellido,
        fechaNacimiento=persona_in.fechaNacimiento,
        contactos=contactos,
        domicilios=domicilios,
    )

    db.add(db_persona)
    db.commit()
    db.refresh(db_persona)
    return db_persona

def update_persona(db: Session, idPersona: int, persona: PersonaUpdate):
    db_persona = get_persona(db, idPersona)
    if not db_persona:
        return None
    update_data = persona.dict(exclude={"contactos", "domicilios"})
    print(f"Updating persona with ID: {idPersona}, Data: {update_data}")
    for key, value in update_data.items():
        setattr(db_persona, key, value)
    db.commit()
    db.refresh(db_persona)
    return db_persona


def delete_persona(db: Session, id_persona: int) -> bool:
    persona = db.query(Persona).filter(Persona.idPersona == id_persona).first()
    if persona is None:
        return False
    persona.estadoPersona = 0
    db.commit()
    return True
