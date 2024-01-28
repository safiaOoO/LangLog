import React, { useState, useEffect} from 'react';
import Heart from './heart';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import "./post.css"
import { ProfilePic } from '../navbar/nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import Save from './save';
import Follow from './follow';

const Post = () => {
    const [postInfo, setPostInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const handlepostpage = () => {
        navigate('/postcontent');
    };

    useEffect(() => {
        const fetchPostInformation = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/post/getPostInfo/${idPost}`);
                const postData = response.data;
                setPostInfo(postData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post information:', error);
                setLoading(false);
            }
        }

        fetchPostInformation();
    }, [idPost]);

  return (
    <div className='post' >
        <div className='first'>
            <ProfilePic/>
            <div>{postInfo.userName}</div>
        </div>
        <div className="second">
            <div className="postcontent" onClick={handlepostpage}>
                <h2>{postInfo.title}</h2>
                <p>{postInfo.content}
                </p>
                
            </div>
            <div className="tag-icon">
                <div className="tag">
                    <div className="language">{postInfo.languageName}</div>
                    <div className="category">{postInfo.category}</div>
                </div>
                <div className="icons">
                    <Heart/>
                    <div className="nbr">{postInfo.likeCount}</div>
                    <button><FontAwesomeIcon icon={faMessage} size='xl' onClick={handlepostpage} /></button>
                    <div className="nbr">{postInfo.commentCount}</div>
                    <Save/>
                    <div className="nbr">{postInfo.saveCount}</div>
                    
                </div>
            </div>
        </div>
    </div>
  );
};

export default Post;