import React, { useState } from 'react';
import { Navbar } from '../navbar/nav';
import Post from '../postspage/post';
import Mypost from './mypost';
import './myposts-saved.css';

const MyPosts = () => {
  return (
    <div>
      <Mypost api="http://localhost:8081/post/myPosts" />
    </div>
  );
};

const SavedPosts = () => {
  return (
    <div>
      <Post api="http://localhost:8081/post/mySavedPosts" />
    </div>
  );
};

const PostsandSaved = () => {
  const [selectedTab, setSelectedTab] = useState('myPosts');
  

  const presstab = (tab) => {
    setSelectedTab(tab);
    
  };

  return (
    <div>
      <Navbar />
      <div className="post-saved">
        <div className="buttons">
          <button
            style={{ background: selectedTab === 'myPosts'  ? '#ECE3CE' : 'inherit' }}
            onClick={() => presstab('myPosts')}
          >
            My Posts
          </button>
          <button
            style={{ background: selectedTab === 'savedPosts' ? '#ECE3CE' : 'inherit' }}
            onClick={() => presstab('savedPosts')}
          >
            Saved
          </button>
        </div>
        <hr />
        <div className="posts">
          {selectedTab === 'myPosts' && <MyPosts />}
          {selectedTab === 'savedPosts' && <SavedPosts />}
        </div>
      </div>
    </div>
  );
};

export default PostsandSaved;
