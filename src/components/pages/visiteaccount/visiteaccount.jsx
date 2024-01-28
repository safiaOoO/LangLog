import Footer from "../footer/footer";
import { Navbar,ProfilePic } from "../navbar/nav";
import "./visiteaccount.css"
import { useState,useEffect } from "react";
import axios from 'axios';
import LanguageSelector from "../register/language"
import { useNavigate } from "react-router-dom";

const Account = () => {

  const navigate = useNavigate()

  const defaultUserData = {
    fullname: 'fullname',
    username: 'username',
    bio:'No bio',
    languagesspeak:['arabic','english','french'],
    languagestolearn:['italian' , 'korean'],
  };
  const [userData, setUserData] = useState(defaultUserData);
//   const [formValues, setFormValues] = useState({
//     fullname: '',
//     username: '',
//     bio:'',
//     languagespeak:[],
//     languagetolearn:[],
//   });

//   const [SelectedLanguagesToLearn, setSelectedLanguagesToLearn] = useState([]);
//   const [SelectedMotherTongues, setSelectedMotherTongues] = useState([]);
//   const [selectedLanguage, setSelectedLanguage] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
    

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleSave = () => {
//     setFormValues(formValues);
//     setIsEditing(false);
//     const values = {
//       ...formValues,
//       languagetolearn: SelectedLanguagesToLearn,
//       languagespeak: SelectedMotherTongues,
//     };
//     console.log(formValues);
//     window.location.reload();
//     axios.post('http://localhost:8081/updateProfile',values)
//     .then(res=>{
//       navigate('/manageaccount')
//     })
//     .catch(err=>console.log(err))
//   };

  
    
    return(
        <div >
            <Navbar/>
            <div className="account">
                 <div className="infoscard">
                  <div className="pic">
                  <ProfilePic/>
                  <button className="follow" >Follow</button>
                  </div>
                 <div className="infos">
                  <div className="info"><span>Full Name:</span> {userData.fullname} </div>
                  <div className="info"><span>User Name :</span> {userData.username} </div>
                  <div className="info"><span>Bio: </span>  {userData.bio} </div>
                  <div className="info"><span>Languages that you speak:</span>  {userData.languagesspeak.join(', ')}</div>
                  <div className="info"><span>Target Languages:</span> {userData.languagestolearn.join(', ')}</div>
                  
                 </div>
                 </div>
                 
            </div>
            
            <Footer/>
        </div>
    );
}

export default Account;