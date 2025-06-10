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

    # Create contactos
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

    # Create domicilios
    for domicilio_data in persona_data.domicilios:
        domicilio = Domicilio(
            codigoPostal=domicilio_data.codigoPostal,
            pais=domicilio_data.pais,
            provincia=domicilio_data.provincia,
            ciudad=domicilio_data.ciudad,
            barrio=domicilio_data.barrio,
            calle=domicilio_data.calle,
            departamento=domicilio_data.departamento,
            idtipoDomicilio=domicilio_data.idtipoDomicilio,
            idPersona=persona.idPersona
        )
        db.add(domicilio)

    db.commit()
    return persona


def update_persona(db: Session, idPersona: int, persona_data: PersonaUpdate):
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

    # Update contactos
    for contacto_data in persona_data.contactos:
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

    # Update domicilios
    for domicilio_data in persona_data.domicilios:
        if domicilio_data.idDomicilio:
            domicilio = db.query(Domicilio).filter(Domicilio.idDomicilio == domicilio_data.idDomicilio).first()
            if domicilio:
                domicilio.codigoPostal = domicilio_data.codigoPostal
                domicilio.pais = domicilio_data.pais
                domicilio.provincia = domicilio_data.provincia
                domicilio.ciudad = domicilio_data.ciudad
                domicilio.barrio = domicilio_data.barrio
                domicilio.calle = domicilio_data.calle
                domicilio.departamento = domicilio_data.departamento
                domicilio.idtipoDomicilio = domicilio_data.idtipoDomicilio
        else:
            nuevo_domicilio = Domicilio(
                codigoPostal=domicilio_data.codigoPostal,
                pais=domicilio_data.pais,
                provincia=domicilio_data.provincia,
                ciudad=domicilio_data.ciudad,
                barrio=domicilio_data.barrio,
                calle=domicilio_data.calle,
                departamento=domicilio_data.departamento,
                idtipoDomicilio=domicilio_data.idtipoDomicilio,
                idPersona=idPersona
            )
            db.add(nuevo_domicilio)

    db.commit()
    return persona

def delete_persona(db: Session, id_persona: int) -> bool:
    persona = db.query(Persona).filter(Persona.idPersona == id_persona).first()
    if persona is None:
        return False
    persona.estadoPersona = 0
    db.commit()
    return True
