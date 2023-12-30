import React, { useState } from 'react';
import { Navbar } from '../navbar/nav';
import './following-followers.css';
import Following from './following';
const Followings = () => {
  return (
    <div>
      
    </div>
  );
};

const Followers = () => {
  return (
    <div>
      
    </div>
  );
};

const Followingfollowers = () => {
  const [selectedTab, setSelectedTab] = useState('myPosts');
  

  const presstab = (tab) => {
    setSelectedTab(tab);
    
  };

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
          {selectedTab === 'following' && <Following />}
          {/* {selectedTab === 'followers' && <Follower />} */}
        </div>
      </div>
    </div>
  );
};

export default Followingfollowers;
