from sqlalchemy.orm import Session, joinedload
from app.models import PermisoPerfil, ModuloFuncionSistema, Perfil
from app.schemas import permisoPerfil as schemas
from collections import defaultdict
from typing import List

def get_permisos_perfil(db: Session):
    perfiles = db.query(Perfil).filter(Perfil.estadoPerfil == 1).all()

    agrupado = {}

    for perfil in perfiles:
        agrupado[perfil.idPerfil] = {
            "idPerfil": perfil.idPerfil,
            "nombrePerfil": perfil.nombrePerfil,
            "modulos": defaultdict(lambda: {"funciones": [], "rutas": []})
        }

        permisos = db.query(PermisoPerfil).options(
            joinedload(PermisoPerfil.moduloFuncionSistema)
            .joinedload(ModuloFuncionSistema.moduloSistema),
            joinedload(PermisoPerfil.moduloFuncionSistema)
            .joinedload(ModuloFuncionSistema.funcionSistema),
        ).filter(
            PermisoPerfil.idPerfil == perfil.idPerfil,
            PermisoPerfil.estadoPermisoPerfil == 1
        ).all()

        for permiso in permisos:
            mod_func = permiso.moduloFuncionSistema
            modulo = mod_func.moduloSistema
            funcion = mod_func.funcionSistema
            ruta = mod_func.rutaModuloFuncionSistema

            modulo_key = (modulo.idmoduloSistema, modulo.descripcionModuloSistema)
            funcion_data = {
                "idModuloFuncionSistema": mod_func.idmoduloFuncionSistema, 
                "idfuncionSistema": funcion.idfuncionSistema,
                "descripcionFuncionSistema": funcion.descripcionFuncionSistema,
            }

            ruta_data = {
                "idfuncionSistema": funcion.idfuncionSistema,
                "descripcionFuncionSistema": funcion.descripcionFuncionSistema,
                "ruta": ruta or ""
            }

            if funcion_data not in agrupado[perfil.idPerfil]["modulos"][modulo_key]["funciones"]:
                agrupado[perfil.idPerfil]["modulos"][modulo_key]["funciones"].append(funcion_data)

            if ruta_data not in agrupado[perfil.idPerfil]["modulos"][modulo_key]["rutas"]:
                agrupado[perfil.idPerfil]["modulos"][modulo_key]["rutas"].append(ruta_data)

    resultado = []
    for perfil_data in agrupado.values():
        modulos = []
        for (idModulo, nombreModulo), datos in perfil_data["modulos"].items():
            modulos.append({
                "idmoduloSistema": idModulo,
                "descripcionModuloSistema": nombreModulo,
                "funciones": datos["funciones"],
                "rutas": datos["rutas"]
            })
        resultado.append({
            "idPerfil": perfil_data["idPerfil"],
            "nombrePerfil": perfil_data["nombrePerfil"],
            "modulos": modulos
        })

    return resultado


def get_permiso_perfil(db: Session, id_permiso: int):
    return db.query(PermisoPerfil).filter(PermisoPerfil.idpermisoPerfil == id_permiso).first()

def create_permisos_perfil(db: Session, permisos: List[schemas.PermisoPerfilCreate]):
    if not permisos:
        return []

    id_perfil = permisos[0].idPerfil

    db.query(PermisoPerfil).filter(PermisoPerfil.idPerfil == id_perfil).delete()
    db.commit()

    resultados = []

    for permiso in permisos:
        db_permiso = PermisoPerfil(**permiso.model_dump())
        db.add(db_permiso)
        db.commit()
        db.refresh(db_permiso)
        resultados.append(db_permiso)

    return resultados

def update_permiso_perfil(db: Session, id_permiso: int, permiso: schemas.PermisoPerfilUpdate):
    db_permiso = get_permiso_perfil(db, id_permiso)
    if not db_permiso:
        return None
    for key, value in permiso.dict(exclude_unset=True).items():
        setattr(db_permiso, key, value)
    db.commit()
    db.refresh(db_permiso)
    return db_permiso

def delete_permiso_perfil(db: Session, id_perfil: int) -> bool:
    perfil = db.query(Perfil).filter(Perfil.idPerfil == id_perfil).first()

    if not perfil:
        return False

    perfil.estadoPerfil = 0
    permisos = db.query(PermisoPerfil).filter(PermisoPerfil.idPerfil == id_perfil).all()
    for permiso in permisos:
        permiso.estadoPermisoPerfil = 0

    db.commit()
    return True
