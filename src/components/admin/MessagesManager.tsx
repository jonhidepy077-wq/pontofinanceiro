import React from 'react';
import { MessageSquare, Mail, Phone, Calendar, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatDate } from '../../utils/formatters';

export const MessagesManager: React.FC = () => {
  const { contactMessages, updateContactMessageStatus, deleteContactMessage } = useData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <h2 className="font-serif text-xl font-bold text-stone-900 leading-tight">
            Mensagens de Contato Recebidas ({contactMessages.length})
          </h2>
          <p className="text-xs text-stone-500">
            Dúvidas, sugestões e solicitações enviadas por visitantes e leitores
          </p>
        </div>
      </div>

      {contactMessages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-500 text-xs">
          <MessageSquare className="w-10 h-10 mx-auto text-stone-300 mb-2" />
          <p>Nenhuma mensagem de contato recebida até o momento.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contactMessages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white rounded-2xl border p-5 space-y-3 transition-all ${
                msg.status === 'unread'
                  ? 'border-emerald-500/60 ring-1 ring-emerald-500/40 shadow-xs'
                  : 'border-stone-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 text-sm">{msg.name}</span>
                  {msg.status === 'unread' && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px] uppercase">
                      Nova
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-stone-500 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(msg.createdAt)}
                  </span>

                  <button
                    onClick={() => {
                      const nextStatus = msg.status === 'unread' ? 'read' : 'unread';
                      updateContactMessageStatus(msg.id, nextStatus);
                    }}
                    className="text-emerald-700 hover:underline font-semibold cursor-pointer"
                  >
                    {msg.status === 'unread' ? 'Marcar como lida' : 'Marcar como não lida'}
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Excluir esta mensagem permanentemente?')) {
                        deleteContactMessage(msg.id);
                      }
                    }}
                    className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                    title="Excluir mensagem"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <a href={`mailto:${msg.email}`} className="text-emerald-800 hover:underline">
                    {msg.email}
                  </a>
                </span>
                {msg.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>{msg.phone}</span>
                  </span>
                )}
                {msg.subject && (
                  <span className="font-semibold text-stone-800">
                    Assunto: {msg.subject}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-stone-800 whitespace-pre-wrap bg-stone-50 p-4 rounded-xl border border-stone-200 leading-relaxed font-sans">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
