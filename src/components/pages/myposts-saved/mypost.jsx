import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Heart from '../postspage/heart'
import Save from '../postspage/save'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import { ProfilePic } from '../navbar/nav'
import './mypost.css'

const Mypost = (api) => {
  const [posts, setPosts] = useState([])

  const navigate = useNavigate()

  const handlePostPage = (postId) => {
    navigate(`/mypostcontent/${postId}`)
  }

  useEffect(() => {
    axios.get(api)
      .then(response => setPosts(response.data))
      .catch(error => console.error(error))
  }, [])

  return (
    <div>
      {posts.map(post => (
        <div className='mypost' key={post.id}>
          <div className="content">
            <div className="postcontent" onClick={() => handlePostPage(post.id)}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
            <div className="tag-icon">
              <div className="tag">
                {post.tags.map((tag, index) => (
                  <div className="language" key={index}>{tag}</div>
                ))}
              </div>
              <div className="icons">
                <Heart />
                <div className="nbr">{post.likes}</div>
                <button><FontAwesomeIcon icon={faMessage} size='xl' onClick={() => handlePostPage(post.id)} /></button>
                <div className="nbr">{post.comments}</div>
                <Save />
                <div className="nbr">{post.saves}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Mypost
