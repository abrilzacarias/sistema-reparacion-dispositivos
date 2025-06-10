from sqlalchemy.orm import Session, joinedload
from app.models.permisoPerfil import PermisoPerfil
from app.models.moduloFuncionSistema import ModuloFuncionSistema
from app.schemas import permisoPerfil as schemas
from collections import defaultdict

def get_permisos_perfil(db: Session):
    permisos = db.query(PermisoPerfil).options(
        joinedload(PermisoPerfil.moduloFuncionSistema)
        .joinedload(ModuloFuncionSistema.moduloSistema),
        joinedload(PermisoPerfil.moduloFuncionSistema)
        .joinedload(ModuloFuncionSistema.funcionSistema),
        joinedload(PermisoPerfil.perfil)
    ).filter(PermisoPerfil.estadoPermisoPerfil == 1).all()

    agrupado = {}

    for permiso in permisos:
        perfil = permiso.perfil
        mod_func = permiso.moduloFuncionSistema
        modulo = mod_func.moduloSistema
        funcion = mod_func.funcionSistema
        ruta = mod_func.rutaModuloFuncionSistema

        if perfil.idPerfil not in agrupado:
            agrupado[perfil.idPerfil] = {
                "idPerfil": perfil.idPerfil,
                "nombrePerfil": perfil.nombrePerfil,
                "modulos": defaultdict(lambda: {"funciones": [], "rutas": []})
            }

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

    # Armar resultado final
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

def create_permiso_perfil(db: Session, permiso: schemas.PermisoPerfilCreate):
    db_permiso = PermisoPerfil(**permiso.model_dump())  # Pydantic v2
    
    db.add(db_permiso)
    db.commit()
    db.refresh(db_permiso)
    
    db_permiso_with_relations = db.query(PermisoPerfil).options(
        joinedload(PermisoPerfil.perfil),
        joinedload(PermisoPerfil.moduloFuncionSistema)
    ).filter(PermisoPerfil.idpermisoPerfil == db_permiso.idpermisoPerfil).first()
    
    return db_permiso_with_relations

def update_permiso_perfil(db: Session, id_permiso: int, permiso: schemas.PermisoPerfilUpdate):
    db_permiso = get_permiso_perfil(db, id_permiso)
    if not db_permiso:
        return None
    for key, value in permiso.dict(exclude_unset=True).items():
        setattr(db_permiso, key, value)
    db.commit()
    db.refresh(db_permiso)
    return db_permiso

def delete_permiso_perfil(db: Session, id_permiso: int):
    permiso = db.query(PermisoPerfil).filter(PermisoPerfil.idpermisoPerfil == id_permiso).first()
    if permiso:
        permiso.estadoPermisoPerfil = 0
        db.commit()
        return True
    return False
