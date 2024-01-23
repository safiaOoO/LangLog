import "./postcontent.css"
import { ProfilePic, Navbar } from '../navbar/nav';
import Heart from '../postspage/heart';
import Follow from "../postspage/follow";
import { useState } from "react";
import Footer from "../footer/footer";
import Save from "../postspage/save";
import Commentsection from "./commentsection";
const Postcontent = ({ isMyPost }) => {
    const [username, setUsername] = useState('User Name');

    return(
        <div className="postpage" >
           <Navbar/>
           <div className="Post">
                <div className="first">
                    <ProfilePic/>
                    <div style={{margin:"10px 0"}}>{username}</div>
                    <Follow />
                </div>
                <div className="second">
                    <div className="postcontent">
                    <h2>How I spend the weekend</h2>
                    <p>Today I had the idea to speak about my weekend routine in Korean as a speaking practice. 
                        It’s been a long time since I’ve spoken in Korean so I may make some mistakes or struggle 
                        a bit to find the words, feel free to correct me and point it out if I make any mistakes.
                    </p>
                    </div>
                    <div className="tag-date">
                        <div className="tag">
                            <div className="language">Korean</div>
                            <div className="category">diary</div>
                        </div>
                        <div className="date">Dec 12/2023</div>
                    </div>
                </div>
           </div>
           <div className="content">
                <p>
                    Today I had the idea to speak about my weekend routine in Korean as a speaking practice. 
                    It’s been a long time since I’ve spoken in Korean so I may make some mistakes or struggle a bit to find the words, feel free to correct me and point it out if I make any mistakes. 
                
                    Today I had the idea to speak about my weekend routine in Korean as a speaking practice. 
                    It’s been a long time since I’ve spoken in Korean so I may make some mistakes or struggle a bit to find the words, feel free to correct me and point it out if I make any mistakes. 
                
                    Today I had the idea to speak about my weekend routine in Korean as a speaking practice. 
                    It’s been a long time since I’ve spoken in Korean so I may make some mistakes or struggle a bit to find the words, feel free to correct me and point it out if I make any mistakes. 
                    Today I had the idea to speak about my weekend routine in Korean as a speaking practice. 
                    It’s been a long time since I’ve spoken in Korean so I may make some mistakes or struggle a bit to find the words, feel free to correct me and point it out if I make any mistakes. 
                
                    Today I had the idea to speak about my weekend routine in Korean as a speaking practice. 
                    It’s been a long time since I’ve spoken in Korean so I may make some mistakes or struggle a bit to find the words, feel free to correct me and point it out if I make any mistakes. 
                    Today I had the idea to speak about my weekend routine in Korean as a speaking practice. 
                    It’s been a long time since I’ve spoken in Korean so I may make some mistakes or struggle a bit to find the words, feel free to correct me and point it out if I make any mistakes. 
                                    
                </p>
                <div className="icons">
                    <Heart style={{backgroundColor: "#FBF6F0"}}/>
                    <div className="nbr">65</div>
                    <Save/>
                    <div className="nbr" >10</div>
                </div>
           </div>
           <div className="comments">
              <Commentsection/>
           </div>
           <Footer/>
        </div>
    );
}

export default Postcontent;