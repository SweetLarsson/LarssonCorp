
import React, { useState, useRef, useEffect } from 'react';
import { getCreativeAdvice } from '../services/geminiService';
import { Message } from '../types';

interface AIAssistantProps {
  onClose: () => void;
  theme?: 'dark' | 'light';
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose, theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Strategy Consultant online. How can I help elevate your brand vision today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  // Handle textarea auto-resize
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      // Limit to roughly 3 lines (approx 80px including padding)
      const nextHeight = Math.min(textareaRef.current.scrollHeight, 100);
      textareaRef.current.style.height = `${nextHeight}px`;
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);
    
    const history: { role: 'user' | 'model'; parts: { text: string }[] }[] = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));
    
    const result = await getCreativeAdvice(userMsg, history);
    setMessages(prev => [...prev, { role: 'assistant', content: result || 'Consultation sync failed.' }]);
    setIsLoading(false);
  };

  const copyToClipboard = (text: string, index: number) => {
    const cleanText = text.replace(/\*\*/g, '');
    navigator.clipboard.writeText(cleanText).then(() => {
      setCopiedId(index);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const formatText = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let tableRows: string[][] = [];

    const flushTable = (key: number) => {
      if (tableRows.length === 0) return null;
      const rows = [...tableRows];
      tableRows = [];
      return (
        <div key={`table-${key}`} className="my-6 overflow-x-auto rounded-xl border border-larsson-accent/20 scrollbar-hide">
          <table className="w-full text-left text-[10px] border-collapse">
            <thead>
              <tr className={isDark ? 'bg-larsson-accent/10' : 'bg-black/5'}>
                {rows[0].map((cell, i) => (
                  <th key={i} className="p-3 font-black uppercase tracking-widest border-b border-larsson-accent/20">{cell.trim().replace(/\*\*/g, '')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).filter(r => !r.every(c => c.includes('---'))).map((row, i) => (
                <tr key={i} className={isDark ? 'border-b border-white/5' : 'border-b border-black/5'}>
                  {row.map((cell, j) => (
                    <td key={j} className="p-3 font-medium">{cell.trim().replace(/\*\*/g, '')}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      if (trimmed === '---') {
        const table = flushTable(index);
        if (table) elements.push(table);
        elements.push(<hr key={index} className={`my-8 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`} />);
        return;
      }

      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        const cells = trimmed.split('|').filter(c => c !== '');
        tableRows.push(cells);
        return;
      } else {
        const table = flushTable(index);
        if (table) elements.push(table);
      }

      const isBullet = trimmed.startsWith('* ') || trimmed.startsWith('- ') || /^\d+\./.test(trimmed);

      if (trimmed) {
        const cleanText = trimmed.replace(/\*\*/g, '');
        elements.push(
          <p 
            key={index} 
            className={`mb-4 text-[11px] leading-relaxed transition-all ${
              isBullet ? 'pl-4 border-l-2 border-larsson-accent/30 font-medium' : 'font-medium opacity-90'
            }`}
          >
            {cleanText}
          </p>
        );
      } else {
        elements.push(<div key={index} className="h-4" />);
      }
    });

    const lastTable = flushTable(lines.length);
    if (lastTable) elements.push(lastTable);

    return elements;
  };

  return (
    <div 
      style={{ 
        height: 'calc(100vh - 150px)', 
        top: '100px',
        bottom: '50px',
        width: '35vw',
        minWidth: '320px',
        maxWidth: '500px'
      }}
      className={`fixed right-6 md:right-10 border shadow-3xl flex flex-col overflow-hidden animate-slide-up z-[80] rounded-[2.5rem] backdrop-blur-3xl transition-all duration-500 ${isDark ? 'bg-larsson-black/90 border-white/10' : 'bg-white/90 border-black/10'}`}
    >
      <div className={`px-8 py-5 flex items-center justify-between border-b shrink-0 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-lg">
             <img 
               src="https://i.imgur.com/3qYmgFZ.jpeg" 
               alt="L" 
               className="w-full h-full object-contain p-1"
               style={{ mixBlendMode: 'multiply' }}
             />
          </div>
          <div className="flex flex-col">
            <span className={`font-black uppercase tracking-widest text-[11px] ${isDark ? 'text-white' : 'text-larsson-black'}`}>Larsson Assist</span>
            <span className="text-larsson-accent font-black text-[8px] uppercase tracking-tighter">Executive Insights</span>
          </div>
        </div>
        <button onClick={onClose} className={`p-2 rounded-full transition-colors ${isDark ? 'text-white/40 hover:bg-white/10 hover:text-white' : 'text-black/40 hover:bg-black/5 hover:text-black'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-6 scrollbar-hide">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`relative group max-w-[95%] p-6 rounded-3xl transition-all ${
              m.role === 'user' 
                ? 'bg-larsson-accent text-white rounded-br-none font-medium text-[11px] shadow-lg' 
                : (isDark ? 'bg-white/5 text-white/90 rounded-bl-none border border-white/5' : 'bg-black/5 text-larsson-black/90 rounded-bl-none border border-black/5')
            }`}>
              {m.role === 'assistant' && (
                <button 
                  onClick={() => copyToClipboard(m.content, i)}
                  className={`absolute top-3 right-3 p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100 ${isDark ? 'hover:bg-white/10 text-white/40 hover:text-white' : 'hover:bg-black/5 text-black/40 hover:text-black'}`}
                  title="Copy consultation notes"
                >
                  {copiedId === i ? (
                    <svg className="w-3.5 h-3.5 text-larsson-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                  ) : (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3"/></svg>
                  )}
                </button>
              )}
              <div className="pr-2 leading-relaxed">
                {m.role === 'assistant' ? formatText(m.content) : m.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && <div className="text-[9px] font-black text-larsson-accent uppercase tracking-[0.4em] animate-pulse ml-2">Analysing...</div>}
      </div>

      <div className={`p-8 border-t shrink-0 ${isDark ? 'border-white/5 bg-larsson-black/20' : 'border-black/5 bg-black/[0.02]'}`}>
        <div className="flex items-end gap-3">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Vision sync..."
            className={`flex-1 px-6 py-4 text-[12px] font-medium rounded-2xl outline-none focus:ring-2 focus:ring-larsson-accent/30 transition-all resize-none scrollbar-hide overflow-y-auto ${isDark ? 'bg-white/5 text-white border-white/10' : 'bg-black/5 text-larsson-black border-black/10'}`}
          />
          <button 
            onClick={handleSend} 
            className="bg-larsson-accent text-white p-4 h-[52px] w-[52px] rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center shrink-0 shadow-lg shadow-larsson-accent/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AIAssistant;
