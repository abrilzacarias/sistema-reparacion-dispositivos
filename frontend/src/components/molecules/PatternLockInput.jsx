// PatternLockInput.jsx - Versión de respaldo
import { useState } from 'react';

const PatternLockInput = ({ value = '', onChange }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedDots, setSelectedDots] = useState([]);

  // Crear una grilla 3x3 de puntos
  const dots = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    x: (i % 3) * 60 + 30,
    y: Math.floor(i / 3) * 60 + 30,
    selected: false
  }));

  const handleDotClick = (dotId) => {
    if (selectedDots.includes(dotId)) return;
    
    const newSelectedDots = [...selectedDots, dotId];
    setSelectedDots(newSelectedDots);
    onChange(newSelectedDots.join('-'));
  };

  const handleMouseDown = (dotId) => {
    setIsDrawing(true);
    handleDotClick(dotId);
  };

  const handleMouseEnter = (dotId) => {
    if (isDrawing && !selectedDots.includes(dotId)) {
      handleDotClick(dotId);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const clearPattern = () => {
    setSelectedDots([]);
    onChange('');
  };

  // Convertir el value string de vuelta a array si existe
  const currentPattern = value ? value.split('-').map(Number).filter(n => !isNaN(n)) : [];
  
  // Sincronizar el estado interno con el value externo
  if (JSON.stringify(currentPattern) !== JSON.stringify(selectedDots)) {
    setSelectedDots(currentPattern);
  }

  return (
    <div className="pattern-lock-container">
      <div className="border rounded-lg p-4 bg-gray-50">
        <svg
          width={200}
          height={200}
          style={{ 
            display: 'block', 
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            cursor: 'crosshair'
          }}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Líneas entre puntos seleccionados */}
          {selectedDots.map((dotId, index) => {
            if (index === selectedDots.length - 1) return null;
            const currentDot = dots[dotId];
            const nextDot = dots[selectedDots[index + 1]];
            return (
              <line
                key={`line-${index}`}
                x1={currentDot.x}
                y1={currentDot.y}
                x2={nextDot.x}
                y2={nextDot.y}
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
              />
            );
          })}
          
          {/* Puntos de la grilla */}
          {dots.map((dot) => (
            <circle
              key={dot.id}
              cx={dot.x}
              cy={dot.y}
              r="12"
              fill={selectedDots.includes(dot.id) ? '#3b82f6' : '#d1d5db'}
              stroke={selectedDots.includes(dot.id) ? '#1e40af' : '#9ca3af'}
              strokeWidth="2"
              style={{ cursor: 'pointer' }}
              onMouseDown={() => handleMouseDown(dot.id)}
              onMouseEnter={() => handleMouseEnter(dot.id)}
            />
          ))}
          
          {/* Números en los puntos seleccionados */}
          {selectedDots.map((dotId, index) => {
            const dot = dots[dotId];
            return (
              <text
                key={`number-${dotId}`}
                x={dot.x}
                y={dot.y + 4}
                textAnchor="middle"
                fontSize="10"
                fill="white"
                fontWeight="bold"
              >
                {index + 1}
              </text>
            );
          })}
        </svg>
      </div>
      
      {value && (
        <div className="mt-2 text-center text-sm text-gray-600">
          <span className="font-medium">Patrón:</span>{' '}
          <code className="bg-gray-100 px-2 py-1 rounded text-xs">
            {value}
          </code>
        </div>
      )}
      
      <div className="mt-2 text-center text-xs text-gray-500">
        Haz clic y arrastra para conectar los puntos
      </div>
      
      {value && (
        <button
          type="button"
          onClick={clearPattern}
          className="mt-2 mx-auto block text-xs text-blue-600 hover:text-blue-800 underline"
        >
          Limpiar patrón
        </button>
      )}
    </div>
  );
};

export default PatternLockInput;