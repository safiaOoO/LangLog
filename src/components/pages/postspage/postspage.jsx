import React, { useState } from 'react';
import "./postspage.css"
import { CircleFrame, Navbar } from '../navbar/nav';
import Post from './post';
import LanguageSelector from '../register/language'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CiFilter } from "react-icons/ci";

const Postspage = () => {
  
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
         
        <Post/>
        <Post/>
      </div>
      
    </div>
  );
};

export default Postspage;