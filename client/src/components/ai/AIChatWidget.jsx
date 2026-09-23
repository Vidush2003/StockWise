import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import api from '../../services/api';

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! I am the StockWise AI. How can I help you analyze your inventory today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userQuery = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userQuery }]);
    setIsLoading(true);

    try {
      const response = await api.post('/ai/chat', { query: userQuery });
      const aiText = response.data.data;
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: 'Sorry, I encountered an error connecting to the AI. Please ensure your API key is configured.',
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-brand-600 text-white shadow-lg hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all z-40 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-80 sm:w-96 glass-panel-elevated rounded-2xl flex flex-col z-50 transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 rounded-t-2xl">
          <div className="flex items-center gap-2 text-white">
            <div className="p-1.5 rounded-md bg-brand-500/20">
              <Bot className="w-5 h-5 text-brand-400" />
            </div>
            <span className="font-semibold text-sm">StockWise AI</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === 'user' ? 'bg-slate-700' : 'bg-brand-600/30 border border-brand-500/50'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-slate-300" /> : <Bot className="w-4 h-4 text-brand-400" />}
              </div>
              <div className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-slate-700 text-white rounded-tr-sm' 
                  : msg.isError 
                    ? 'bg-red-500/20 text-red-200 border border-red-500/30 rounded-tl-sm'
                    : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 flex-row">
              <div className="shrink-0 w-8 h-8 rounded-full bg-brand-600/30 border border-brand-500/50 flex items-center justify-center">
                <Bot className="w-4 h-4 text-brand-400" />
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 rounded-tl-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce delay-100"></span>
                <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce delay-200"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 bg-white/5 rounded-b-2xl">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your inventory..."
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2 rounded-lg text-brand-400 hover:text-brand-300 hover:bg-brand-500/20 disabled:opacity-50 disabled:hover:bg-transparent transition-all"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AIChatWidget;
