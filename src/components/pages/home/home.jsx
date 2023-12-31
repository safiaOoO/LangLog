import "./home.css"
import { Link } from 'react-router-dom';
import LanguageBar from './langbar'
const Home = () => {
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