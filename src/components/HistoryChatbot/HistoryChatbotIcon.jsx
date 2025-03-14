import React from 'react';

const HistoryChatbotIcon = ({ size = 24, color = 'currentColor' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Clock/History Base */}
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
      
      {/* Clock Hands */}
      <path d="M12 7V12L15 15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Globe Meridians */}
      <path d="M12 3C12 3 16 7 16 12C16 17 12 21 12 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 3C12 3 8 7 8 12C8 17 12 21 12 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Landmark */}
      <path d="M7 9L5 12H9L7 9Z" fill={color} />
      <path d="M17 9L15 12H19L17 9Z" fill={color} />
    </svg>
  );
};

export default HistoryChatbotIcon; 