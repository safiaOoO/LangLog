import React, { useState,useEffect } from 'react';
import { Navbar } from '../navbar/nav';
import './following-followers.css';
import Following from './following';
const Followings = () => {
  return (
    <div>
      <Following />
      <Following />
      <Following />
    </div>
  );
};

const Followers = () => {
  return (
    <div>
        <Following />
        <Following />
    </div>
  );
};

const Followingfollowers = () => {
  const [selectedTab, setSelectedTab] = useState('');
  

  const presstab = (tab) => {
    setSelectedTab(tab);
    
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && (tabParam === 'followers' || tabParam === 'following')) {
      setSelectedTab(tabParam);
    }
  }, []);


  return (
    <div>
      <Navbar />
      <div className="following-followers">
        <div className="buttons">
          <button
            style={{ background: selectedTab === 'following'  ? '#ECE3CE' : 'inherit' }}
            onClick={() => presstab('following')}
          >
            Following
          </button>
          <button
            style={{ background: selectedTab === 'followers' ? '#ECE3CE' : 'inherit' }}
            onClick={() => presstab('followers')}
          >
            Followers
          </button>
        </div>
        <hr />
        <div className="users">
          {selectedTab === 'following' && <Followings />}
          {selectedTab === 'followers' && <Followers />}
        </div>
      </div>
    </div>
  );
};

export default Followingfollowers;
