import { toast } from "sonner";

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatResponse {
  message: string;
  suggestions?: string[];
}

class ChatbotService {
  private apiKey: string | null = null;
  private chatLanguage: string = 'en';
  private systemPrompt = `You are an AI shopping assistant for a premium e-commerce platform. You are knowledgeable, helpful, and friendly.

Your capabilities include:
- Virtual try-on guidance and clothing recommendations
- Style advice and fashion trends
- Size recommendations and fitting guidance
- Product search and comparisons
- Order tracking and customer support
- AR shopping experiences
- Personalized styling tips
- Fashion industry knowledge
- Color matching and coordination
- Seasonal fashion advice

Guidelines:
- Be conversational and enthusiastic about fashion and shopping
- Provide practical, actionable advice
- Ask clarifying questions when needed
- Suggest relevant features of the platform
- Keep responses concise but informative (2-3 sentences max for most queries)
- Use emojis appropriately to add personality
- Always try to help the user with their shopping journey

If you don't have specific information about a product or service, be honest but still helpful by suggesting alternatives or general advice.`;

  constructor() {
    // Auto-set the provided API key
    this.apiKey = '';
    this.requestApiKey();
  }

  private requestApiKey() {
    // For demo purposes, we'll ask the user to input their API key
    // In production, this should be handled more securely
    const stored = localStorage.getItem('openai_api_key');
    if (stored) {
      this.apiKey = stored;
    }
  }

