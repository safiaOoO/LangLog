import React, { useState , useEffect } from 'react';
import "./nav.css"
import { Link, useNavigate } from 'react-router-dom';

const ProfilePic = ({ onClick }) => {
    const [imageSrc, setImageSrc] = useState('./images/profile.png'); 
  
    return (
      <div style={{ position: 'relative', width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden' ,cursor: 'pointer',}} onClick={onClick}>
        <img
          src={imageSrc}
          alt="profilepic"
          style={{ width: '100%', height: '100%', }}
        />
        
      </div>
    );
  };
  
const Navbar = () => {
  const [username, setUsername] = useState('User Name');
  const [activeLink, setActiveLink] = useState(null);
  const navigate = useNavigate();

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };
  useEffect(() => {
    const currentLink = document.querySelector(`.title.active`);
    if (currentLink) {
      currentLink.classList.remove('active');
    }

    const newActiveLink = document.querySelector(`.title:nth-child(${activeLink + 1})`);
    if (newActiveLink) {
      newActiveLink.classList.add('active');
    }
  }, [activeLink]);


  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleManageAccount = () => {
    navigate('/');
  };

  const handlePosts = () => {
    navigate('/postsandsaved');
  };

  const handleFollowers = () => {
    navigate('/followingfollowers');
  };

  
  return (
    <div className='navbar'>
    <img src="./images/logo.png" alt="logo" className='logo' />
    <div className='nav'>
      <Link to="/postspage" 
            className={`title ${activeLink === 0 ? 'active' : ''}`}
            onClick={() => handleLinkClick(0)}>
            Posts</Link>
      <Link to="/"
            className={`title ${activeLink === 1 ? 'active' : ''}`}
            onClick={() => handleLinkClick(1)}>
            Following</Link>
      <Link to="/" 
            className={`title ${activeLink === 2 ? 'active' : ''}`}
            onClick={() => handleLinkClick(2)}
            >Followers</Link>
      <Link to="/createpost" 
            className={`title ${activeLink === 3 ? 'active' : ''}`}
            onClick={() => handleLinkClick(3)}
            >Create post</Link>
      
    </div>
    <ProfilePic onClick={handleToggle}/>
    {isOpen && (
        <div className="dropdown-content">
          <div className="hi">Hello!</div>
          <div>{username}</div>
          <div className='link' onClick={handleManageAccount}>Manage your account</div>
          <div className='link' onClick={handlePosts}>My posts / Saved posts</div>
          <div className='link' onClick={handleFollowers}>following / followers</div>
        </div>
      )}
    </div>
  );
};

export { ProfilePic, Navbar };
