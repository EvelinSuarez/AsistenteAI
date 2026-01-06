'use client';
import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Save } from 'lucide-react';
import { toast } from '@/lib/toast';

export default function AssistantModal({ isOpen, onClose, onSave, initialData }: any) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', language: 'Español', tone: 'Profesional',
    short: 30, medium: 50, long: 20, audioEnabled: false
  });

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || { name: '', language: 'Español', tone: 'Profesional', short: 30, medium: 50, long: 20, audioEnabled: false });
      setStep(1);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0B0F1A]/40 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden">
        
        {/* Progreso en color Rosa Funnelhot */}
        <div className="h-1.5 w-full bg-slate-100">
          <div className="h-full bg-[#E63056] transition-all duration-500" style={{ width: `${(step / 2) * 100}%` }} />
        </div>

        <div className="p-10">
          <header className="flex justify-between items-start mb-8">
            <div>
              <p className="text-[#E63056] font-black text-[10px] uppercase tracking-[0.2em] mb-1">Paso {step} de 2</p>
              <h2 className="text-2xl font-black text-[#0B0F1A]">
                {step === 1 ? 'Configuración' : 'Respuestas'}
              </h2>
            </div>
            <button onClick={onClose} className="hover:bg-slate-100 p-2 rounded-full transition-colors text-slate-400">
              <X size={20} />
            </button>
          </header>

          {step === 1 ? (
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Nombre del Asistente</label>
                <input 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 focus:bg-white focus:ring-4 focus:ring-rose-500/10 focus:border-[#E63056] outline-none transition-all text-slate-800 font-medium"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ej. Mi Asistente IA" 
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Idioma</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 outline-none focus:border-[#E63056] text-sm font-bold text-slate-700 appearance-none"
                    value={formData.language}
                    onChange={(e) => setFormData({...formData, language: e.target.value})}
                    required
                  >
                    <option>Español</option><option>Inglés</option><option>Portugues</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Tono</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 outline-none focus:border-[#E63056] text-sm font-bold text-slate-700 appearance-none"
                    value={formData.tone}
                    onChange={(e) => setFormData({...formData, tone: e.target.value})}
                    required
                  >
                    <option>Profesional</option><option>Amigable</option><option>Persuasivo</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3">
                {['short', 'medium', 'long'].map((key) => (
                  <div key={key} className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 text-center block tracking-tighter">{key}</label>
                    <input 
                      type="number"
                      className="w-full bg-slate-50 rounded-2xl py-3 text-center font-black text-[#0B0F1A] border border-slate-100 focus:border-[#E63056] outline-none transition-all"
                      value={formData[key as 'short'|'medium'|'long']}
                      onChange={(e) => setFormData({...formData, [key]: Number(e.target.value)})}
                    />
                  </div>
                ))}
              </div>
              <label className="flex items-center gap-4 p-5 bg-rose-50/50 rounded-[1.5rem] cursor-pointer border border-rose-100 transition-all hover:bg-rose-50">
                <input 
                  type="checkbox" className="w-5 h-5 rounded-lg accent-[#E63056]"
                  checked={formData.audioEnabled}
                  onChange={(e) => setFormData({...formData, audioEnabled: e.target.checked})}
                />
                <span className="text-sm font-bold text-[#E63056]">Activar Respuestas de Voz</span>
              </label>
            </div>
          )}

          <div className="mt-10 flex gap-4">
            {step === 2 && (
              <button onClick={() => setStep(1)} className="px-2 py-3 font-bold text-slate-400 hover:text-[#0B0F1A] transition-colors">
                <ChevronLeft size={24} />
              </button>
            )}
            <button 
              onClick={() => {
                // Validación básica antes de avanzar al paso 2
                if (step === 1) {
                  if (!formData.name || !formData.name.trim()) {
                    toast('Completa el nombre del asistente', 'error');
                    return;
                  }
                  setStep(2);
                  return;
                }

                // Validación antes de guardar
                if (formData.short <= 0 || formData.medium <= 0 || formData.long <= 0) {
                  toast('Los valores de respuesta deben ser mayores que 0', 'error');
                  return;
                }

                onSave(formData);
              }}
              className="flex-1 bg-[#0B0F1A] text-white py-4 rounded-2xl font-bold text-sm hover:bg-[#E63056] transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200"
            >
              {step === 1 ? <>Siguiente <ChevronRight size={18} /></> : <>Finalizar y Guardar <Save size={18} /></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}