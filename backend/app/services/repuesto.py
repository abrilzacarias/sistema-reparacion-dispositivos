from sqlalchemy.orm import Session, selectinload
from app.models import repuesto as models
from app.schemas import repuesto as schemas

def get_repuestos(db: Session):
    return db.query(models.Repuesto)\
             .options(selectinload(models.Repuesto.marca), selectinload(models.Repuesto.tipo))\
             .filter(models.Repuesto.estadoRepuesto == 1)

def get_repuesto(db: Session, idRepuesto: int):
    return db.query(models.Repuesto).filter(
        models.Repuesto.idRepuesto == idRepuesto
    ).options(
        selectinload(models.Repuesto.marca),
        selectinload(models.Repuesto.tipo)
    ).first()


def create_repuesto(db: Session, repuesto: schemas.RepuestoCreate):
    db_repuesto = models.Repuesto(**repuesto.dict())
    db.add(db_repuesto)
    db.commit()
    db.refresh(db_repuesto)
    return db_repuesto

def update_repuesto(db: Session, idRepuesto: int, repuesto: schemas.RepuestoUpdate):
    db_repuesto = get_repuesto(db, idRepuesto)
    if not db_repuesto:
        return None
    for key, value in repuesto.dict().items():
        setattr(db_repuesto, key, value)
    db.commit()
    db.refresh(db_repuesto)
    return db_repuesto

def delete_repuesto(db: Session, idRepuesto: int):
    db_repuesto = get_repuesto(db, idRepuesto)
    if not db_repuesto:
        return None
    # Cambio para eliminación lógica
    db_repuesto.estadoRepuesto = False  # o 0 si lo usás como int
    db.commit()
    db.refresh(db_repuesto)
    return db_repuesto


def get_repuestos_by_marca(db: Session, id_marca: int, skip: int = 0, limit: int = 100):
    return db.query(models.Repuesto).filter(
        models.Repuesto.idMarcaDispositivo == id_marca
    ).options(
        selectinload(models.Repuesto.marca),
        selectinload(models.Repuesto.tipo)
    )
