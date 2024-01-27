import "./home.css"
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import LanguageBar from './langbar'
import axios from "axios";
const Home = () => {

    const navigate = useNavigate()

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
    
    return(
        <div className="home">
            <div className="herosection">
                <div className="container">
                    <img src="./images/langLog logo.png" alt="logo" className='logo' />
                    <div className="title">Where your language journey unfolds </div>
                    <div className="description">Dive into the adventure with us and become a part 
                        of our vibrant language-learning community!
                    </div>
                    <Link to="/login"><button>Get started</button></Link>
                    <LanguageBar/>
                </div>
                
            </div>
            
        </div>
    );
}

export default Home;