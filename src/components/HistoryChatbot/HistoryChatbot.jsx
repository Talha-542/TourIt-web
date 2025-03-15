import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaTimes, FaPaperPlane } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './HistoryChatbot.css';
import { useHistoryChatbot } from './HistoryChatbotContext';
import HistoryChatbotIcon from './HistoryChatbotIcon';

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 0.9,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Custom renderer for markdown components to ensure they fit in the chatbox
const MarkdownRenderer = ({ children }) => {
  return (
    <div className="compact-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Make headings smaller
          h1: (props) => <h3 className="md-h1" {...props} />,
          h2: (props) => <h4 className="md-h2" {...props} />,
          h3: (props) => <h5 className="md-h3" {...props} />,
          // Style links
          a: (props) => <a className="md-link" target="_blank" rel="noopener noreferrer" {...props} />,
          // Style lists
          ul: (props) => <ul className="md-ul" {...props} />,
          ol: (props) => <ol className="md-ol" {...props} />,
          li: (props) => <li className="md-li" {...props} />,
          // Style code blocks
          code: ({ inline, ...props }) => 
            inline ? 
              <code className="md-inline-code" {...props} /> : 
              <code className="md-block-code" {...props} />,
          pre: (props) => <pre className="md-pre" {...props} />,
          // Style blockquotes
          blockquote: (props) => <blockquote className="md-blockquote" {...props} />,
          // Style tables
          table: (props) => <div className="md-table-wrapper"><table className="md-table" {...props} /></div>,
          // Style images to fit in the chat
          img: ({ alt, ...props }) => {
            const ImgComponent = ({ alt, ...rest }) => <img className="md-img" alt={alt} {...rest} />;
            ImgComponent.propTypes = {
              alt: PropTypes.string
            };
            return <ImgComponent alt={alt || 'Image'} {...props} />;
          },
          // Reduce paragraph spacing
          p: (props) => <p className="md-p" {...props} />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

MarkdownRenderer.propTypes = {
  children: PropTypes.node.isRequired
};

const StreamingText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
        scrollToBottom();
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  return (
    <>
      <MarkdownRenderer>{displayedText}</MarkdownRenderer>
      <div ref={messagesEndRef} />
    </>
  );
};

StreamingText.propTypes = {
  text: PropTypes.string.isRequired
};

const HistoryChatbot = () => {
  const { isOpen, toggleChatbot, closeChatbot, currentLocation } = useHistoryChatbot();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState(null);
  const [showSignupDialog, setShowSignupDialog] = useState(false);
  const [user, setUser] = useState(null);
  
  // Get user data from localStorage only once on component mount
  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  // Initialize chat session when user or location changes
  useEffect(() => {
    if (user && !chatSession) {
      initChatSession();
    }
  }, [user, currentLocation, chatSession]);

  const initChatSession = async () => {
    // Only initialize if we don't already have a session
    if (chatSession) return;
    
    try {
      const initialHistory = [
        {
          role: "user",
          parts: [
            {
              text: "You are a history and culture expert travel guide. Your name is HistoryGuide. You specialize in providing historical information, cultural insights, and interesting facts about travel destinations. Keep your responses focused on history, architecture, cultural traditions, and local customs. If asked about something unrelated to travel, history or culture, politely redirect the conversation to travel-related topics. Be concise but informative. Format your responses using markdown for better readability, but keep them very compact to fit in a small chat window. Use minimal spacing between paragraphs and sections. Use headings sparingly and keep paragraphs short. Avoid excessive line breaks. Use bold for emphasis rather than creating new sections when possible.",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "I understand my role as HistoryGuide, a specialized travel assistant focused on history and culture. I'll provide concise, informative responses about historical sites, architectural styles, cultural traditions, and local customs for travel destinations. If questions stray from travel, history, or culture, I'll gently redirect the conversation to these topics. I'll use compact markdown formatting with minimal spacing and short paragraphs. I'll use bold for emphasis rather than creating new sections when possible. How can I help with your travel destination's history today?",
            },
          ],
        },
      ];

      const session = model.startChat({
        generationConfig,
        history: initialHistory,
      });

      setChatSession(session);

      // Add welcome message
      setMessages([
        {
          role: 'assistant',
          content: currentLocation 
            ? `Hello! I'm your history and culture guide. I notice you're exploring ${currentLocation}. Would you like to learn about its historical significance or cultural background?`
            : "Hello! I'm your history and culture guide. I can provide historical information and cultural insights about any destination you're interested in. What place would you like to learn about?"
        }
      ]);
    } catch (error) {
      console.error("Error initializing chat session:", error);
      toast.error("Failed to initialize the history guide. Please try again later.");
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    if (!user) {
      setShowSignupDialog(true);
      return;
    }

    if (!chatSession) {
      initChatSession();
      return;
    }

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    setIsLoading(true);
    
    try {
      let contextualizedMessage = userMessage;
      if (currentLocation && !userMessage.toLowerCase().includes(currentLocation.toLowerCase())) {
        contextualizedMessage = `For the location ${currentLocation}: ${userMessage}`;
      }
      
      const result = await chatSession.sendMessage(contextualizedMessage);
      const response = await result.response.text();
      
      // Add assistant response to chat with isStreaming flag
      setMessages(prev => [...prev, { role: 'assistant', content: response, isStreaming: true }]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get a response. Please try again.");
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        isStreaming: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleToggleChatbot = () => {
    if (!user && !isOpen) {
      setShowSignupDialog(true);
      return;
    }
    toggleChatbot();
  };

  return (
    <>
      {/* Chatbot Icon */}
      <div 
        className="history-chatbot-icon"
        onClick={handleToggleChatbot}
        title="Tourly"
      >
        <HistoryChatbotIcon size={28} />
      </div>

      {/* Chatbot Panel */}
      {isOpen && (
        <div className="history-chatbot-panel">
          <div className="history-chatbot-header">
            <div className="history-chatbot-title">
              <HistoryChatbotIcon size={20} color="white" />
              <h3>Tourly</h3>
            </div>
            <button
              className="history-chatbot-close"
              onClick={closeChatbot}
            >
              <FaTimes size={16} />
            </button>
          </div>

          <div className="history-chatbot-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`history-chatbot-message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
              >
                <div className="message-content">
                  {message.role === 'user' ? (
                    message.content
                  ) : message.isStreaming ? (
                    <StreamingText text={message.content} />
                  ) : (
                    <MarkdownRenderer>{message.content}</MarkdownRenderer>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="history-chatbot-message assistant-message">
                <div className="message-content typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          <div className="history-chatbot-input">
            <Input
              type="text"
              placeholder="Ask about history and culture..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <Button 
              size="icon"
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
            >
              <FaPaperPlane size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Sign Up Dialog */}
      <Dialog open={showSignupDialog} onOpenChange={setShowSignupDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Sign In Required</DialogTitle>
            <DialogDescription className="text-center">
              <div className="flex justify-center my-6">
                <HistoryChatbotIcon size={48} color="#3b82f6" />
              </div>
              <p className="text-lg mb-6">
                Please sign in to use Tourly your personal travel guide chatbot and explore the rich history and culture of your destinations.
              </p>
              <Button
                onClick={() => {
                  setShowSignupDialog(false);
                  // Redirect to sign-in dialog or page
                  document.querySelector('header button').click();
                }}
                className="w-full py-6 flex gap-4 items-center justify-center text-lg transition-all hover:scale-105"
              >
                Sign In
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HistoryChatbot;