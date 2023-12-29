import React, { useState } from 'react';
import { IoMdBookmark } from 'react-icons/io';

const Save = () => {
  const [isPressed, setPressed] = useState(false);

  const toggleSave = () => {
    setPressed(!isPressed);
  };

  return (
    <div>
      <button
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          borderRadius: '30px',
          marginTop: '5px',
        }}
      >
        <IoMdBookmark
          size={25}
          onClick={toggleSave}
          style={{
            cursor: 'pointer',
            display: 'inline-block',
            color: isPressed ? 'black' : 'transparent',
            stroke: isPressed ? 'none' : 'black', 
            strokeWidth: 30,
          }}
        />
      </button>
    </div>
  );
};

export default Save;
