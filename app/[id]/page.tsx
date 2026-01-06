'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  Send, ArrowLeft, RotateCcw, CheckCircle, 
  Brain, BookOpen, Settings2, Sparkles, 
  ThumbsUp, ThumbsDown, MessageSquare 
} from 'lucide-react';
import Swal from 'sweetalert2';

export default function TrainingPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState('instructions');
  const [instructions, setInstructions] = useState('');
  const [temp, setTemp] = useState(0.7);
  const [model, setModel] = useState('GPT-4o');
  
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // --- EFECTO: Cargar datos desde el array global de asistentes ---
  useEffect(() => {
    if (id) {
      const savedAssistants = localStorage.getItem('assistants');
      if (savedAssistants) {
        const assistants = JSON.parse(savedAssistants);
        // Buscamos el asistente específico por ID
        const currentAssistant = assistants.find((a: any) => a.id === id);
        
        if (currentAssistant) {
          // Cargamos las reglas en el campo de instrucciones
          setInstructions(currentAssistant.rules || '');
          // Si guardaste temp y model dentro del objeto del asistente antes:
          if (currentAssistant.temp) setTemp(currentAssistant.temp);
          if (currentAssistant.model) setModel(currentAssistant.model);
        }
      }
    }
  }, [id]);

  // --- FUNCIÓN: Guardar datos en el array global ---
  const handleSave = () => {
    const savedAssistants = localStorage.getItem('assistants');
    if (savedAssistants) {
      const assistants = JSON.parse(savedAssistants);
      
      // Actualizamos solo el asistente que estamos editando
      const updatedAssistants = assistants.map((a: any) => {
        if (a.id === id) {
          return {
            ...a,
            rules: instructions, // Guardamos las instrucciones en 'rules'
            temp: temp,
            model: model
          };
        }
        return a;
      });

      localStorage.setItem('assistants', JSON.stringify(updatedAssistants));

      Swal.fire({
        title: '¡Cerebro Actualizado!',
        text: 'Los cambios se han guardado en el asistente.',
        icon: 'success',
        confirmButtonColor: '#E63056',
        customClass: { popup: 'rounded-[2rem]' }
      });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    const userMsg = { role: 'user', text: prompt };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setPrompt('');
    setIsTyping(true);

    const respuestasIA = [
      "Basado en las nuevas instrucciones, he ajustado mi respuesta...",
      "Entendido, ¿en qué más puedo ayudarte?",
      "Esa es una excelente pregunta. Déjame explicarte...",
      "Perfecto, he registrado esa información."
    ];

    setTimeout(() => {
      const respuestaAleatoria = respuestasIA[Math.floor(Math.random() * respuestasIA.length)];
      const assistantMsg = { role: 'assistant', text: respuestaAleatoria };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B0F1A]">
      <nav className="bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-all">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-black tracking-tighter">LABORATORIO DE ENTRENAMIENTO</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Agente ID: {id?.toString().slice(0,8)}</p>
          </div>
        </div>
      </nav>

      <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 lg:h-[calc(100vh-90px)]">
        
        {/* PANEL IZQUIERDO */}
        <div className="lg:col-span-7 p-6 lg:border-r border-slate-100 overflow-y-auto bg-white">
          
          <div className="flex gap-1 bg-slate-100 p-1.5 rounded-2xl mb-8 w-fit">
            <button onClick={() => setActiveTab('instructions')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'instructions' ? 'bg-white text-[#E63056] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              <Brain size={14} /> INSTRUCCIONES
            </button>
            <button onClick={() => setActiveTab('knowledge')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'knowledge' ? 'bg-white text-[#E63056] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              <BookOpen size={14} /> CONOCIMIENTO
            </button>
            <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'settings' ? 'bg-white text-[#E63056] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              <Settings2 size={14} /> AJUSTES
            </button>
          </div>

          <div className="min-h-[200px] h-83">
            {activeTab === 'instructions' && (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div className="bg-rose-50/50 p-6 rounded-[2rem] border border-rose-100">
                  <h3 className="text-sm font-black text-[#E63056] mb-4">Define la personalidad y reglas de tu IA</h3>
                  <textarea 
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full h-64 bg-white border border-rose-100 rounded-2xl p-5 focus:ring-4 focus:ring-rose-500/10 outline-none resize-none font-medium text-slate-700"
                    placeholder="Ej: Eres un asistente experto en cierre de ventas..."
                  ></textarea>
                </div>
              </div>
            )}

            {activeTab === 'knowledge' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center hover:border-[#E63056] transition-colors cursor-pointer group">
                  <BookOpen className="text-slate-300 group-hover:text-[#E63056] mx-auto mb-4" size={32} />
                  <h3 className="font-black text-slate-800">Sube tu Base de Conocimientos</h3>
                  <button className="mt-6 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-xs">Seleccionar Archivos</button>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <label className="text-sm font-black text-slate-700">Creatividad (Temperatura)</label>
                    <span className="text-[#E63056] font-bold text-sm">{temp}</span>
                  </div>
                  <input type="range" min="0" max="1" step="0.1" value={temp} onChange={(e) => setTemp(parseFloat(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#E63056]" />
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <label className="text-sm font-black text-slate-700 block">Modelo de Lenguaje</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['GPT-4o', 'Claude 3.5'].map(m => (
                      <button key={m} onClick={() => setModel(m)} className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all ${model === m ? 'border-[#E63056] bg-rose-50 text-[#E63056]' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="py-8 flex justify-end">
            <button 
              onClick={handleSave}
              className="bg-[#0B0F1A] hover:bg-[#E63056] text-white px-8 py-2 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 shadow-xl"
            >
              <CheckCircle size={18} /> Guardar Entrenamiento
            </button>
          </div>
        </div>
        
        {/* PANEL DERECHO (CHAT) */}
        <div className="lg:col-span-5 flex flex-col bg-[#0B0F1A] h-[200px] lg:h-140 relative">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-white font-black text-sm flex items-center gap-2 uppercase tracking-widest">
              <MessageSquare size={16} className="text-[#E63056]" /> Vista Previa Real
            </h2>
            <button onClick={() => setMessages([])} className="text-white/30 hover:text-white transition-colors">
              <RotateCcw size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center text-white/20">
                <Brain size={40} className="mb-4" />
                <p className="font-bold text-sm">Prueba el entrenamiento aquí</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[90%] p-4 rounded-[1.8rem] text-sm font-medium ${m.role === 'user' ? 'bg-[#E63056] text-white rounded-tr-none' : 'bg-white/10 text-slate-200 rounded-tl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-[#E63056] animate-pulse">Escribiendo...</div>}
          </div>

          <div className="p-8">
            <form onSubmit={handleSendMessage} className="relative">
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-[1.8rem] px-8 py-5 pr-20 outline-none text-white focus:border-[#E63056] transition-all"
                placeholder="Haz una pregunta de prueba..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-3 bg-[#E63056] text-white p-3.5 rounded-2xl">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}