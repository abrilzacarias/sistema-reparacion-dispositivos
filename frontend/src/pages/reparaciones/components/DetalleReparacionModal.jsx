import { useEffect, useState } from "react";
import axios from "axios";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/datatable/DataTable";
import DetalleReparacionCreateEdit from "./DetalleReparacionCreateEdit";

const API_URL = import.meta.env.VITE_API_URL;

const getColumnsDetalleReparacion = () => [
  {
    header: "Descripción",
    accessorKey: "descripcion",
    size: 150,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="max-w-[130px] truncate font-medium" title={value}>
          {value || "Sin descripción"}
        </div>
      );
    },
  },
  {
    header: "M. Obra",
    accessorKey: "manoObra",
    size: 70,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="text-right text-sm">
          {value ? `$${Number(value).toLocaleString()}` : "$0"}
        </div>
      );
    },
  },
  {
    header: "Repuesto",
    accessorKey: "precioRepuesto",
    size: 70,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="text-right text-sm">
          {value ? `$${Number(value).toLocaleString()}` : "$0"}
        </div>
      );
    },
  },
  {
    header: "Total",
    accessorKey: "montoTotalDetalleReparacion",
    size: 80,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="text-right font-semibold text-sm">
          {value ? `$${Number(value).toLocaleString()}` : "$0"}
        </div>
      );
    },
  },
  {
    header: "Repuesto",
    accessorFn: (row) => row.repuesto?.nombreRepuesto || "Sin repuesto",
    id: "repuesto",
    size: 90,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="max-w-[80px] truncate text-sm" title={value}>
          {value}
        </div>
      );
    },
  },
  {
    header: "Tipo",
    accessorFn: (row) => row.tipoReparacion?.descripcionTipoReparacion || "Sin tipo",
    id: "tipoReparacion",
    size: 80,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="max-w-[70px] truncate text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded" title={value}>
          {value}
        </div>
      );
    },
  },
];

const DetalleReparacionModal = ({ idReparacion }) => {
  const [detalles, setDetalles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDetalles = async () => {
    if (!idReparacion) return;

    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/detalleReparacion/reparacion/${idReparacion}`);

      let dataToSet = [];

      if (res.data && Array.isArray(res.data)) {
        dataToSet = res.data;
      } else if (res.data?.items && Array.isArray(res.data.items)) {
        dataToSet = res.data.items;
      } else if (res.data?.data && Array.isArray(res.data.data)) {
        dataToSet = res.data.data;
      } else if (res.data && typeof res.data === "object") {
        dataToSet = [res.data];
      } else {
        console.error("❌ Estructura de datos incorrecta:", res.data);
        dataToSet = [];
      }

      setDetalles(dataToSet);
    } catch (error) {
      console.error("❌ Error obteniendo detalles de reparación:", error);
      setDetalles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetalles();
  }, [idReparacion]);

  const totalManoObra = detalles.reduce((sum, item) => sum + (Number(item.manoObra) || 0), 0);
  const totalRepuestos = detalles.reduce((sum, item) => sum + (Number(item.precioRepuesto) || 0), 0);
  const totalGeneral = detalles.reduce((sum, item) => sum + (Number(item.montoTotalDetalleReparacion) || 0), 0);

  return (
    <div className="w-full max-w-[1200px] mx-auto h-full max-h-[70vh] overflow-y-auto space-y-3">
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm pb-2 border-b z-10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-base">Detalles de Reparación</h3>
            <p className="text-xs text-muted-foreground">
              {detalles.length} {detalles.length === 1 ? "detalle" : "detalles"}
            </p>
          </div>
          {/* Usar ModalFormTemplate como está diseñado */}
          <ModalFormTemplate
            label="+ Agregar Detalle"
            title="Agregar Detalle de Reparación"
            description="Complete los campos para agregar un nuevo detalle."
            variant="default"
            className="text-sm"
          >
            <DetalleReparacionCreateEdit
              idReparacion={idReparacion}
              refreshDetalles={fetchDetalles}
            />
          </ModalFormTemplate>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-center space-y-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
            <p className="text-xs text-muted-foreground">Cargando...</p>
          </div>
        </div>
      ) : detalles.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-muted-foreground space-y-1">
            <p className="text-sm">📋 No hay detalles</p>
          </div>
        </div>
      ) : (
        <>
          <Card className="shadow-sm">
            <CardContent className="p-1">
              <div className="max-h-[300px] overflow-y-auto">
                <DataTable
                  data={detalles}
                  columns={getColumnsDetalleReparacion()}
                  isLoading={loading}
                  totalUsers={detalles.length}
                  placeholder="Buscar..."
                  refetch={fetchDetalles}
                  tapValue={idReparacion}
                  searchTarget="descripcion"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardContent className="p-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">M. Obra</p>
                  <p className="font-semibold text-sm text-blue-600">
                    ${totalManoObra.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Repuestos</p>
                  <p className="font-semibold text-sm text-orange-600">
                    ${totalRepuestos.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="font-bold text-sm text-green-600">
                    ${totalGeneral.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default DetalleReparacionModal;

