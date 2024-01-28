import React, { useState, useEffect } from 'react';
import "./postspage.css"
import { CircleFrame, Navbar } from '../navbar/nav';
import Post from './post';
import LanguageSelector from '../register/language'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CiFilter } from "react-icons/ci";
import { request } from 'express';

const Postspage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);

  useEffect(() => {
    fetchPostsByLanguages();
  }, []);

  const fetchPostsByLanguages = async () => {
    try {
      const response = await fetch(`http://localhost:8081/post/getPostsPage`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div>
       
      <Navbar/>
      
      <div className="container">
        <div className="customselect">
          <LanguageSelector
                        className="select"
                        pageType="page2"
                        name="languagefilter"
                        selectedLanguages={selectedLanguage}
                        setSelectedLanguages={setSelectedLanguage}
          />
          <div className="filter">
          <CiFilter  size={40} />
          </div>
        </div>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <div className="refresh"><button>Get new posts</button></div>
    </div>
  );
};

export default Postspage;