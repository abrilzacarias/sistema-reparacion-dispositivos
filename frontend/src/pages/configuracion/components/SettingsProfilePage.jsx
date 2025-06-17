import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Save, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function SettingsProfilePage() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [empleadoData, setEmpleadoData] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    domicilios: []
  });

  // Obtener datos del empleado logueado
  useEffect(() => {
    const fetchEmpleadoData = async () => {
      if (!user?.idUsuario) return;
      
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/empleados`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // Buscar el empleado que corresponde al usuario logueado
        const empleado = response.data.items.find(emp => emp.idUsuario === user.idUsuario);
        
        if (empleado) {
          setEmpleadoData(empleado);
          setFormData({
            nombre: empleado.persona.nombre,
            apellido: empleado.persona.apellido,
            domicilios: empleado.persona.domicilios || []
          });
        }
      } catch (error) {
        console.error('Error al obtener datos del empleado:', error);
        toast.error("No se pudieron cargar los datos del empleado");
      } finally {
        setLoading(false);
      }
    };

    fetchEmpleadoData();
  }, [user]);

  // Manejar cambios en campos de texto
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Manejar cambios en domicilios
  const handleDomicilioChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      domicilios: prev.domicilios.map((dom, i) => 
        i === index ? { ...dom, [field]: value } : dom
      )
    }));
  };

  // Guardar cambios
  const handleSave = async () => {
    if (!empleadoData) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      // Preparar datos de domicilios con la estructura correcta
      const domiciliosFormatted = formData.domicilios.map(domicilio => {
        // Si el domicilio ya tiene ID, mantenerlo para actualización
        const baseDomicilio = {
          codigoPostal: domicilio.codigoPostal || '',
          pais: domicilio.pais || 'Argentina',
          provincia: domicilio.provincia || '',
          ciudad: domicilio.ciudad || '',
          barrio: domicilio.barrio || '',
          calle: domicilio.calle || '',
          numero: domicilio.numero || '',
          departamento: domicilio.departamento || '',
          idtipoDomicilio: domicilio.idtipoDomicilio || 2,
          idPersona: empleadoData.idPersona
        };

        // Si tiene ID, es una actualización
        if (domicilio.idDomicilio) {
          baseDomicilio.idDomicilio = domicilio.idDomicilio;
        }

        return baseDomicilio;
      });

      // Actualizar datos de persona
      const updateData = {
        idPersona: empleadoData.idPersona,
        estadoPersona: empleadoData.persona.estadoPersona,
        cuit: empleadoData.persona.cuit,
        fechaNacimiento: empleadoData.persona.fechaNacimiento,
        nombre: formData.nombre,
        apellido: formData.apellido,
        domicilios: domiciliosFormatted,
        contactos: empleadoData.persona.contactos || []
      };

      console.log('Datos a enviar:', updateData); // Para debug

      await axios.put(`${API_URL}/personas/${empleadoData.idPersona}`, updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      toast.success("Los datos han sido actualizados correctamente");

    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      console.error('Response data:', error.response?.data); // Para debug
      
      let errorMessage = "No se pudieron actualizar los datos";
      if (error.response?.data?.detail) {
        if (Array.isArray(error.response.data.detail)) {
          errorMessage = error.response.data.detail.map(err => err.msg).join(', ');
        } else {
          errorMessage = error.response.data.detail;
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !empleadoData) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!empleadoData) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No se encontraron datos del empleado</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Información Personal */}
      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
          <CardDescription>
            Actualiza tu información personal básica
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                placeholder="Ingresa tu nombre"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                id="apellido"
                value={formData.apellido}
                onChange={(e) => handleInputChange('apellido', e.target.value)}
                placeholder="Ingresa tu apellido"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Domicilios */}
      <Card>
        <CardHeader>
          <CardTitle>Domicilio</CardTitle>
          <CardDescription>
            Actualiza tu información de domicilio
          </CardDescription>
        </CardHeader>
        <CardContent>
          {formData.domicilios.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No tienes domicilios registrados
            </p>
          ) : (
            <div className="space-y-6">
              {formData.domicilios.map((domicilio, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center">
                    <h4 className="font-medium">
                      Domicilio - {domicilio.tipoDomicilio?.descripciontipoDomicilio || 'Personal'}
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Tipo de Domicilio</Label>
                      <Select
                        value={domicilio.idtipoDomicilio?.toString() || '2'}
                        onValueChange={(value) => {
                          const tipoDomicilio = value === '1' ? 
                            { descripciontipoDomicilio: 'Laboral', idtipoDomicilio: 1 } :
                            { descripciontipoDomicilio: 'Personal', idtipoDomicilio: 2 };
                          
                          handleDomicilioChange(index, 'idtipoDomicilio', parseInt(value));
                          handleDomicilioChange(index, 'tipoDomicilio', tipoDomicilio);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Laboral</SelectItem>
                          <SelectItem value="2">Personal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Calle</Label>
                      <Input
                        value={domicilio.calle || ''}
                        onChange={(e) => handleDomicilioChange(index, 'calle', e.target.value)}
                        placeholder="Nombre de la calle"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Número</Label>
                      <Input
                        value={domicilio.numero || ''}
                        onChange={(e) => handleDomicilioChange(index, 'numero', e.target.value)}
                        placeholder="Número"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Barrio</Label>
                      <Input
                        value={domicilio.barrio || ''}
                        onChange={(e) => handleDomicilioChange(index, 'barrio', e.target.value)}
                        placeholder="Barrio"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Ciudad</Label>
                      <Input
                        value={domicilio.ciudad || ''}
                        onChange={(e) => handleDomicilioChange(index, 'ciudad', e.target.value)}
                        placeholder="Ciudad"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Provincia</Label>
                      <Input
                        value={domicilio.provincia || ''}
                        onChange={(e) => handleDomicilioChange(index, 'provincia', e.target.value)}
                        placeholder="Provincia"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Código Postal</Label>
                      <Input
                        value={domicilio.codigoPostal || ''}
                        onChange={(e) => handleDomicilioChange(index, 'codigoPostal', e.target.value)}
                        placeholder="Código Postal"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>País</Label>
                      <Input
                        value={domicilio.pais || 'Argentina'}
                        onChange={(e) => handleDomicilioChange(index, 'pais', e.target.value)}
                        placeholder="País"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Departamento</Label>
                      <Input
                        value={domicilio.departamento || ''}
                        onChange={(e) => handleDomicilioChange(index, 'departamento', e.target.value)}
                        placeholder="Departamento"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Botón de Guardar */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </>
          )}
        </Button>
      </div>
    </div>
  );
}