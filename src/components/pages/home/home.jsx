import "./home.css"
import { Link } from 'react-router-dom';

const Home = () => {
    return(
        <div className="home">
            this is the home
            <Link to="/login">login</Link>
        </div>
    );
}

export default Home;