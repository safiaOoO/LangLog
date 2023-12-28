import React, { useState } from 'react';
import "./nav.css"

const ProfilePic = () => {
    const [imageSrc, setImageSrc] = useState('./images/profile.png'); 
  
    return (
      <div style={{ position: 'relative', width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden' }}>
        <img
          src={imageSrc}
          alt="profilepic"
          style={{ width: '100%', height: '100%', }}
        />
        
      </div>
    );
  };
  
const Navbar = () => {
  

  return (
    <div className='navbar'>
    <img src="./images/logo.png" alt="logo" className='logo' />
    <div className='nav'>
      <div className='title'>Posts</div>
      <div className='title'>Following</div>
      <div className='title'>Followers</div>
      <div className='title'>Create post</div>
    </div>
    <ProfilePic/>
    </div>
  );
};

export { ProfilePic, Navbar };
