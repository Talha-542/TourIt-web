import { useState } from "react";
import PropTypes from 'prop-types';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";

const BotMessage = ({ message }) => (
  <div className="flex items-start mb-4">
    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
      <span className="text-xs font-semibold text-primary">Z</span>
    </div>
    <div className="bg-primary/10 rounded-lg p-3 max-w-[80%]">
      <p className="text-sm">{message}</p>
    </div>
  </div>
);

BotMessage.propTypes = {
  message: PropTypes.string.isRequired
};

const UserMessage = ({ message }) => (
  <div className="flex items-start mb-4 justify-end">
    <div className="bg-primary rounded-lg p-3 max-w-[80%]">
      <p className="text-sm text-white">{message}</p>
    </div>
  </div>
);

UserMessage.propTypes = {
  message: PropTypes.string.isRequired
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hi! I am ZephyrAI, your personal travel assistant. How can I help you today?' }
  ]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { type: 'user', content: message }]);
      setMessage("");
      // Add bot response after user message (you can modify this based on your needs)
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          content: "I'm still under development, but I'll be able to help you plan your trips soon!" 
        }]);
      }, 1000);
    }
  };

  return (
    <div className="z-[9999]">
      <button
        onClick={toggleChatbot}
        className="fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition z-[9999]"
      >
        <IoChatbubbleEllipsesOutline size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-white border shadow-lg rounded-lg overflow-hidden z-[9999] flex flex-col">
          <div className="p-4 border-b bg-white flex justify-between items-center">
            <h2 className="text-lg font-bold">ZephyrAI</h2>
            <p onClick={toggleChatbot} className="cursor-pointer hover:text-primary">
              <FaAngleDown />
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-white">
            {messages.map((msg, index) => (
              msg.type === 'bot' ? 
                <BotMessage key={index} message={msg.content} /> :
                <UserMessage key={index} message={msg.content} />
            ))}
          </div>
          <div className="p-2 border-t bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
