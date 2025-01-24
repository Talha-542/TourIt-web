import { useState, useRef, useEffect } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import ChatForm from "./Form";
import ChatMessage from "./CHatMessage";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Reference to the last chat message
  const lastMessageRef = useRef(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Scroll to the last message whenever chatHistory updates
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  return (
    <div className="z-[9999]">
      <button
        onClick={toggleChatbot}
        className="fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition"
        aria-label="Toggle chatbot"
      >
        <IoChatbubbleEllipsesOutline size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-white border shadow-lg rounded-lg overflow-hidden z-[9999] flex flex-col">
          {/* Header */}
          <div className="p-4 border-b bg-white flex justify-between items-center">
            <h2 className="text-lg font-bold">ZephyrAI</h2>
            <p
              onClick={toggleChatbot}
              className="text-gray-500 hover:text-primary transition cursor-pointer"
              aria-label="Close chatbot"
            >
              <FaAngleDown />
            </p>
          </div>

          {/* Chat Messages Container */}
          <div className="flex-1 p-4 bg-white overflow-y-auto custom-scrollbar">
            <div className="flex items-start gap-2 mb-4">
              {/* Icon or Avatar */}
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-semibold text-primary">Z</span>
              </div>
              {/* Bot's Message */}
              <p className="text-sm text-white bg-primary p-2 rounded-md">
                Hi! I am ZephyrAI, your personal travel assistant. <br /> How can I help
                you today?
              </p>
            </div>

            {/* User messages */}
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
            <div ref={lastMessageRef} />
          </div>

          {/* Footer */}
          <div className="p-2 border-t bg-white">
            <ChatForm setChatHistory={setChatHistory} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