  public setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem('openai_api_key', key);
  }

  public hasApiKey(): boolean {
    return !!this.apiKey;
  }

  public setChatLanguage(language: string) {
    this.chatLanguage = language;
  }

  public getChatLanguage(): string {
    return this.chatLanguage;
  }

  private generateSuggestions(message: string): string[] {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('style') || lowerMessage.includes('fashion')) {
      return ["Style Quiz", "Fashion Trends", "Color Matching", "Outfit Ideas"];
    }
    if (lowerMessage.includes('try') || lowerMessage.includes('fit')) {
      return ["Virtual Try-On", "Size Guide", "Fit Tips", "Measurements"];
    }
    if (lowerMessage.includes('product') || lowerMessage.includes('search')) {
      return ["Browse Products", "Filter Search", "Compare Items", "Wishlist"];
    }
    if (lowerMessage.includes('order') || lowerMessage.includes('shipping')) {
      return ["Track Order", "Delivery Info", "Return Policy", "Customer Support"];
    }
    
    return ["Virtual Try-On", "Style Quiz", "Product Search", "Size Guide"];
  }

  public async sendMessage(
    message: string, 
    conversationHistory: ChatMessage[] = []
  ): Promise<ChatResponse> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not provided');
    }

    try {
      const languageInstruction = this.chatLanguage === 'uz' ? ' Respond in Uzbek language.' : 
                                  this.chatLanguage === 'ru' ? ' Respond in Russian language.' : 
                                  ' Respond in English language.';
      
      const messages: ChatMessage[] = [
        { role: 'system', content: this.systemPrompt + languageInstruction },
        ...conversationHistory.slice(-6), // Keep last 6 messages for context
        { role: 'user', content: message }
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-2025-04-14',
          messages,
          max_tokens: 200,
          temperature: 0.7,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your OpenAI API key.');
        }
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage = data.choices[0]?.message?.content || 'Sorry, I could not process your request.';

      return {
        message: aiMessage,
        suggestions: this.generateSuggestions(aiMessage)
      };

    } catch (error) {
      console.error('Chatbot API error:', error);
      
      // Return fallback response instead of throwing error
      return this.getFallbackResponse(message);
    }
  }

  // Fallback responses for when API is not available
  public getFallbackResponse(message: string): ChatResponse {
    const lowerMessage = message.toLowerCase();
    
    // Language-specific responses
    const responses = {
      en: {
        greeting: "Hello! 👋 I'm your AI shopping assistant. I can help you with virtual try-ons, style advice, product recommendations, and more! What would you like to explore?",
        style: "✨ I'd love to help you discover your perfect style! I can analyze trends, suggest outfits, and help you find pieces that match your personality. What kind of style are you interested in?",
        virtual: "🔮 Our Virtual Try-On feature uses advanced AI to show you how clothes will look on you! You can upload your photo or use live camera. Would you like to try it?",
        size: "📏 Getting the right fit is crucial! I can help you with size recommendations based on your measurements and our sizing database. Need help finding your size?",
        default: "🛍️ I'm here to help with all your shopping needs! I can assist with virtual try-ons, style advice, product recommendations, sizing help, and more. What would you like to know?"
      },
      ru: {
        greeting: "Привет! 👋 Я ваш AI помощник по покупкам. Я могу помочь с виртуальной примеркой, советами по стилю, рекомендациями товаров и многим другим! Что бы вы хотели изучить?",
        style: "✨ Я буду рад помочь вам найти ваш идеальный стиль! Я могу анализировать тренды, предлагать наряды и помогать найти вещи, которые подходят вашей личности. Какой стиль вас интересует?",
        virtual: "🔮 Наша функция виртуальной примерки использует продвинутый AI, чтобы показать, как одежда будет выглядеть на вас! Вы можете загрузить фото или использовать камеру. Хотите попробовать?",
        size: "📏 Правильная посадка очень важна! Я могу помочь с рекомендациями размеров на основе ваших измерений и нашей базы размеров. Нужна помощь с размером?",
        default: "🛍️ Я здесь, чтобы помочь со всеми вашими покупками! Я могу помочь с виртуальной примеркой, советами по стилю, рекомендациями товаров, помощью с размерами и многим другим. Что бы вы хотели узнать?"
      },
      uz: {
        greeting: "Salom! 👋 Men sizning AI xarid yordamchingizman. Men virtual kiyib ko'rish, stil maslahatlari, mahsulot tavsiyalari va boshqa ko'p narsalarda yordam bera olaman! Nimani o'rganishni xohlaysiz?",
        style: "✨ Sizning mukammal stilingizni topishga yordam berishdan xursandman! Men trendlarni tahlil qila olaman, kiyimlar taklif qila olaman va shaxsiyatingizga mos bo'lgan narsalarni topishga yordam bera olaman. Qanday stil sizni qiziqtiradi?",
        virtual: "🔮 Bizning Virtual Kiyib Ko'rish funksiyamiz ilg'or AI dan foydalanib, kiyimlar sizda qanday ko'rinishini ko'rsatadi! Siz rasm yuklashingiz yoki jonli kamerani ishlatishingiz mumkin. Sinab ko'rishni xohlaysizmi?",
        size: "📏 To'g'ri o'lcham juda muhim! Men sizning o'lchamlaringiz va bizning o'lcham bazamiz asosida o'lcham tavsiyalari bilan yordam bera olaman. O'lchamingizni topishda yordam kerakmi?",
        default: "🛍️ Men barcha xarid ehtiyojlaringizda yordam berish uchun shu yerdaman! Men virtual kiyib ko'rish, stil maslahatlari, mahsulot tavsiyalari, o'lcham yordami va boshqa ko'p narsalarda yordam bera olaman. Nimani bilishni xohlaysiz?"
      }
    };

    const lang = this.chatLanguage as keyof typeof responses;
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('salom') || lowerMessage.includes('привет')) {
      return {
        message: responses[lang]?.greeting || responses.en.greeting,
        suggestions: ["Virtual Try-On", "Style Quiz", "Product Search", "Size Guide"]
      };
    }
    
    if (lowerMessage.includes('style') || lowerMessage.includes('fashion') || lowerMessage.includes('стиль') || lowerMessage.includes('stil')) {
      return {
        message: responses[lang]?.style || responses.en.style,
        suggestions: ["Casual Style", "Formal Wear", "Trendy Outfits", "Color Matching"]
      };
    }
    
    if (lowerMessage.includes('try on') || lowerMessage.includes('virtual') || lowerMessage.includes('виртуальный') || lowerMessage.includes('virtual')) {
      return {
        message: responses[lang]?.virtual || responses.en.virtual,
        suggestions: ["Start Try-On", "Upload Photo", "Live Camera", "How it works"]
      };
    }
    
    if (lowerMessage.includes('size') || lowerMessage.includes('fit') || lowerMessage.includes('размер') || lowerMessage.includes("o'lcham")) {
      return {
        message: responses[lang]?.size || responses.en.size,
        suggestions: ["Size Calculator", "Measurement Guide", "Fit Tips", "Size Chart"]
      };
    }
    
    return {
      message: responses[lang]?.default || responses.en.default,
      suggestions: ["Virtual Try-On", "Style Advice", "Product Search", "Size Help"]
    };
  }
}

export const chatbotService = new ChatbotService();