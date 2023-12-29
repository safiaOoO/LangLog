import React, { useEffect, useState } from 'react';
import ProfilePictureUpload from './profilepicture';
import { Fab } from '@mui/material';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import "./register.css"
import LanguageSelector from "./language"
import axios from 'axios';
import { Navigate } from 'react-router-dom';
const Register = () => {
  
  
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    fullname: '',
    username: '',
    picture: '',
    email: '',
    password: '',
    confirmPassword: '',
    languagestolearn: [],
    languagesspeak: [],
  });
  const [passwordError, setPasswordError] = useState(false);
  const [selectedLanguagesToLearn, setSelectedLanguagesToLearn] = useState([]);
  const [selectedMotherTongues, setSelectedMotherTongues] = useState([]);

  const handleImageChange = (selectedImage,file) => {
    setUserData((prevData) => ({ ...prevData, picture: selectedImage ,pictureName: file.name }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
    if (name === 'confirmPassword') {
      setPasswordError(value !== userData.password);
    }
  };

  const handleNext = () => {
    if (step === 2 && userData.password !== userData.confirmPassword) {
      setPasswordError(true);
    } else {
    setStep((prevStep) => prevStep + 1);}
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSave = () => {
    const updatedUserData = {
      ...userData,
      languagestolearn: selectedLanguagesToLearn,
      languagesspeak: selectedMotherTongues,
    };
    axios.post('http://localhost:8081/auth/signup', updatedUserData)
    .then(res => {
      console.log(res.data)})
    .catch(error => {
      console.error('Error:', error);
    });
  };

  
  return (
    <div className='register'>
      {step === 1 && (
        <div className='card'>
          <img src="images/Group 33.png" alt="Logo" className="logo" />
          <div className="title">Create account</div>
          <p>Embark on your language-learning adventure with us! 
            Start practicing your target language and share your 
            progress with a supportive community.</p>

          <div className="container">
            <ProfilePictureUpload  onChange={handleImageChange}/>
            <div>
              <div className="input-group">
                <input
                name="fullname"
                value={userData.fullname}
                onChange={handleChange}
                type="text"
                placeholder=''
                />
                <label>Full name</label>
              </div>

              <div className="input-group">
                  <input
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  type="text"
                  placeholder=" "
                  />
                  <label>Username</label>
              </div>
            </div>
            
            <Fab sx={{backgroundColor:"#739072",width:"50px",height:"50px",color:"white",marginRight:"-120px"}} onClick={handleNext} >
              <NavigateNextIcon/>
            </Fab> 
          </div>  
          
        </div>
      )}

      {step === 2 && (
        <div className='card'>
          <img src="images/Group 33.png" alt="Logo" className="logo" />
          <p>Embark on your language-learning adventure with us! 
            Start practicing your target language and share your 
            progress with a supportive community.</p>
          <div className="cntr">
              <div className="input-group">
                <input
                name="email"
                value={userData.email}
                onChange={handleChange}
                type="email"
                placeholder=''
                />
                <label>Email</label>
              </div>

              <div className="input-group">
                  <input
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  type="password"
                  placeholder=" "
                  />
                  <label>Set Password</label>
              </div>
              <div className="input-group">
                  <input
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                  type="password"
                  placeholder=" "
                  />
                  <label>Confirm Password</label>
                  {passwordError && <p style={{ color: 'red',width:'250px' }}>Passwords do not match</p>}
              </div>
            </div>
            <div className="nextprev">
              <Fab sx={{backgroundColor:"#739072",width:"50px",height:"50px",color:"white"}} onClick={handlePrevious} >
                <NavigateBeforeIcon/>
              </Fab> 
              <Fab sx={{backgroundColor:"#739072",width:"50px",height:"50px",color:"white"}} onClick={handleNext} >
                <NavigateNextIcon/>
              </Fab> 
            </div>
            
        </div>
      )}

      {step === 3 && (
        <div className='card'>
          <img src="images/Group 33.png" alt="Logo" className="logo" />
          <p>LangLog is a platform where you can practice your Target language(s) 
            and also lend a helping hand to people learning your language</p>
          <h5>Choose your Target Language(s): </h5>  
          <LanguageSelector 
          pageType="page1"
          name="languagestolearn"
          selectedLanguages={selectedLanguagesToLearn}
          setSelectedLanguages={setSelectedLanguagesToLearn}
          />  
          <h5>Choose the Language(s) that you speak: </h5>  
          <LanguageSelector
          pageType="page1"
          name="languagesspeak"
          selectedLanguages={selectedMotherTongues}
          setSelectedLanguages={setSelectedMotherTongues}
          /> 
          <button className='button' onClick={handleSave}>sign up</button>
          <div className="prev">
          <Fab sx={{backgroundColor:"#739072",width:"50px",height:"50px",color:"white"}} onClick={handlePrevious} >
                <NavigateBeforeIcon/>
          </Fab> 
          </div>
          
        </div>
      )}

      {/* <div>
        <div>{Array.from({ length: 3 }, (_, index) => (index + 1 === step ? '●' : '○')).join('')}</div>
      </div> */}
    </div>
  );
};

export default Register;
