'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, BrainCircuit } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from '@/lib/toast';
import dataInitial from '@/types/dataInitial';

import AssistantModal from '@/components/AssistantModal';
import { AssistantCard } from '@/components/AssistantCard';
import { Assistant } from '@/types/assistant';

export default function HomePage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [editingAssistant, setEditingAssistant] = useState<Assistant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('assistants');
    if (saved) {
      setAssistants(JSON.parse(saved));
    } else {
      setAssistants(dataInitial);
      localStorage.setItem('assistants', JSON.stringify(dataInitial));
    }
    setLoading(false);
  }, []);

  const saveToLocalStorage = (list: Assistant[]) => {
    setAssistants(list);
    localStorage.setItem('assistants', JSON.stringify(list));
  };

  const handleOpenCreate = () => {
    setEditingAssistant(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (assistant: Assistant) => {
    setEditingAssistant(assistant);
    setIsModalOpen(true);
  };

  const handleSaveAssistant = (formData: any) => {
    const assistantData: Assistant = {
      ...formData,
      id: editingAssistant ? editingAssistant.id : Date.now().toString(),
      rules: formData.rules || ""
    };

    const updatedList = editingAssistant 
      ? assistants.map(a => a.id === assistantData.id ? assistantData : a)
      : [...assistants, assistantData];

    saveToLocalStorage(updatedList);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: '¿Eliminar asistente?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0f172a',
      cancelButtonColor: '#f43f5e',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: { popup: 'rounded-3xl' }
    }).then((result) => {
      if (result.isConfirmed) {
        const filtered = assistants.filter(a => a.id !== id);
        saveToLocalStorage(filtered);
        toast('Eliminado', 'success');
      }
    });
  };

  if (loading) return null;

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        
      <header className="flex justify-between items-center mb-16">
        <div>
          {/* Título en Slate oscuro para mayor elegancia */}
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
            Mis Asistentes
          </h1>
          <p className="text-slate-500 text-base">
            Gestiona y optimiza tus agentes de IA con precisión.
          </p>
        </div>
        <button 
          onClick={handleOpenCreate}
          /* Gradiente tipo Funnelhot: Naranja a Naranja Rojizo */
          className="bg-gradient-to-r from-[#FF4D00] to-[#FF7A00] text-white px-6 py-3 rounded-2xl hover:shadow-lg hover:shadow-orange-200 transition-all flex items-center gap-2 text-sm font-bold active:scale-95 shadow-md"
        >
          <Plus size={20} /> Nuevo Asistente
        </button>
      </header>

        {assistants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
              <BrainCircuit size={40} className="text-slate-300" />
            </div>
            <h2 className="text-xl font-semibold text-slate-400">No hay asistentes configurados</h2>
            <button 
              onClick={handleOpenCreate} 
              className="mt-4 text-[#FF4D00] font-semibold hover:text-[#e64500] transition-colors"
            >
              Crear el primero ahora
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {assistants.map((ast) => (
              <AssistantCard 
                key={ast.id} 
                assistant={ast} 
                onDelete={() => handleDelete(ast.id)} 
                onEdit={() => handleOpenEdit(ast)}
                onTrain={() => router.push(`/${ast.id}`)} 
              />
            ))}
          </div>
        )}
      </div>

      <AssistantModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveAssistant}
        initialData={editingAssistant}
      />
    </main>
  );
}