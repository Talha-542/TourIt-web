import PropTypes from 'prop-types';

const ChatMessage = ({ chat }) => {
  return (
    <div className={`flex items-start mb-2 ${chat.role === "model" ? 'justify-start' : 'justify-end'}`}>
      {chat.role === "model" && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
          <span className="text-xs font-semibold text-primary">Z</span>
        </div>
      )}
      <div className={`p-2 rounded-md ${chat.role === "model" ? 'bg-blue-200' : 'bg-green-200'} max-w-[70%]`}>
        <p className="text-sm text-black">{chat.text}</p>
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  chat: PropTypes.shape({
    role: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChatMessage;
