
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getCreativeAdvice } from '../services/geminiService';
import { Message } from '../types';

interface AIAssistantProps {
  onClose: () => void;
  theme?: 'dark' | 'light';
}

// Using React.FC to properly define component props and ensure consistency with other components
const AIAssistant: React.FC<AIAssistantProps> = ({ onClose, theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm the Larsson Creative Consultant. How can I help elevate your vision today?" }
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
    setMessages(prev => [...prev, { role: 'assistant', content: result || 'I am sorry, I am experiencing a brief connection delay.' }]);
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
      if (!trimmed) return <div key={i} className="h-2" />;

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
          <li key={i} className={`ml-4 list-disc mb-1 ${isDark ? 'text-white/90' : 'text-black font-semibold'}`}>
            {bulletText.replace(/\*\*/g, '')}
          </li>
        );
      }

      return <p key={i} className="mb-1 last:mb-0 leading-snug">{segments}</p>;
    });
  };

  return (
    <div className={`absolute bottom-24 right-0 w-[340px] md:w-[420px] h-[250px] border-2 shadow-2xl flex flex-col overflow-hidden animate-slide-up z-[80] rounded-[1.5rem] backdrop-blur-3xl transition-colors duration-500 ${isDark ? 'bg-larsson-black border-white/10' : 'bg-white border-black/20'}`}>
      
      {/* Header */}
      <div className={`px-5 py-2.5 flex items-center justify-between border-b shrink-0 ${isDark ? 'bg-larsson-navy border-white/10' : 'bg-larsson-grey/5 border-black/10'}`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-[10px] shadow-lg ${isDark ? 'bg-white text-larsson-navy' : 'bg-black text-white'}`}>L</div>
          <div className="flex flex-col">
            <span className={`font-black uppercase tracking-[0.2em] text-[9px] ${isDark ? 'text-white' : 'text-black'}`}>Larsson Assistant</span>
            <span className={`text-[7px] font-bold uppercase tracking-widest ${isDark ? 'text-larsson-accent' : 'text-larsson-accent'}`}>Online Strategy</span>
          </div>
        </div>
        <button onClick={onClose} className={`transition-all hover:scale-110 p-1 ${isDark ? 'text-white' : 'text-black'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className={`flex-1 p-4 overflow-y-auto space-y-5 scrollbar-hide ${isDark ? 'bg-larsson-black/30' : 'bg-black/5'}`}>
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`relative group max-w-[90%] p-3.5 rounded-[1.2rem] text-[11px] leading-relaxed shadow-sm ${
              m.role === 'user' 
                ? 'bg-larsson-accent text-white rounded-br-none font-bold' 
                : (isDark ? 'bg-larsson-grey/60 text-larsson-lightGrey rounded-bl-none border border-white/5 font-medium' : 'bg-white text-black rounded-bl-none border border-black/10 font-medium')
            }`}>
              {m.role === 'assistant' ? formatText(m.content) : m.content}
              
              {/* Copy Button Container - Appears on Hover */}
              {m.role === 'assistant' && (
                <button 
                  onClick={() => copyToClipboard(m.content, i)}
                  className={`absolute -right-10 top-0 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 ${isDark ? 'bg-white/5 text-white/50 hover:text-white' : 'bg-black/5 text-black/50 hover:text-black'}`}
                  title="Copy Text"
                >
                  {copyingId === i ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-larsson-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                </button>
              )}
            </div>
            {copyingId === i && (
              <span className="text-[7px] font-black text-larsson-accent uppercase mt-1 mr-2 tracking-widest animate-pulse">Copied!</span>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className={`flex gap-1 p-3 rounded-[1rem] ${isDark ? 'bg-larsson-grey/50' : 'bg-black/5'}`}>
              <div className="w-1.5 h-1.5 rounded-full bg-larsson-accent animate-bounce" />
              <div className="w-1.5 h-1.5 rounded-full bg-larsson-accent animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 rounded-full bg-larsson-accent animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className={`p-3 border-t shrink-0 ${isDark ? 'border-white/5 bg-larsson-black/50' : 'border-black/5 bg-white'}`}>
        <div className="flex gap-2.5">
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
            placeholder="Inquire strategy..."
            className={`flex-1 border px-4 py-2 text-[10px] font-medium tracking-wide focus:border-larsson-accent outline-none transition-all rounded-full shadow-inner ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/20' : 'bg-black/5 border-black/10 text-black placeholder:text-black/40'}`}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className={`h-9 w-9 flex items-center justify-center rounded-full transition-all shadow-lg disabled:opacity-50 shrink-0 ${isDark ? 'bg-white text-larsson-black hover:bg-larsson-accent hover:text-white' : 'bg-larsson-black text-white hover:bg-larsson-accent'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slide-up {
          animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AIAssistant;
