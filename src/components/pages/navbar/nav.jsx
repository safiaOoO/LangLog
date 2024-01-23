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

  const handleLinkClick = (index,event) => {
    event.preventDefault();
    setActiveLink(index);
     const href = event.currentTarget.getAttribute('href');

    if (href) {
      navigate(href);
    }
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
    navigate('/manageaccount');
  };

  const handlePosts = () => {
    navigate('/postsandsaved');
  };

  const handleFollowers = (event) => {
    handleLinkClick(2,event);
    navigate(`/followingfollowers?tab=followers`);
  };

  const handleFollowing = (event) => {
    handleLinkClick(1,event);
    navigate(`/followingfollowers?tab=following`);
  };

  const handleFollowingFollowers = () => {
    navigate('/followingfollowers');
  };

  
  return (
    <div className='navbar'>
    <img src="./images/logo.png" alt="logo" className='logo' />
    <div className='nav'>
      <Link to="/postspage" 
            className={`title ${activeLink === 0 ? 'active' : ''}`}
            onClick={(event) => handleLinkClick(0,event)}>
            Posts</Link>
            <div className={`title ${activeLink === 1 ? 'active' : ''}`}
                 onClick={handleFollowing}>Following</div>
            <div className={`title ${activeLink === 2 ? 'active' : ''}`} onClick={handleFollowers}>Followers</div>
      
      <Link to="/createpost" 
            className={`title ${activeLink === 3 ? 'active' : ''}`}
            onClick={(event) => handleLinkClick(3,event)}
            >Create post</Link>
      
    </div>
    <ProfilePic onClick={handleToggle}/>
    {isOpen && (
        <div className="dropdown-content">
          <div className="hi">Hello!</div>
          <div>{username}</div>
          <div className='link' onClick={handleManageAccount}>Manage your account</div>
          <div className='link' onClick={handlePosts}>My posts / Saved posts</div>
          <div className='link' onClick={handleFollowingFollowers}>following / followers</div>
        </div>
      )}
    </div>
  );
};

export { ProfilePic, Navbar };
