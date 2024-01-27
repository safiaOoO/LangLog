import "./login.css"
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [values, setValues] = useState({
        email:'',
        password:''
    })

    const navigate = useNavigate()
    
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    axios.defaults.withCredentials = true
    useEffect(()=>{
        axios.get('http://localhost:8081/checkUser')
        .then(res => {
            if(res.data.valid === true){
                navigate('/postspage')
            }
        })
        .catch(err=> console.log(err))
      })
    
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/auth/login',values)
        .then(res => {
            if(res.data.Login === true){
                navigate('/postspage')
            }else {
                alert(res.data.message)
            }
            })
        .catch(err => console.log(err))
    }

    return(
        <div className="login">
            <div className="card">
                <img src="images/Group 33.png" alt="Logo" className="logo" />
                <div className="title">Log In</div>
                <form action="" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                        type="text"
                        placeholder=''
                        name="email"
                        onChange={handleInput}
                        />
                        <label>Username/Email</label>
                    </div>

                    <div className="input-group">
                        <input
                        type="password"
                        name="password"
                        placeholder=" "
                        onChange={handleInput}
                        />
                        <label>Password</label>
                    </div>
                    <span>Forgot password?</span>
                    <button>Log in</button>
                </form>
                <p className="signup-link">Don’t have an account? <Link to="/register">sign up</Link> </p>
      
            </div>
        </div>
    );
}

export default Login;