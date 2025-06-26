import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Settings, RotateCcw } from 'lucide-react';

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! I'm your AI assistant. I'm here to help you with questions, creative tasks, analysis, coding, and much more. What would you like to explore today?",
      role: 'assistant',
      timestamp: new Date(Date.now() - 300000)
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText]);

  const simulateAIResponse = async (userMessage) => {
    const responses = [
      "That's a fascinating question! Let me think through this step by step. First, I should consider the context and implications of what you're asking...",
      "I'd be happy to help you with that. Based on my understanding, there are several key aspects to consider here...",
      "Great question! This is actually quite an interesting topic. Let me break this down into manageable parts...",
      "I can definitely assist with that. From my analysis, I think the best approach would be to...",
      "That's an excellent point you've raised. Let me explore this thoroughly and provide you with a comprehensive response..."
    ];
    
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    // Simulate streaming response
    setStreamingText('');
    for (let i = 0; i < response.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 40));
      setStreamingText(response.slice(0, i + 1));
    }
    
    // Add complete message
    setMessages(prev => [...prev, {
      id: Date.now(),
      content: response,
      role: 'assistant',
      timestamp: new Date()
    }]);
    
    setStreamingText('');
    setIsLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = {
      id: Date.now(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    await simulateAIResponse(input.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      content: "Hello! I'm your AI assistant. I'm here to help you with questions, creative tasks, analysis, coding, and much more. What would you like to explore today?",
      role: 'assistant',
      timestamp: new Date()
    }]);
    setStreamingText('');
    setIsLoading(false);
  };

  return (
    <div className="max-w-sm mx-auto h-screen bg-gray-950 flex flex-col relative">
      {/* Status Bar */}
      <div className="bg-black text-white text-xs px-4 py-2 flex justify-between items-center">
        <span className="font-medium">9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-white rounded-full opacity-40"></div>
            <div className="w-1 h-3 bg-white rounded-full opacity-60"></div>
            <div className="w-1 h-3 bg-white rounded-full opacity-80"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
          <div className="ml-2 text-xs">100%</div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-white font-medium text-lg">AI Assistant</h1>
              <p className="text-gray-400 text-sm">Always ready to help</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={clearChat}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
              {message.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-md flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-400 text-xs font-medium">AI Assistant</span>
                </div>
              )}
              
              <div className={`rounded-2xl px-4 py-3 ${
                message.role === 'user' 
                  ? 'bg-blue-600 text-white ml-8' 
                  : 'bg-gray-800 text-gray-100 border border-gray-700'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Streaming response */}
        {streamingText && (
          <div className="flex justify-start">
            <div className="max-w-[85%]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-md flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-400 text-xs font-medium">AI Assistant</span>
              </div>
              
              <div className="bg-gray-800 text-gray-100 border border-gray-700 rounded-2xl px-4 py-3">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {streamingText}
                  <span className="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse"></span>
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Loading state */}
        {isLoading && !streamingText && (
          <div className="flex justify-start">
            <div className="max-w-[85%]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-md flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-400 text-xs font-medium">AI Assistant</span>
              </div>
              
              <div className="bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-800 bg-gray-900 p-4">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              rows="1"
              className="w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-2xl px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm leading-relaxed max-h-32 overflow-y-auto"
              style={{ 
                minHeight: '44px',
                height: 'auto'
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={`absolute right-2 bottom-2 p-2 rounded-xl transition-all duration-200 ${
                input.trim() && !isLoading
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-center mt-3">
          <p className="text-gray-500 text-xs">AI can make mistakes. Verify important information.</p>
        </div>
      </div>
    </div>
  );
}