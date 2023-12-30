import React, { useState, useEffect} from 'react';
import { ProfilePic } from '../navbar/nav';
import Follow from '../postspage/follow';
import './following.css'
const Following = () => {
    
  return (
    <div className='user' >
        <div className='first'>
            <ProfilePic/>
            <Follow/>
        </div>
        <div className="second">
            <div className="userinfo" >
                <div className="username">User Name</div>
                <div className="bio">Bio lkahfienfdams vifusnd fh dihe fkdf fc iuwe dfxhof ddfasliudl iudf odfhuasd dlkjp
                    d f iodf dkdf sj eo ldf asoidf dhc vdfsopdfm ld cdhfdkf  siofd fk oish  oidjf.</div> 
                
            </div>
            
            <div className="tag">
                <div className="language">Korean</div>
                <div className="language">English</div>
                <div className="language">French</div>
            </div>  
        </div>
        <div className="third">
            <div className="countpost">
                <div className="number">122</div>
                <div className="posts">posts</div>
            </div>
            <div className="countfollow">
                <div className="number">122</div>
                <div className="follow">followers</div>
            </div>
        </div>
    </div>
  );
};

export default Following;