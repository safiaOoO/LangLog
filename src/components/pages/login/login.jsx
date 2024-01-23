import "./login.css"
import { Link } from 'react-router-dom';
const Login = () => {
    return(
        <div className="login">
            <div className="card">
                <img src="images/Group 33.png" alt="Logo" className="logo" />
                <div className="title">Log In</div>
                <form>
                    <div className="input-group">
                        <input
                        type="text"
                        placeholder=''
                        />
                        <label>Username/Email</label>
                    </div>

                    <div className="input-group">
                        <input
                        type="password"
                        placeholder=" "
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