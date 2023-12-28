import React, { useState } from 'react';
import "./postspage.css"
import { CircleFrame, Navbar } from '../navbar/nav';
import Post from './post';


const Postspage = () => {
  

  return (
    <div>
       
      <Navbar/>
      <div className="container">
        <Post/>
        <Post/>
      </div>
      
    </div>
  );
};

export default Postspage;