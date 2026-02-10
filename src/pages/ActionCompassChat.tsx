import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Sparkles,
  TrendingDown,
  ShoppingCart,
  Clock,
  RefreshCw,
  Bot,
  User,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatMessage, mockChatHistory, generateRecommendation, mockParts } from '@/lib/mockData';

const suggestedQuestions = [
  'Should I buy $2M of MCU stock now?',
  'What parts are at highest risk of shortage?',
  'When should I place orders for Q3 production?',
  'Compare pricing trends for STM32 vs ESP32',
];

export default function ActionCompassChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatHistory);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const recommendation = generateRecommendation('p1');
    
    const aiResponse: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      role: 'assistant',
      content: generateAIResponse(inputValue, recommendation),
      timestamp: new Date(),
      recommendation,
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiResponse]);
  };

  const generateAIResponse = (query: string, rec: ReturnType<typeof generateRecommendation>) => {
    const actionEmoji = rec.action === 'Buy Now' ? '🟢' : rec.action === 'Wait' ? '🟡' : '🔄';
    
    return `Based on my analysis of your query "${query.slice(0, 50)}${query.length > 50 ? '...' : ''}", here's my recommendation:

${actionEmoji} **${rec.action}** (${rec.confidence}% confidence)

**Analysis Summary:**
${rec.drivers.map(d => `• ${d}`).join('\n')}

**Financial Impact:**
• Potential savings: $${(rec.financialImpact.savings / 1000).toFixed(0)}K
• Risk adjustment: ${rec.financialImpact.riskDelta > 0 ? '+' : ''}${rec.financialImpact.riskDelta}%

**Recommended Actions:**
1. ${rec.action === 'Buy Now' ? 'Place orders for 60% of forecasted demand immediately' : rec.action === 'Wait' ? 'Monitor market conditions for the next 2-4 weeks' : 'Begin qualification of alternative suppliers'}
2. ${rec.action === 'Buy Now' ? 'Reserve remaining 40% with flexible delivery terms' : rec.action === 'Wait' ? 'Set price/lead-time alerts for trigger conditions' : 'Request samples from top 3 alternatives'}
3. Review this recommendation in 14 days

Would you like me to simulate different scenarios or drill down into specific parts?`;
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  const ActionIcon = (action: string) => {
    switch (action) {
      case 'Buy Now':
        return <ShoppingCart className="w-4 h-4" />;
      case 'Wait':
        return <Clock className="w-4 h-4" />;
      default:
        return <RefreshCw className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 border-b border-border bg-card/50 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Action Compass</h1>
            <p className="text-sm text-muted-foreground">
              AI-powered procurement recommendations
            </p>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gradient-to-br from-primary/20 to-accent/20 text-primary'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                {/* Message Content */}
                <div
                  className={
                    message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                  }
                >
                  <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                    {message.content.split(/(\*\*.*?\*\*)/).map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return (
                          <strong key={i} className="font-semibold">
                            {part.slice(2, -2)}
                          </strong>
                        );
                      }
                      return part;
                    })}
                  </div>

                  {/* Recommendation Badge */}
                  {message.recommendation && (
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`recommendation-badge ${
                            message.recommendation.action === 'Buy Now'
                              ? 'recommendation-buy'
                              : message.recommendation.action === 'Wait'
                              ? 'recommendation-wait'
                              : 'recommendation-resource'
                          }`}
                        >
                          {ActionIcon(message.recommendation.action)}
                          {message.recommendation.action}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {message.recommendation.confidence}% confidence
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div className="p-3 bg-secondary/50 rounded-lg">
                          <p className="text-xs text-muted-foreground">Potential Savings</p>
                          <p className="text-lg font-bold text-success">
                            ${(message.recommendation.financialImpact.savings / 1000).toFixed(0)}K
                          </p>
                        </div>
                        <div className="p-3 bg-secondary/50 rounded-lg">
                          <p className="text-xs text-muted-foreground">Risk Impact</p>
                          <p className="text-lg font-bold text-primary flex items-center gap-1">
                            <TrendingDown className="w-4 h-4" />
                            {Math.abs(message.recommendation.financialImpact.riskDelta)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground mt-2">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="chat-bubble-ai">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                    className="w-2 h-2 rounded-full bg-primary"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 2 && (
        <div className="px-6 pb-4">
          <p className="text-sm text-muted-foreground mb-3">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleSuggestedQuestion(question)}
                className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 text-foreground rounded-full transition-colors flex items-center gap-2"
              >
                {question}
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-6 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about procurement decisions, part risks, or market trends..."
            className="flex-1 h-12 bg-secondary border-border"
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="h-12 px-6 bg-primary text-white hover:opacity-90"
          >
            <Send className="h-8 w-8 text-accent" />
          </Button>
        </div>
      </div>
    </div>
  );
}
