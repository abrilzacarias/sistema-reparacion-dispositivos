from sqlalchemy.orm import Session
from app.models.persona import Persona
from app.schemas.persona import PersonaCreate, PersonaUpdate

def get_persona(db: Session, idPersona: int):
    return db.query(Persona).filter(Persona.idPersona == idPersona).first()

def get_personas(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Persona).filter(Persona.estadoPersona == 1)

def create_persona(db: Session, persona: PersonaCreate):
    persona_data = persona.dict()
    persona_data["estadoPersona"] = True  # Forzar estado activo
    db_persona = Persona(**persona_data)
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


def delete_persona(db: Session, id_persona: int) -> bool:
    persona = db.query(Persona).filter(Persona.idPersona == id_persona).first()
    if persona is None:
        return False
    persona.estadoPersona = 0
    db.commit()
    return True
