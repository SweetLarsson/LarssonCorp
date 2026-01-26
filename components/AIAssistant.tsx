
import React, { useState, useRef, useEffect } from 'react';
import { getCreativeAdvice } from '../services/geminiService';
import { Message } from '../types';

interface AIAssistantProps {
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I am the Larsson Corp Creative Consultant. How may I help you elevate your brand vision today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const history: { role: 'user' | 'model'; parts: { text: string }[] }[] = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const result = await getCreativeAdvice(userMsg, history);
    setMessages(prev => [...prev, { role: 'assistant', content: result || 'I am sorry, I am experiencing a brief connection delay.' }]);
    setIsLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    });
  };

  // Simple formatter for assistant text to handle lists and line breaks
  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        return <li key={i} className="ml-4 list-disc">{line.trim().substring(2)}</li>;
      }
      return <p key={i} className={line.trim() === '' ? 'h-3' : 'mb-1'}>{line}</p>;
    });
  };

  return (
    <div className="absolute bottom-24 right-0 w-[350px] md:w-[450px] h-auto bg-larsson-black border-2 border-white/10 shadow-2xl flex flex-col overflow-hidden animate-slide-up z-[80] rounded-2xl backdrop-blur-3xl">
      {showToast && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[90] bg-larsson-accent text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl animate-fade-in">
          Copied to clipboard
        </div>
      )}

      <div className="bg-larsson-navy p-6 flex items-center justify-between border-b border-white/10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-black text-larsson-navy text-sm shadow-xl">AI</div>
          <div>
            <span className="text-white font-black uppercase tracking-[0.2em] text-[10px] block">Larsson Corp</span>
            <span className="text-larsson-lightGrey text-[9px] uppercase tracking-widest font-bold">Creative Consultant</span>
          </div>
        </div>
        <button onClick={onClose} className="text-white hover:rotate-90 transition-transform p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div ref={scrollRef} className="h-[150px] p-6 overflow-y-auto space-y-6 scrollbar-hide bg-larsson-black/30">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-2xl text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-larsson-accent text-white rounded-br-none shadow-lg font-black uppercase tracking-tight' 
                : 'bg-larsson-grey/50 text-larsson-lightGrey rounded-bl-none border border-white/5 font-medium'
            }`}>
              {m.role === 'assistant' ? formatText(m.content) : m.content}
            </div>
            {m.role === 'assistant' && (
              <button 
                onClick={() => copyToClipboard(m.content)}
                className="mt-2 flex items-center gap-2 text-[8px] uppercase font-black tracking-widest text-white/30 hover:text-larsson-accent transition-colors ml-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy Strategy
              </button>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-larsson-grey/50 p-5 rounded-2xl text-xs rounded-bl-none animate-pulse text-white/50 font-black tracking-widest uppercase">
              Architecting Solution...
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-white/5 bg-larsson-black/50 shrink-0">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="INQUIRE CREATIVE STRATEGY..."
            className="flex-1 bg-white/5 border border-white/10 p-4 text-[10px] font-black tracking-[0.15em] focus:border-larsson-accent outline-none transition-all rounded-lg text-white uppercase"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="bg-white text-larsson-black p-4 rounded-lg hover:bg-larsson-accent hover:text-white transition-all shadow-xl disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AIAssistant;
