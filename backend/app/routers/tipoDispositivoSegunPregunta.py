from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.tipoDispositivoSegunPregunta import *
from app.services import tipoDispositivoSegunPregunta as service
from app.database import get_db
from fastapi_pagination import Page, Params
from fastapi_pagination.ext.sqlalchemy import paginate, create_page
from typing import List, Optional
from fastapi_pagination import paginate

router = APIRouter(prefix="/tipo-dispositivo-segun-pregunta", tags=["TipoDispositivoSegunPregunta"])

@router.get("/", response_model=list[TipoDispositivoSegunPreguntaConDetalles])
def listar_todos(db: Session = Depends(get_db)):
    query = service.get_all(db)
    return query.all()  # Ejecuta la query, devuelve lista completa sin paginar

@router.get("/paginado", response_model=Page[TipoDispositivoSegunPreguntaConDetalles])
def listar_paginado(db: Session = Depends(get_db)):
    query = service.get_all(db)
    return paginate(query)  # paginate recibe el query y hace la paginación

@router.get("/agrupado-paginado", response_model=Page[TipoDispositivoAgrupadoSchema])
def listar_agrupado_paginado(db: Session = Depends(get_db)):
    agrupado = service.get_grouped_by_dispositivo(db)
    return paginate(agrupado)  # ✅ Esto funciona con listas

@router.get("/{id}", response_model=TipoDispositivoSegunPreguntaResponse)
def obtener_por_id(id: str, db: Session = Depends(get_db)):
    obj = service.get_by_id(db, id)
    if not obj:
        raise HTTPException(status_code=404, detail="No encontrado")
    return obj

@router.post("/", response_model=TipoDispositivoSegunPreguntaResponse)
def crear(entrada: TipoDispositivoSegunPreguntaCreate, db: Session = Depends(get_db)):
    return service.create(db, entrada)

@router.put("/{id}", response_model=TipoDispositivoSegunPreguntaResponse)
def actualizar(id: str, entrada: TipoDispositivoSegunPreguntaUpdate, db: Session = Depends(get_db)):
    obj = service.update(db, id, entrada)
    if not obj:
        raise HTTPException(status_code=404, detail="No encontrado")
    return obj

@router.delete("/{id}", status_code=204)
def eliminar_tipo_segun_pregunta(id: int, db: Session = Depends(get_db)):
    obj = service.get_by_id(db, id)
    if not obj:
        raise HTTPException(status_code=404, detail="No encontrado")
    
    obj.estadoTipoDispositivoSegunPregunta = False
    db.commit()

@router.get("/por-tipo-dispositivo/{id_tipo_dispositivo}", response_model=list[TipoDispositivoSegunPreguntaResponse])
def obtener_preguntas_por_tipo_dispositivo(id_tipo_dispositivo: int, db: Session = Depends(get_db)):
    """
    Obtiene todas las preguntas de diagnóstico asociadas a un tipo de dispositivo específico.
    Incluye información completa de la pregunta y su tipo de dato.
    """
    preguntas = service.get_by_tipo_dispositivo(db, id_tipo_dispositivo)
    if not preguntas:
        # No es un error si no hay preguntas, simplemente devuelve lista vacía
        return []
    return preguntas


