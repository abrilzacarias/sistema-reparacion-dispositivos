import { useAuthStore } from "@/stores/authStore";

export const combinarPermisos = (perfiles) => {
  const modulosMap = {};

  perfiles.forEach((perfil) => {
    perfil.modulos.forEach((modulo) => {
      const nombreModulo = modulo.descripcionModuloSistema;

      if (!modulosMap[nombreModulo]) {
        modulosMap[nombreModulo] = {
          descripcionModulo: nombreModulo,
          funciones: [],
        };
      }

      modulo.funciones.forEach((func) => {
        const yaExiste = modulosMap[nombreModulo].funciones.some(
          (f) => f.descripcionFuncion === func.descripcionFuncionSistema
        );
        if (!yaExiste) {
          modulosMap[nombreModulo].funciones.push({
            descripcionFuncion: func.descripcionFuncionSistema,
          });
        }
      });
    });
  });

  return Object.values(modulosMap);
};

export const tienePermiso = (modulo, funcion) => {
  const permisos = useAuthStore.getState().permisos;

  const moduloEncontrado = permisos.find(p => p.descripcionModulo === modulo);
  if (!moduloEncontrado) return false;

  return moduloEncontrado.funciones.some(f => f.descripcionFuncion === funcion);
};
