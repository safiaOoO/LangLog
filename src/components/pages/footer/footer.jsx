import "./footer.css"

const Footer = () => {

    return(
        <div className="footer" >
           <div className="cntr">
                <div className="first">
                    <img src="./images/logo.png" alt="logo" className='logo' />
                    <p> Where your language journey unfolds. </p>
                </div>
                <div className="second">
                    <h2>About us</h2>
                    <p>LangLog is a platform for language learners all over the world, that provides a safe place to practice your Target Language and help fellow learners through their learning journey. </p>
                </div>
                <div className="third">
                    <h2>Contact us</h2>
                    <div className="links">
                        <a href="#">@langlog</a>
                        <a href="#">langlog@gmail.com</a>
                    </div>
                </div>
           </div>
           <div className="cntr">
                <hr class="line"/>
                    <h4>All rights reserved</h4>
                <hr class="line"/>
           </div>
        </div>
    );
}

export default Footer;