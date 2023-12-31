import React, { useState } from 'react';
import Heart from '../postspage/heart';
import { useNavigate } from 'react-router-dom';
import { ProfilePic } from '../navbar/nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import Save from '../postspage/save';
import './mypost.css'
const Mypost = () => {
    const [username, setUsername] = useState('User Name');
    const navigate = useNavigate();
    const handlepostpage = () => {
        navigate('/mypostcontent');
      };
  return (
    <div className='mypost' >
        
        <div className="content">
            <div className="postcontent" onClick={handlepostpage} >
                <h2>How I spend the weekend</h2>
                <p>Today I had the idea to speak about my weekend routine in Korean as a speaking practice. 
                    It’s been a long time since I’ve spoken in Korean so I may make some mistakes or struggle 
                    a bit to find the words, feel free to correct me and point it out if I make any mistakes.
                </p>
                
            </div>
            <div className="tag-icon">
                <div className="tag">
                    <div className="language">Korean</div>
                    <div className="category">diary</div>
                </div>
                <div className="icons">
                    <Heart/>
                    <div className="nbr">65</div>
                    <button><FontAwesomeIcon icon={faMessage} size='xl' /></button>
                    <div className="nbr">14</div>
                    <Save/>
                    <div className="nbr">10</div>
                    
                </div>
            </div>
        </div>
    </div>
  );
};

export default Mypost;