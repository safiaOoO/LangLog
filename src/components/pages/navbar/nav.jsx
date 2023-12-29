import React, { useState } from 'react';
import "./nav.css"
import { Link } from 'react-router-dom';

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
      <Link to="/postspage" className='title'>Posts</Link>
      <Link to="/" className='title'>Following</Link>
      <Link to="/" className='title'>Followers</Link>
      <Link to="/createpost" className='title'>Create post</Link>
      
    </div>
    <ProfilePic/>
    </div>
  );
};

export { ProfilePic, Navbar };
