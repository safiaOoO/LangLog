import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ProfilePic } from '../navbar/nav'
import Follow from '../postspage/follow'
import './following.css'
import { useNavigate } from 'react-router-dom';

const Following = ({api}) => {
    const navigate = useNavigate()
    const handlevisiteaccount=()=>{
        navigate('/account')
    }
    const [users, setUsers] = useState([])
    const [userStats, setUserStats] = useState({ posts: 0, followers: 0 })
  
    useEffect(() => {
      axios.get(api)
        .then(res => {
          const fetchedUsers = res.data
          setUsers(fetchedUsers)
        })
        .catch(err => console.error(err))
    }, [api])
  
    useEffect(() => {
      if (users.length > 0) {
        const userId = users[0].id // users 'id'
        axios.get(`http://localhost:8081/user/${userId}/userStats`)
          .then(res => {
            const fetchedUserStats = res.data
            setUserStats(fetchedUserStats)
          })
          .catch(err => console.error(err))
      }
    }, [users]);
  
    return (
      <div onClick={handlevisiteaccount}>
        {users.map(user => (
          <div className='user' key={user.id}>
            <div className='first'>
              <ProfilePic /> 
            </div>
            <div className="second">
              <div className="userinfo">
                <div className="username">{user.username}</div>
                <div className="bio">{user.bio}</div>
              </div>
                {/* <div className="tag">
              {users.languages.map((language, index) => (
                <div className="language" key={index}>{language}</div>
              ))}
            </div> */}
          </div>
          <div className="third">
            <div className="countpost">
              <div className="number">{userStats.posts}</div>
              <div className="posts">Posts</div>
            </div>
            <div className="countfollow">
              <div className="number">{userStats.followers}</div>
              <div className="follow">Followers</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Following
