import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonaCreateEdit from "@/components/organisms/PersonaCreateEdit";
import ClienteCreateEdit from "./ClienteCreateEdit";

const EditarClienteConTabs = ({ cliente, refreshClientes }) => {
  const [activeTab, setActiveTab] = useState("persona");
  const [selectedPersona, setSelectedPersona] = useState(null);

  // Cargar los datos de la persona asociada al cliente
  useEffect(() => {
    if (cliente?.persona) {
      setSelectedPersona(cliente.persona);
    }
  }, [cliente]);

  return (
    <div className="mt-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger 
            value="persona" 
            className="w-1/2 rounded-md rounded-r-none"
          >
            Datos de Persona
          </TabsTrigger>
          <TabsTrigger 
            value="cliente" 
            className="w-1/2 rounded-md rounded-l-none"
          >
            Datos de Cliente
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="persona">
          <PersonaCreateEdit
            key={selectedPersona?.idPersona || "edit"}
            persona={selectedPersona}
            setSelectedPersona={setSelectedPersona}
            setActiveTab={setActiveTab}
            // No necesitamos refreshPersonas ni setPersonaId para edición
          />
        </TabsContent>
        
        <TabsContent value="cliente">
          <ClienteCreateEdit
            cliente={cliente}
            refreshClientes={refreshClientes}
            personaId={cliente?.idPersona}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditarClienteConTabs;