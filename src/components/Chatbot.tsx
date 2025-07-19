
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Key, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { chatbotService } from '../services/chatbot';
import { toast } from "sonner";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: string[];
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const Chatbot = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLanguageSelect = (language: string) => {
    chatbotService.setChatLanguage(language);
    setShowLanguageSelector(false);
    
    const welcomeMessages = {
      en: "Hello! 👋 I'm your AI shopping assistant. I can help you with virtual try-ons, style recommendations, product searches, and answer any questions you have! What would you like to explore today?",
      ru: "Привет! 👋 Я ваш AI помощник по покупкам. Я могу помочь с виртуальной примеркой, рекомендациями стиля, поиском товаров и ответить на любые ваши вопросы! Что бы вы хотели изучить?",
      uz: "Salom! 👋 Men sizning AI xarid yordamchingizman. Men virtual kiyib ko'rish, stil tavsiyalari, mahsulot qidiruvi bilan yordam bera olaman va har qanday savollaringizga javob bera olaman! Nimani o'rganishni xohlaysiz?"
    };

    const initialMessage: Message = {
      id: 1,
      text: welcomeMessages[language as keyof typeof welcomeMessages] || welcomeMessages.en,
      isUser: false,
      timestamp: new Date(),
      suggestions: ["Virtual Try-On", "Style Quiz", "Find Products", "Size Guide"]
    };

    setMessages([initialMessage]);
  };

  const handleApiKeySubmit = () => {
    if (!apiKey.trim()) {
      toast.error('Please enter a valid OpenAI API key');
      return;
    }
    
    if (!apiKey.startsWith('sk-')) {
      toast.error('OpenAI API keys start with "sk-"');
      return;
    }

    chatbotService.setApiKey(apiKey);
    setShowApiKeyInput(false);
    setApiKey('');
    toast.success('API key saved! The chatbot is now powered by AI.');
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputText;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Add to conversation history
    const newHistory = [...conversationHistory, { role: 'user' as const, content: text }];

    try {
      // Always try to use AI service, fall back to basic responses on error
      const response = await chatbotService.sendMessage(text, newHistory);

      const botResponse: Message = {
        id: Date.now() + 1,
        text: response.message,
        isUser: false,
        timestamp: new Date(),
        suggestions: response.suggestions
      };
      
      setMessages(prev => [...prev, botResponse]);
      
      // Update conversation history
      setConversationHistory([
        ...newHistory,
        { role: 'assistant' as const, content: response.message }
      ].slice(-10)); // Keep last 10 messages for context
      
    } catch (error) {
      console.error('Chat error:', error);
      
      // Use fallback response on any error
      const fallbackResponse = chatbotService.getFallbackResponse(text);
      const errorResponse: Message = {
        id: Date.now() + 1,
        text: fallbackResponse.message,
        isUser: false,
        timestamp: new Date(),
        suggestions: fallbackResponse.suggestions
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Enhanced Chat Toggle Button - Fixed Position */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-50 group pointer-events-auto ${
          isOpen ? 'bg-red-500 hover:bg-red-600 scale-110' : 'bg-gradient-to-r from-primary to-purple-600 hover:scale-110 '
        }`}
        style={{ position: 'fixed' }}
      >
        {isOpen ? (
          <X className="h-7 w-7 text-white" />
        ) : (
          <div className="relative">
            <MessageCircle className="h-7 w-7 text-white" />
            <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300 animate-spin" />
            {!chatbotService.hasApiKey() && (
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <AlertCircle className="h-2 w-2 text-white" />
              </div>
            )}
          </div>
        )}
      </button>

      {/* Enhanced Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border z-50 flex flex-col overflow-hidden">
          
          {/* Language Selection Modal */}
          {showLanguageSelector && (
            <div className="absolute inset-0 bg-white z-60 rounded-2xl p-6 flex flex-col justify-center items-center">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Language / Tilni tanlang / Выберите язык</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Select your preferred language for chatbot conversation
                </p>
              </div>
              
              <div className="w-full space-y-3">
                <button
                  onClick={() => handleLanguageSelect('en')}
                  className="w-full flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-2xl mr-3">🇺🇸</span>
                  <span className="font-medium">English</span>
                </button>
                <button
                  onClick={() => handleLanguageSelect('ru')}
                  className="w-full flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-2xl mr-3">🇷🇺</span>
                  <span className="font-medium">Русский</span>
                </button>
                <button
                  onClick={() => handleLanguageSelect('uz')}
                  className="w-full flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-2xl mr-3">🇺🇿</span>
                  <span className="font-medium">O'zbek</span>
                </button>
              </div>
            </div>
          )}
          {/* API Key Setup Modal */}
          {showApiKeyInput && (
            <div className="absolute inset-0 bg-white z-60 rounded-2xl p-6 flex flex-col justify-center items-center">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Connect to AI</h3>
                <p className="text-sm text-gray-600 mb-4">
                  To unlock full AI capabilities, please enter your OpenAI API key. 
                  <br />
                  <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Get your API key here
                  </a>
                </p>
              </div>
              
              <div className="w-full space-y-4">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleApiKeySubmit()}
                />
                <div className="flex space-x-3">
                  <button
                    onClick={handleApiKeySubmit}
                    className="flex-1 bg-gradient-to-r from-primary to-purple-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Connect AI
                  </button>
                  <button
                    onClick={() => setShowApiKeyInput(false)}
                    className="px-6 py-3 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Skip
                  </button>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Your API key is stored locally and never shared. You can use basic features without it.
                </p>
              </div>
            </div>
          )}

          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-primary to-purple-600 text-white p-6 rounded-t-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Shopping Assistant</h3>
                  <div className="flex items-center text-sm opacity-90">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    {chatbotService.hasApiKey() ? 'Powered by OpenAI' : 'Basic Mode'} • Online
                  </div>
                </div>
              </div>
              {!chatbotService.hasApiKey() && (
                <button
                  onClick={() => setShowApiKeyInput(true)}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                  title="Connect to OpenAI for full AI capabilities"
                >
                  <Key className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div
                  className={`flex items-start space-x-3 ${
                    message.isUser ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isUser ? 'bg-primary' : 'bg-gradient-to-r from-purple-500 to-blue-500'
                  }`}>
                    {message.isUser ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className={`max-w-xs p-4 rounded-2xl ${
                    message.isUser
                      ? 'bg-primary text-white'
                      : 'bg-white border shadow-sm'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.isUser ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
                
                {/* AI Suggestions */}
                {message.suggestions && !message.isUser && (
                  <div className="ml-11 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs px-3 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors border border-primary/20"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white border p-4 rounded-2xl shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={chatbotService.hasApiKey() ? "Ask me anything..." : "Ask me about shopping..."}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isTyping}
                className="bg-gradient-to-r from-primary to-purple-600 text-white p-3 rounded-full hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 shadow-lg"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {chatbotService.hasApiKey() 
                ? 'Powered by OpenAI • Real-time AI responses' 
                : 'Connect OpenAI for enhanced AI capabilities'
              }
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
