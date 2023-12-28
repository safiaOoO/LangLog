import React, { useState } from 'react';
import { IoMdHeart } from 'react-icons/io';

const Heart = () => {
  const [isPressed, setPressed] = useState(false);

  const pressHeart = () => {
    setPressed(!isPressed);
  };

  return (
    <div>
        <button style={{border:'none',backgroundColor:'white',borderRadius:'30px',marginTop:'5px'}}>
      <IoMdHeart size={25} onClick={pressHeart} style={{
        cursor: 'pointer',
        display: 'inline-block',
        color: isPressed ? 'red' : 'transparent',
        stroke: isPressed ? 'none' : 'black', 
        strokeWidth: 30,
      }}/></button>
    </div>
  );
};

export default Heart;