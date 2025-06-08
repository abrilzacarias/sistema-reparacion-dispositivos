from datetime import timedelta

from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends, HTTPException, status, APIRouter, Request
from sqlalchemy.orm import Session

from ..auth.auth_handler import authenticate_user, ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token, get_user, get_password_hash, get_current_active_user
from ..database import get_db
from ..schemas.usuario import Token, UsuarioCreate, UserResponse, LoginResponse
from ..models.usuario import Usuario as User
from collections import defaultdict

router = APIRouter(
    prefix="/auth",
    tags=["authentication"],
)

@router.post("/register", response_model=UserResponse)
async def register_user(request: Request, user: UsuarioCreate, db: Session = Depends(get_db)):
    try:
        user_data = await request.json()
        print(f"Datos de registro recibidos: {user_data}")
        
        db_user = get_user(db, user.email)
        if db_user:
            raise HTTPException(status_code=400, detail="Email already registered.")
        
        try:
            hashed_password = get_password_hash(user.password)
        except Exception as e:
            print(f"Error al generar hash de contraseña: {str(e)}")
            raise HTTPException(status_code=500, detail="Error processing password")
        
        try:
            db_user = User(
                username=user.username, 
                email=user.email, 
                password=hashed_password
            )
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
            return db_user
        except Exception as e:
            db.rollback()
            print(f"Error al guardar usuario en la base de datos: {str(e)}")
            raise HTTPException(status_code=500, detail="Database error")
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error inesperado en registro: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/token", response_model=LoginResponse)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires
    )

    # Agrupar permisos por perfil y módulo
    permisos_dict = defaultdict(lambda: defaultdict(lambda: {
        "idModulo": None,
        "modulo": "",
        "ruta": "",
        "funciones": [],
    }))

    perfil_ids = {}

    for asignacion in user.asignacionUsuarioPermisos:
        permiso = asignacion.permisoPerfil
        perfil = permiso.perfil
        perfil_nombre = perfil.nombrePerfil
        perfil_ids[perfil_nombre] = perfil.idPerfil

        modulo_funcion = permiso.moduloFuncionSistema
        modulo = modulo_funcion.moduloSistema
        funcion = modulo_funcion.funcionSistema

        key_modulo = modulo.descripcionModuloSistema
        ruta_modulo = modulo_funcion.rutaModuloFuncionSistema

        mod_data = permisos_dict[perfil_nombre][key_modulo]
        mod_data["idModulo"] = modulo.idmoduloSistema
        mod_data["modulo"] = key_modulo
        mod_data["ruta"] = ruta_modulo

        # Solo agregamos función si no está
        if not any(f["idfuncionSistema"] == funcion.idfuncionSistema for f in mod_data["funciones"]):
            mod_data["funciones"].append({
                "idfuncionSistema": funcion.idfuncionSistema,
                "descripcionFuncionSistema": funcion.descripcionFuncionSistema
            })

    # Formar la respuesta final
    permisos_final = []
    for perfil_nombre, modulos in permisos_dict.items():
        permisos_final.append({
            "idPerfil": perfil_ids[perfil_nombre],
            "perfil": perfil_nombre,
            "modulos": list(modulos.values())
        })

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user,
        "permisos": permisos_final
    }
