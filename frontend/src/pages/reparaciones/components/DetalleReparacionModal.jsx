import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import { DataTable } from "@/components/datatable/DataTable";
import DetalleReparacionCreateEdit from "./DetalleReparacionCreateEdit";
import { getColumnsDetalleReparacion } from "./columns/getColumnsDetalleReparacion";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";

const DetalleReparacionModal = ({ idReparacion }) => {
  const {
    data: detalles,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    total,
    isFetching,
  } = usePaginatedQuery({
    key: ["detalles-reparacion", idReparacion],
    endpoint: `detalleReparacion/reparacion/${idReparacion}`,
    pageSize: 50,
  });

  // Calcular totales con useMemo para optimizar
  const { totalManoObra, totalRepuestos, totalGeneral } = useMemo(() => {
    if (!detalles || detalles.length === 0)
      return { totalManoObra: 0, totalRepuestos: 0, totalGeneral: 0 };

    return detalles.reduce(
      (acc, item) => {
        acc.totalManoObra += Number(item.manoObra) || 0;
        acc.totalRepuestos += Number(item.precioRepuesto) || 0;
        acc.totalGeneral += Number(item.montoTotalDetalleReparacion) || 0;
        return acc;
      },
      { totalManoObra: 0, totalRepuestos: 0, totalGeneral: 0 }
    );
  }, [detalles]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="font-bold mb-2">Detalles de la reparación</h3>
        <ModalFormTemplate
          title="Agregar Detalle de Reparación"
          description="Complete los campos para agregar un nuevo detalle."
          label="Agregar detalle"
          variant="default"
          className="cursor-pointer justify-start"
          
        >
          <DetalleReparacionCreateEdit
            idReparacion={idReparacion}
            refreshDetalles={refetch}
          />
        </ModalFormTemplate>
      </div>

      {isError && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md text-red-700 dark:text-red-300 text-sm">
          Error al cargar los detalles de reparación.
        </div>
      )}

      <Card className="mt-4 border-none bg-secondary dark:bg-background">
        <CardContent
          className="p-0"
          style={{ maxHeight: 400, overflowY: "auto" }}
        >
          <DataTable
            data={detalles ?? []}
            columns={getColumnsDetalleReparacion({ refetch })}
            refetch={refetch}
            isLoading={isLoading}
            isFetching={isFetching}
            totalUsers={total}
            showPagination={hasNextPage}
            onLoadMore={hasNextPage ? fetchNextPage : undefined}
            searchTarget="descripcion"
          />
        </CardContent>
      </Card>

      <Card className="bg-muted/30 mt-4">
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
    </div>
  );
};

export default DetalleReparacionModal;




