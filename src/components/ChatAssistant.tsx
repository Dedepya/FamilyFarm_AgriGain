
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini API
// IMPORTANT: Never hardcode your API key. Use environment variables only.
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '' });

type Message = {
  id: string;
  role: 'user' | 'model';
  text: string;
};

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: 'Hello! I am your AGRI GAIN assistant. How can I help you with your farming needs today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const userMessage: Message = { id: Date.now().toString(), role: 'user', text: userText };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Format history for the model
      const contents = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      contents.push({ role: 'user', parts: [{ text: userText }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction: 'You are a helpful agricultural assistant for the AGRI GAIN portal. You help farmers with crop advice, pest control, weather interpretation, and navigating the portal. Keep your answers concise, practical, and friendly.',
        }
      });

      const modelMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text || 'I am sorry, I could not process that request.'
      };

      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: 'Sorry, I encountered an error. Please try again later.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 z-40 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 z-50 origin-bottom-right border border-stone-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-green-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6" />
            <h3 className="font-semibold text-lg">AGRI GAIN Assistant</h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-green-100 hover:text-white transition-colors p-1 rounded-md hover:bg-green-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div 
                className={`max-w-[75%] p-3 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-orange-500 text-white rounded-tr-sm' 
                    : 'bg-white border border-stone-200 text-stone-800 rounded-tl-sm shadow-sm'
                }`}
              >
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 flex-row">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-green-100 text-green-600">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white border border-stone-200 text-stone-800 p-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-green-600" />
                <span className="text-sm text-stone-500">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-stone-100">
          <div className="flex gap-2 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about crops, pests, or loans..."
              className="w-full resize-none rounded-xl border border-stone-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 py-3 pl-4 pr-12 text-sm max-h-32 min-h-[44px] bg-stone-50"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 bottom-2 p-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:hover:bg-green-600 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] text-stone-400">AI can make mistakes. Verify important info.</span>
          </div>
        </div>
      </div>
    </>
  );
}
