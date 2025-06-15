// src/contexts/DynamicDataContext.jsx
import React, { createContext, useContext, useState } from "react";

// 1. Crear el contexto
const DynamicDataContext = createContext();

// 2. Hook personalizado para usar el contexto
export function useDynamicData() {
  return useContext(DynamicDataContext);
}

// 3. Componente proveedor
export function DynamicDataProvider({ children }) {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [tiposDispositivo, setTiposDispositivo] = useState([]);

  const value = {
    marcas,
    setMarcas,
    modelos,
    setModelos,
    tiposDispositivo,
    setTiposDispositivo,
  };

  return (
    <DynamicDataContext.Provider value={value}>
      {children}
    </DynamicDataContext.Provider>
  );
}
