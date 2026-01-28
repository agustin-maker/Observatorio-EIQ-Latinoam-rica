import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// Nota: Las constantes y servicios deberían estar aquí o cargarse 
// con la extensión completa para que el navegador no dé error.

const App = () => {
  const [activeTab, setActiveTab] = useState('avg');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [filterCountry, setFilterCountry] = useState('all');

  // Datos de ejemplo para que la web no rompa si no encuentra los archivos externos
  const CROP_REFERENCES = [
    { id: 1, name: 'Soja', range: '40-65', unit: 'EIQ/ha', low: 30, avg: 52, high: 80, icon: '🌿', borderColor: 'border-emerald-200' },
    { id: 2, name: 'Maíz', range: '35-55', unit: 'EIQ/ha', low: 25, avg: 45, high: 70, icon: '🌽', borderColor: 'border-amber-200' },
    { id: 3, name: 'Trigo', range: '20-40', unit: 'EIQ/ha', low: 15, avg: 30, high: 50, icon: '🌾', borderColor: 'border-blue-200' },
    { id: 4, name: 'Algodón', range: '150-250', unit: 'EIQ/ha', low: 100, avg: 180, high: 300, icon: '☁️', borderColor: 'border-red-200' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-lg text-white">🌱</div>
            <h1 className="text-xl font-bold text-slate-900">Observatorio EIQ LATAM</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        <section className="text-center space-y-4">
          <h2 className="text-4xl font-extrabold text-slate-900">Valores de Referencia de Impacto Ambiental</h2>
          <p className="text-lg text-slate-600">Análisis integrado de INTA, Embrapa y redes regionales.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CROP_REFERENCES.map((crop) => (
            <div key={crop.id} className={`bg-white p-6 rounded-2xl border ${crop.borderColor} shadow-sm group`}>
              <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">{crop.name}</h4>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">{crop.range}</span>
                <span className="text-xs text-slate-500">{crop.unit}</span>
              </div>
              <div className="mt-6 space-y-2 border-t pt-4">
                <div className="flex justify-between text-xs"><span>Promedio</span><span className="font-bold text-amber-600">{crop.avg}</span></div>
              </div>
            </div>
          ))}
        </section>
        
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-blue-800 text-sm">
          <strong>Aviso técnico:</strong> La web está cargando en modo simplificado. Para ver los gráficos y la IA, 
          asegúrate de que los archivos 'constants.ts' y 'services' tengan las extensiones correctas en las importaciones.
        </div>
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
