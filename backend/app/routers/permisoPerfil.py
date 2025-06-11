from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi_pagination import Page, paginate
from app.database import get_db
from app.schemas import permisoPerfil as schemas
from app.services import permisoPerfil as services
from typing import List

router = APIRouter(prefix="/permisos-perfil", tags=["Permisos por Perfil"])

@router.get("/", response_model=Page[schemas.PermisoAgrupado], summary="Obtener lista paginada de permisos por perfil")
def read_permisos_perfil(db: Session = Depends(get_db)):
    datos_agrupados = services.get_permisos_perfil(db)
    return paginate(datos_agrupados)

@router.get("/{idpermiso}", response_model=schemas.PermisoPerfilOut, summary="Obtener un permiso por ID")
def read_permiso_perfil(idpermiso: int, db: Session = Depends(get_db)):
    permiso = services.get_permiso_perfil(db, idpermiso)
    if not permiso:
        raise HTTPException(status_code=404, detail="Permiso no encontrado")
    return permiso

@router.post("/", response_model=List[schemas.PermisoPerfilOut], status_code=status.HTTP_201_CREATED)
def create_permisos_perfil(data: schemas.PermisosPerfilCreate, db: Session = Depends(get_db)):
    try:
        return services.create_permisos_perfil(db, data.permisos)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

#no sirve mucho solo cambia el valor del estado!!!!
@router.put("/{idpermiso}", response_model=schemas.PermisoPerfilOut, summary="Actualizar un permiso existente")
def update_permiso_perfil(idpermiso: int, permiso: schemas.PermisosPerfilCreate, db: Session = Depends(get_db)):
    updated = services.update_permiso_perfil(db, idpermiso, permiso)
    if not updated:
        raise HTTPException(status_code=404, detail="Permiso no encontrado")
    return updated

@router.delete("/{idperfil}", status_code=status.HTTP_204_NO_CONTENT, summary="Dar de baja lógica un perfil y sus permisos")
def delete_permiso_perfil(idperfil: int, db: Session = Depends(get_db)):
    success = services.delete_permiso_perfil(db, idperfil)
    if not success:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")
