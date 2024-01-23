import Footer from "../footer/footer";
import { Navbar,ProfilePic } from "../navbar/nav";
import "./manageaccount.css"
import { useState,useEffect } from "react";
import axios from 'axios';
import LanguageSelector from "../register/language"

const ManageAcc = () => {
  const [selectedLanguagesToLearn, setSelectedLanguagesToLearn] = useState([]);
  const [selectedMotherTongues, setSelectedMotherTongues] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
    
  const defaultUserData = {
    fullname: 'fullname',
    username: 'username',
    bio:'bio',
    languagesspeak:['arabic','english','french'],
    languagestolearn:['italian' , 'korean'],
  };
  const [userData, setUserData] = useState(defaultUserData);
  const [formValues, setFormValues] = useState(defaultUserData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    setSelectedLanguagesToLearn(defaultUserData.languagestolearn);
    setSelectedMotherTongues(defaultUserData.languagesspeak);
  }, []);

  const handleSave = () => {
    setUserData(formValues);
    setIsEditing(false);
    console.log(formValues);
  };
    
      
    return(
        <div >
            <Navbar/>
            <div className="editprofile">
                 <h1>Manage your account</h1>
                 <div className="infoscard">
                  <div className="pic">
                  <ProfilePic/>
                  </div>
                 <div className="infos">
                  <div className="fullname">Full Name: {userData.fullname} </div>
                  <div className="username">User Name : {userData.username} </div>
                  <div className="bio"> Bio:  {userData.bio} </div>
                  <div className="speak">Languages that you speak:  {userData.languagesspeak.join(', ')}</div>
                  <div className="tolearn">Target Languages: {userData.languagestolearn.join(', ')}</div>
                  {!isEditing && (
                  <button className="edit" onClick={() => setIsEditing(true)}>Edit Profile</button>)}
                 </div>
                 </div>
                 {isEditing && (
                <form >
                    <h2>Edit Profile</h2>
                    <div className="input-group">
                        <input
                        className="fullname"
                        type="text"
                        name="fullname"
                        value={formValues.fullname}
                        onChange={handleChange}
                        placeholder=''
                        />
                        <label>Full Name</label>
                    </div>
                    <div className="input-group">
                        <input
                        className="username"
                        type="text"
                        name="username"
                        value={formValues.username}
                        onChange={handleChange}
                        placeholder=''
                        />
                        <label>User Name</label>
                    </div>
                    <div className="input-group">
                        <input
                        className="bio"
                        type="text"
                        name="bio"
                        value={formValues.bio}
                        onChange={handleChange}
                        placeholder=''
                        />
                        <label>Bio</label>
                    </div>
                    <h5>Languages that you speak:  </h5>  
                    <LanguageSelector 
                    name="languagesspeak"
                    selectedLanguages={selectedMotherTongues}
                    setSelectedLanguages={setSelectedMotherTongues}
                    api=""
                    />  
                    <h5>Target Languages: </h5>  
                    <LanguageSelector
                    name="languagestolearn"
                    selectedLanguages={selectedLanguagesToLearn}
                    setSelectedLanguages={setSelectedLanguagesToLearn}
                    api=""
                    /> 
                    <button type="submit" onClick={handleSave}>Save changes</button>
                </form>)}
            </div>
            
            <Footer/>
        </div>
    );
}

export default ManageAcc;