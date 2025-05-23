from sqlalchemy.orm import Session
from app.models.persona import Persona
from app.schemas.persona import PersonaCreate, PersonaUpdate

def get_persona(db: Session, idPersona: int):
    return db.query(Persona).filter(Persona.idPersona == idPersona).first()

def get_personas(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Persona)

def create_persona(db: Session, persona: PersonaCreate):
    db_persona = Persona(**persona.dict())
    db.add(db_persona)
    db.commit()
    db.refresh(db_persona)
    return db_persona

def update_persona(db: Session, idPersona: int, persona: PersonaUpdate):
    db_persona = get_persona(db, idPersona)
    if not db_persona:
        return None
    for key, value in persona.dict().items():
        setattr(db_persona, key, value)
    db.commit()
    db.refresh(db_persona)
    return db_persona

def delete_persona(db: Session, idPersona: int):
    db_persona = get_persona(db, idPersona)
    if not db_persona:
        return None
    db.delete(db_persona)
    db.commit()
    return db_persona
