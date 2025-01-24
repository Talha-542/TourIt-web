import { useRef } from "react";
import PropTypes from 'prop-types';

const ChatForm = ({ setChatHistory }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();

    if (!userMessage) return;
    inputRef.current.value = "";
    setChatHistory((history) => [...history, { role: "user", text: userMessage }]);
    setTimeout(()=>    setChatHistory((history) => [...history, { role: "model", text: "Thinking...." }]),600);
    console.log(userMessage);
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex items-center">
      <input
        type="text"
        ref={inputRef}
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <button className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition ml-2">
        Send
      </button>
    </form>
  );
};

ChatForm.propTypes = {
  setChatHistory: PropTypes.func.isRequired,
};

export default ChatForm;
