import React, { useState, useEffect } from 'react';
import "./postspage.css"
import { CircleFrame, Navbar } from '../navbar/nav';
import Post from './post';
import LanguageSelector from '../register/language'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CiFilter } from "react-icons/ci";

const Postspage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/post/getPostsPage') 
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);
  const [selectedLanguage, setSelectedLanguage] = useState([]);

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
      
    </div>
  );
};

export default Postspage;