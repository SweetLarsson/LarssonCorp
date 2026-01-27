
import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  const [copyingId, setCopyingId] = useState<number | null>(null);
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
    setMessages(prev => [...prev, { role: 'assistant', content: result || 'Consultation sync failed. Re-initiating...' }]);
    setIsLoading(false);
  };

  const copyToClipboard = useCallback((text: string, index: number) => {
    if (!text) return;
    const cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '');
    navigator.clipboard.writeText(cleanText).then(() => {
      setCopyingId(index);
      setTimeout(() => setCopyingId(null), 1500);
    });
  }, []);

  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={i} className="h-1.5" />;

      let segments: React.ReactNode[] = [];
      const boldRegex = /\*\*(.*?)\*\*/g;
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          segments.push(line.substring(lastIndex, match.index));
        }
        segments.push(<strong key={match.index} className={`font-black ${isDark ? 'text-white' : 'text-black'}`}>{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      
      if (lastIndex < line.length) {
        segments.push(line.substring(lastIndex));
      }

      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const bulletText = line.replace(/^[\s]*[\*\-]\s/, '');
        return (
          <li key={i} className={`ml-3 list-disc mb-0.5 text-[10px] leading-snug ${isDark ? 'text-white/90' : 'text-black font-semibold'}`}>
            {bulletText.replace(/\*\*/g, '')}
          </li>
        );
      }

      return <p key={i} className="mb-1 last:mb-0 leading-tight text-[10px]">{segments}</p>;
    });
  };

  return (
    <div className={`absolute bottom-24 right-0 w-[320px] md:w-[400px] h-[250px] border-2 shadow-2xl flex flex-col overflow-hidden animate-slide-up z-[80] rounded-2xl backdrop-blur-3xl transition-colors duration-500 ${isDark ? 'bg-larsson-black border-white/10' : 'bg-white border-black/20'}`}>
      
      {/* Header */}
      <div className={`px-4 py-2 flex items-center justify-between border-b shrink-0 ${isDark ? 'bg-larsson-navy border-white/10' : 'bg-larsson-grey/10 border-black/10'}`}>
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center font-black text-[9px] shadow-lg ${isDark ? 'bg-white text-larsson-navy' : 'bg-black text-white'}`}>L</div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border-2 border-larsson-black animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className={`font-black uppercase tracking-[0.2em] text-[8px] ${isDark ? 'text-white' : 'text-black'}`}>Larsson Assistant</span>
            <span className="text-larsson-accent font-black text-[6px] uppercase tracking-widest">Active Sync</span>
          </div>
        </div>
        <button onClick={onClose} className={`transition-all hover:scale-110 p-1 ${isDark ? 'text-white' : 'text-black'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className={`flex-1 p-3 overflow-y-auto space-y-4 scrollbar-hide ${isDark ? 'bg-larsson-black/30' : 'bg-black/5'}`}>
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`relative group max-w-[92%] p-2.5 rounded-xl shadow-sm ${
              m.role === 'user' 
                ? 'bg-larsson-accent text-white rounded-br-none font-bold text-[10px]' 
                : (isDark ? 'bg-larsson-grey/60 text-larsson-lightGrey rounded-bl-none border border-white/5 font-medium' : 'bg-white text-black rounded-bl-none border border-black/10 font-medium shadow-sm')
            }`}>
              {m.role === 'assistant' ? (
                <>
                  <div className="pr-4">{formatText(m.content)}</div>
                  <button 
                    onClick={() => copyToClipboard(m.content, i)}
                    className={`absolute right-1 top-1 p-1 rounded transition-all ${isDark ? 'text-white/20 hover:text-white hover:bg-white/10' : 'text-black/20 hover:text-black hover:bg-black/5'}`}
                    title="Copy response"
                  >
                    {copyingId === i ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 text-larsson-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3" />
                      </svg>
                    )}
                  </button>
                </>
              ) : m.content}
            </div>
            {copyingId === i && (
              <span className="text-[6px] font-black text-larsson-accent uppercase mt-0.5 tracking-tighter animate-pulse">Copied to clipboard</span>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className={`px-2 py-1 rounded-full text-[7px] font-black uppercase tracking-widest animate-pulse ${isDark ? 'bg-white/5 text-larsson-accent' : 'bg-black/5 text-larsson-accent'}`}>
              Processing...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className={`p-2 border-t shrink-0 ${isDark ? 'border-white/5 bg-larsson-black/50' : 'border-black/5 bg-white'}`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Inquire..."
            className={`flex-1 border px-3 py-1.5 text-[10px] font-medium tracking-wide focus:border-larsson-accent outline-none transition-all rounded-lg ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/20' : 'bg-black/5 border-black/20 text-black placeholder:text-black/40'}`}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className={`h-7 w-7 flex items-center justify-center rounded-lg transition-all shadow-sm disabled:opacity-50 shrink-0 ${isDark ? 'bg-white text-larsson-black hover:bg-larsson-accent hover:text-white' : 'bg-larsson-black text-white hover:bg-larsson-accent'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AIAssistant;
