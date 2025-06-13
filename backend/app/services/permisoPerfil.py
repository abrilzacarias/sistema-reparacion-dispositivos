from sqlalchemy.orm import Session, joinedload
from app.models import PermisoPerfil, ModuloFuncionSistema, Perfil, AsignacionUsuarioPermisos, Usuario
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

    # Obtener todos los usuarios que tienen asignado algún permiso de este perfil
    usuarios_con_perfil = db.query(AsignacionUsuarioPermisos.idUsuario).join(PermisoPerfil).filter(
        PermisoPerfil.idPerfil == id_perfil
    ).distinct().all()
    ids_usuarios_perfil = [u.idUsuario for u in usuarios_con_perfil]

    # Obtener permisos actuales del perfil
    permisos_actuales = db.query(PermisoPerfil).filter(PermisoPerfil.idPerfil == id_perfil).all()
    permisos_actuales_map = {p.idmoduloFuncionSistema: p for p in permisos_actuales}
    ids_actuales = set(permisos_actuales_map.keys())

    # Mapeo de nuevos permisos
    ids_nuevos = set(p.idmoduloFuncionSistema for p in permisos)

    # Identificar qué permisos eliminar y qué agregar
    ids_a_eliminar = ids_actuales - ids_nuevos
    ids_a_agregar = ids_nuevos - ids_actuales

    # Guardar asignaciones existentes antes de borrar
    usuarios_por_funcion = {}
    if ids_a_eliminar:
        permisos_a_eliminar = [permisos_actuales_map[idfunc] for idfunc in ids_a_eliminar]
        ids_permisos_a_eliminar = [p.idpermisoPerfil for p in permisos_a_eliminar]

        asignaciones = db.query(AsignacionUsuarioPermisos).filter(
            AsignacionUsuarioPermisos.idpermisoPerfil.in_(ids_permisos_a_eliminar)
        ).all()

        for a in asignaciones:
            permiso = next((p for p in permisos_a_eliminar if p.idpermisoPerfil == a.idpermisoPerfil), None)
            if permiso:
                usuarios_por_funcion.setdefault(permiso.idmoduloFuncionSistema, set()).add(a.idUsuario)

        # Eliminar asignaciones y permisos
        db.query(AsignacionUsuarioPermisos).filter(
            AsignacionUsuarioPermisos.idpermisoPerfil.in_(ids_permisos_a_eliminar)
        ).delete(synchronize_session=False)

        db.query(PermisoPerfil).filter(
            PermisoPerfil.idpermisoPerfil.in_(ids_permisos_a_eliminar)
        ).delete(synchronize_session=False)

    resultados = []

    for permiso in permisos:
        if permiso.idmoduloFuncionSistema in ids_a_agregar:
            # Verificamos que el idmoduloFuncionSistema exista
            existe = db.query(ModuloFuncionSistema).filter(
                ModuloFuncionSistema.idmoduloFuncionSistema == permiso.idmoduloFuncionSistema
            ).first()
            if not existe:
                raise ValueError(f"idmoduloFuncionSistema {permiso.idmoduloFuncionSistema} no existe")

            # Agregar nuevo permiso
            db_permiso = PermisoPerfil(
                idPerfil=permiso.idPerfil,
                idmoduloFuncionSistema=permiso.idmoduloFuncionSistema,
                estadoPermisoPerfil=permiso.estadoPermisoPerfil,
            )
            db.add(db_permiso)
            db.commit()
            db.refresh(db_permiso)
            resultados.append(db_permiso)

            # Restaurar asignaciones anteriores si las había
            usuarios_previos = usuarios_por_funcion.get(permiso.idmoduloFuncionSistema, set())
            for idusuario in usuarios_previos:
                nueva_asignacion = AsignacionUsuarioPermisos(
                    idUsuario=idusuario,
                    idpermisoPerfil=db_permiso.idpermisoPerfil
                )
                db.add(nueva_asignacion)

            # También asignar a todos los usuarios del perfil (si corresponde)
            for idusuario in ids_usuarios_perfil:
                if idusuario not in usuarios_previos:
                    nueva_asignacion = AsignacionUsuarioPermisos(
                        idUsuario=idusuario,
                        idpermisoPerfil=db_permiso.idpermisoPerfil
                    )
                    db.add(nueva_asignacion)

        else:
            # Ya existe el permiso, lo dejamos como está
            resultados.append(permisos_actuales_map[permiso.idmoduloFuncionSistema])

    db.commit()
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
