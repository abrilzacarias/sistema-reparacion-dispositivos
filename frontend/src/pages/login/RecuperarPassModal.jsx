import React, { useState } from 'react';

function RecuperarPassModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const [tipoMensaje, setTipoMensaje] = useState(null); // 'error' o 'exito'
  const [loading, setLoading] = useState(false);

  const enviarRecuperacion = async () => {
    if (!email) {
      setMensaje("Por favor, ingresa un correo válido.");
      setTipoMensaje('error');
      return;
    }
    setLoading(true);
    setMensaje(null);
    setTipoMensaje(null);

    try {
      const response = await fetch('http://localhost:8000/usuarios/recuperar-password', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMensaje("Correo de recuperación enviado. Revisa tu bandeja.");
        setTipoMensaje('exito');
      } else {
        setMensaje("Error al enviar el correo. Intenta nuevamente.");
        setTipoMensaje('error');
      }
    } catch (error) {
      setMensaje("Error de conexión. Intenta nuevamente.");
      setTipoMensaje('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Recuperar contraseña</h2>
        <input
          type="email"
          placeholder="Ingresa tu correo"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {mensaje && (
          <p 
            className={`mb-4 text-sm ${
              tipoMensaje === 'exito' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {mensaje}
          </p>
        )}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={enviarRecuperacion}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecuperarPassModal;

