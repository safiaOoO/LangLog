import React, { useState } from 'react';

const Follow = () => {
  const [isPressed, setPressed] = useState(false);

  const follow = () => {
    setPressed(!isPressed);
  };

  return (
    <div>
        <button onClick={follow} style={{
            border:'solid 2px #739072',
            width: '80px',
            backgroundColor:'white',
            borderRadius:'30px',
            marginTop:'5px',
            cursor: 'pointer',
            display: 'inline-block',
            color:  'black', 
             }}
             >   
             {isPressed ? 'Following' : 'Follow'}
        </button>
    </div>
  );
};

export default Follow;