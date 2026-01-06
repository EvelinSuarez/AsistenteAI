import { Globe, MessageSquare, Edit3, Trash2, BrainCircuit } from 'lucide-react';

export function AssistantCard({ assistant, onDelete, onEdit, onTrain }: any) {
  return (
    <div className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 hover:shadow-[0_20px_60px_rgba(230,48,86,0.1)] transition-all duration-500 relative overflow-hidden">
      

      <div className="mb-8">
        <h3 className="text-2xl font-extrabold text-[#0B0F1A] mb-3">
          {assistant.name}
        </h3>
        <div className="flex gap-2">
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-slate-100 text-slate-500 rounded-lg">
            <Globe size={12} /> {assistant.language}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-rose-50 text-[#E63056] rounded-lg">
            <MessageSquare size={12} /> {assistant.tone}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-6 border-t border-slate-50">
        <button 
          onClick={onTrain}
          /* Gradiente estilo Funnelhot: Naranja a Rosa */
          className="w-full bg-gradient-to-r from-[#FF4D00] to-[#E63056] text-white font-bold py-4 rounded-2xl hover:scale-[1.02] transition-all shadow-md active:scale-95"
        >
          Entrenar
        </button>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <button onClick={onEdit} className="text-[11px] font-bold py-2.5 rounded-xl border border-slate-200 hover:bg-[#0B0F1A] hover:text-white transition-all flex items-center justify-center gap-1 text-slate-600">
            <Edit3 size={14} /> Editar
          </button>
          <button onClick={onDelete} className="text-[11px] font-bold py-2.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all flex items-center justify-center gap-1">
            <Trash2 size={14} /> Borrar
          </button>
        </div>
      </div>
    </div>
  );
}