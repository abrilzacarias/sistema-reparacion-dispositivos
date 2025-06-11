from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from app.models import Persona, Contacto, Domicilio
from app.schemas.persona import PersonaUpdate, PersonaCreate
from fastapi import HTTPException

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

def create_persona(db: Session, persona_data: PersonaCreate):
    persona_existente = db.query(Persona).filter(
        Persona.cuit == persona_data.cuit,
        Persona.estadoPersona == 1
    ).first()

    if persona_existente:
        raise HTTPException(status_code=400, detail="Ya existe una persona con ese CUIT.")

    persona = Persona(
        cuit=persona_data.cuit,
        nombre=persona_data.nombre,
        apellido=persona_data.apellido,
        fechaNacimiento=persona_data.fechaNacimiento,
        estadoPersona=1,
    )
    db.add(persona)
    db.commit()
    db.refresh(persona)

    for contacto_data in persona_data.contactos:
        contacto_existente = db.query(Contacto).filter(
            func.lower(Contacto.descripcionContacto) == contacto_data.descripcionContacto.lower()
        ).first()

        if contacto_existente:
            raise HTTPException(status_code=400, detail=f"El contacto '{contacto_data.descripcionContacto}' ya está en uso por otra persona.")

        contacto = Contacto(
            descripcionContacto=contacto_data.descripcionContacto,
            idtipoContacto=contacto_data.idtipoContacto,
            esPrimario=contacto_data.esPrimario,
            idPersona=persona.idPersona
        )
        db.add(contacto)

    db.commit()
    return persona


def update_persona(db: Session, idPersona: int, persona_data: PersonaUpdate):
    print('updateando')
    persona = db.query(Persona).filter(Persona.idPersona == idPersona).first()
    if not persona:
        raise HTTPException(status_code=404, detail="Persona no encontrada.")

    persona_con_mismo_cuit = db.query(Persona).filter(
        Persona.cuit == persona_data.cuit,
        Persona.idPersona != idPersona,
        Persona.estadoPersona == 1
    ).first()

    if persona_con_mismo_cuit:
        raise HTTPException(status_code=400, detail="Ya existe otra persona con ese CUIT.")

    persona.cuit = persona_data.cuit
    persona.nombre = persona_data.nombre
    persona.apellido = persona_data.apellido
    persona.fechaNacimiento = persona_data.fechaNacimiento
    db.commit()

    for contacto_data in persona_data.contactos:
        print(contacto_data)
        if contacto_data.idContacto:
            contacto = db.query(Contacto).filter(Contacto.idContacto == contacto_data.idContacto).first()
            if contacto:
                contacto_existente = db.query(Contacto).filter(
                    func.lower(Contacto.descripcionContacto) == contacto_data.descripcionContacto.lower(),
                    Contacto.idContacto != contacto.idContacto
                ).first()

                if contacto_existente:
                    raise HTTPException(status_code=400, detail=f"El contacto '{contacto_data.descripcionContacto}' ya está en uso por otra persona.")

                contacto.descripcionContacto = contacto_data.descripcionContacto
                contacto.idtipoContacto = contacto_data.idtipoContacto
                contacto.esPrimario = contacto_data.esPrimario

        else:
            contacto_existente = db.query(Contacto).filter(
                func.lower(Contacto.descripcionContacto) == contacto_data.descripcionContacto.lower()
            ).first()

            if contacto_existente:
                raise HTTPException(status_code=400, detail=f"El contacto '{contacto_data.descripcionContacto}' ya está en uso por otra persona.")

            nuevo_contacto = Contacto(
                descripcionContacto=contacto_data.descripcionContacto,
                idtipoContacto=contacto_data.idtipoContacto,
                esPrimario=contacto_data.esPrimario,
                idPersona=idPersona
            )
            db.add(nuevo_contacto)

    db.commit()
    return persona

def delete_persona(db: Session, id_persona: int) -> bool:
    persona = db.query(Persona).filter(Persona.idPersona == id_persona).first()
    if persona is None:
        return False
    persona.estadoPersona = 0
    db.commit()
    return True
