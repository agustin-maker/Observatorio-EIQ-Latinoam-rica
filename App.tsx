
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { 
  CROP_REFERENCES, 
  STUDIES_DATA, 
  COMPARISON_CHART_DATA, 
  TREND_CHART_DATA 
} from './constants';
import { getAIInsights, searchGroundingLatestReports } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'avg' | 'max'>('avg');
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [filterCountry, setFilterCountry] = useState('all');
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [groundingData, setGroundingData] = useState<any>(null);

  const filteredStudies = filterCountry === 'all' 
    ? STUDIES_DATA 
    : STUDIES_DATA.filter(s => s.country === filterCountry);

  const handleCropClick = async (cropName: string) => {
    setSelectedCrop(cropName);
    setLoadingInsight(true);
    const insight = await getAIInsights(cropName);
    setAiInsight(insight);
    setLoadingInsight(false);
  };

  const handleSearchGrounding = async () => {
    setLoadingInsight(true);
    const data = await searchGroundingLatestReports("Environmental Impact Quotient pesticides Latin America 2024");
    setGroundingData(data);
    setLoadingInsight(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-lg text-white">
              <span className="text-xl">🌱</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Observatorio EIQ LATAM</h1>
              <p className="text-xs text-slate-500 hidden sm:block">Environmental Impact Quotient en Cultivos Extensivos</p>
            </div>
          </div>
          <nav className="flex gap-6 text-sm font-medium text-slate-600">
            <button onClick={() => document.getElementById('dashboard')?.scrollIntoView({behavior:'smooth'})} className="hover:text-emerald-600 transition-colors">Tablero</button>
            <button onClick={() => document.getElementById('studies')?.scrollIntoView({behavior:'smooth'})} className="hover:text-emerald-600 transition-colors">Fuentes</button>
            <button onClick={() => document.getElementById('methodology')?.scrollIntoView({behavior:'smooth'})} className="hover:text-emerald-600 transition-colors">Metodología</button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Valores de Referencia de Impacto Ambiental</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Un análisis científico integrado de estudios regionales de <strong>INTA (Arg)</strong>, <strong>Embrapa (Bra)</strong>, y redes de universidades. 
            Mida la carga toxicológica por hectárea en sistemas productivos de Sudamérica.
          </p>
          <button 
            onClick={handleSearchGrounding}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            {loadingInsight ? 'Consultando IA...' : '🔍 Buscar Reportes Actualizados 2024'}
          </button>
        </section>

        {/* KPI Cards */}
        <section id="dashboard" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              📊 Rangos de Referencia (EIQ/ha)
            </h3>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
              ACTUALIZADO 2024
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CROP_REFERENCES.map((crop) => (
              <div 
                key={crop.id}
                onClick={() => handleCropClick(crop.name)}
                className={`bg-white p-6 rounded-2xl border ${crop.borderColor} shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden`}
              >
                <div className="absolute top-2 right-2 text-4xl opacity-10 group-hover:opacity-20 transition-opacity">
                  {crop.icon}
                </div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{crop.name}</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">{crop.range}</span>
                  <span className="text-xs text-slate-500 font-semibold">{crop.unit}</span>
                </div>
                <div className="mt-6 space-y-2 border-t border-slate-50 pt-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Bajo (MIP)</span>
                    <span className="font-bold text-emerald-600">&lt; {crop.low}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Promedio</span>
                    <span className="font-bold text-amber-600">{crop.avg}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Alto (Resistencia)</span>
                    <span className="font-bold text-red-600">&gt; {crop.high}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Insight Box (Conditional) */}
        {(loadingInsight || aiInsight || groundingData) && (
          <section className="bg-emerald-900 text-emerald-50 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <span className="text-9xl">✨</span>
            </div>
            <div className="relative z-10 space-y-4">
              <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-sm">Gemini AI Insights</h4>
              {loadingInsight ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-emerald-800 rounded w-3/4"></div>
                  <div className="h-4 bg-emerald-800 rounded w-1/2"></div>
                </div>
              ) : (
                <>
                  <p className="text-lg font-medium leading-relaxed italic">
                    "{aiInsight || groundingData?.text || 'Analizando tendencias regionales...'}"
                  </p>
                  {groundingData?.links && (
                    <div className="pt-4 border-t border-emerald-800">
                      <p className="text-xs font-bold mb-2">FUENTES ENCONTRADAS:</p>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {groundingData.links.map((link: any, idx: number) => (
                          <li key={idx}>
                            <a 
                              href={link.web?.uri} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                            >
                              🔗 {link.web?.title || 'Reporte Externo'}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        )}

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Comparison Bar Chart */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Comparativa Regional y Variabilidad</h3>
                  <p className="text-xs text-slate-500 mt-1">Comparación de EIQ de campo por tipo de cultivo</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button 
                    onClick={() => setActiveTab('avg')}
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === 'avg' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500'}`}
                  >
                    Promedios
                  </button>
                  <button 
                    onClick={() => setActiveTab('max')}
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === 'max' ? 'bg-white shadow-sm text-red-600' : 'text-slate-500'}`}
                  >
                    Máximos
                  </button>
                </div>
              </div>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={COMPARISON_CHART_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                    />
                    <Bar 
                      dataKey={activeTab} 
                      radius={[4, 4, 0, 0]} 
                      barSize={45}
                    >
                      {COMPARISON_CHART_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={activeTab === 'avg' ? '#10b981' : '#ef4444'} fillOpacity={0.8} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Trends Line Chart */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Evolución Histórica de EIQ</h3>
              <p className="text-sm text-slate-600 mb-8">
                El incremento sostenido se correlaciona con la aparición de malezas resistentes (Amaranthus, Conyza).
              </p>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={TREND_CHART_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                    />
                    <Legend iconType="circle" wrapperStyle={{paddingTop: '20px', fontSize: '12px'}} />
                    <Line type="monotone" dataKey="Argentina" stroke="#10b981" strokeWidth={3} dot={{r: 4, strokeWidth: 2, fill: '#fff'}} />
                    <Line type="monotone" dataKey="Brasil" stroke="#059669" strokeWidth={3} strokeDasharray="5 5" dot={{r: 4, strokeWidth: 2, fill: '#fff'}} />
                    <Line type="monotone" dataKey="Region" stroke="#eab308" strokeWidth={3} dot={{r: 4, strokeWidth: 2, fill: '#fff'}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-full">
              <h3 className="text-xl font-bold text-slate-900 mb-6">🔍 Hallazgos Clave</h3>
              
              <div className="space-y-6">
                <div className="p-5 bg-emerald-50 rounded-xl border-l-4 border-emerald-500">
                  <h4 className="font-bold text-emerald-900 text-sm">El "Costo" de la Resistencia</h4>
                  <p className="text-sm text-emerald-800 mt-2 leading-relaxed">
                    En Argentina y Brasil, el EIQ promedio en Soja aumentó un <strong>35-50%</strong> en la última década debido al control de <em>Amaranthus palmeri</em>.
                  </p>
                </div>

                <div className="p-5 bg-amber-50 rounded-xl border-l-4 border-amber-500">
                  <h4 className="font-bold text-amber-900 text-sm">Algodón: Carga Crítica</h4>
                  <p className="text-sm text-amber-800 mt-2 leading-relaxed">
                    El picudo algodonero obliga a múltiples aplicaciones de insecticidas, superando a menudo los <strong>200 EIQ/ha</strong>.
                  </p>
                </div>

                <div className="p-5 bg-slate-50 rounded-xl border-l-4 border-slate-400">
                  <h4 className="font-bold text-slate-900 text-sm">Barbecho Químico</h4>
                  <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                    Entre el <strong>40% y 60%</strong> del EIQ total de un cultivo de verano se genera antes de la siembra.
                  </p>
                </div>

                <div className="mt-8">
                  <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-widest">Distribución del Impacto</h4>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-blue-600">
                        <span>ECOLÓGICO</span>
                        <span>55%</span>
                      </div>
                      <div className="h-2 w-full bg-blue-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[55%]"></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-orange-600">
                        <span>TRABAJADOR</span>
                        <span>30%</span>
                      </div>
                      <div className="h-2 w-full bg-orange-100 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-[30%]"></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-green-600">
                        <span>CONSUMIDOR</span>
                        <span>15%</span>
                      </div>
                      <div className="h-2 w-full bg-green-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[15%]"></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 italic mt-4 text-center">
                    Distribución promedio según modelo Cornell EIQ.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Study Table Section */}
        <section id="studies" className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">📚 Compendio de Estudios</h3>
              <p className="text-sm text-slate-500 mt-1">Base de datos sintetizada de investigaciones del Cono Sur.</p>
            </div>
            <select 
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-3 min-w-[200px]"
            >
              <option value="all">🌎 Todos los Países</option>
              <option value="Argentina">🇦🇷 Argentina</option>
              <option value="Brasil">🇧🇷 Brasil</option>
              <option value="Uruguay">🇺🇾 Uruguay</option>
              <option value="Paraguay">🇵🇾 Paraguay</option>
            </select>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-500">
              <thead className="text-[11px] text-slate-400 uppercase tracking-widest font-black bg-slate-50 border-b border-slate-100">
                <tr>
                  <th scope="col" className="px-8 py-4">Institución / Título</th>
                  <th scope="col" className="px-8 py-4">País</th>
                  <th scope="col" className="px-8 py-4">Cultivo</th>
                  <th scope="col" className="px-8 py-4 text-center">EIQ/ha</th>
                  <th scope="col" className="px-8 py-4">Observaciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredStudies.map((study, idx) => (
                  <tr key={idx} className="bg-white hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900">{study.institution}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{study.title} ({study.year})</div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <span className="text-slate-600 font-medium">{study.country}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-1 rounded-md uppercase">
                        {study.crop}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="font-black text-slate-900 text-base">{study.eiq}</span>
                    </td>
                    <td className="px-8 py-6 max-w-xs text-xs text-slate-500">
                      {study.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Methodology Footer */}
        <section id="methodology" className="bg-slate-900 text-slate-400 rounded-3xl p-12 mb-12 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h4 className="text-white text-2xl font-bold">¿Qué es el EIQ?</h4>
              <p className="text-slate-400 leading-relaxed">
                Desarrollado por la <strong>Universidad de Cornell</strong> (Kovach et al., 1992), el Environmental Impact Quotient es un modelo que condensa datos toxicológicos en un solo número para comparar estrategias de manejo de plagas.
              </p>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-bold">1</div>
                  <span className="text-sm">Trabajador Agrícola (Toxicidad aguda)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-bold">2</div>
                  <span className="text-sm">Consumidor (Lixiviación y residuos)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-bold">3</div>
                  <span className="text-sm">Ecológico (Fauna benéfica y acuática)</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-white text-2xl font-bold">Metodología del Reporte</h4>
              <p className="text-slate-400 leading-relaxed">
                Esta herramienta sintetiza datos públicos de informes técnicos de instituciones oficiales y redes de monitoreo regionales. Los valores son referenciales para escala de campo.
              </p>
              <p className="text-xs text-slate-500 italic p-4 bg-slate-800/50 rounded-xl border border-slate-800">
                NOTA: El impacto real depende de la dosis exacta, condiciones climáticas al momento de la aplicación y tecnología utilizada (deriva, boquillas, humedad).
              </p>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-800 text-center text-[10px] uppercase tracking-widest font-bold">
            © 2024 Observatorio EIQ Latinoamericano • Desarrollado para el análisis de sustentabilidad agrícola
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
