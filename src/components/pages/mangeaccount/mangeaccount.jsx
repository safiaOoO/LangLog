import Footer from "../footer/footer";
import { Navbar,ProfilePic } from "../navbar/nav";
import "./manageaccount.css"
import { useState,useEffect } from "react";
import axios from 'axios';
import LanguageSelector from "../register/language"
import { useNavigate } from "react-router-dom";

const ManageAcc = () => {

  const navigate = useNavigate()

  const defaultUserData = {
    fullname: 'fullname',
    username: 'username',
    bio:'No bio',
    languagesspeak:['arabic','english','french'],
    languagestolearn:['italian' , 'korean'],
  };
  const [userData, setUserData] = useState(defaultUserData);
  const [formValues, setFormValues] = useState({
    fullname: '',
    username: '',
    bio:'',
    languagespeak:[],
    languagetolearn:[],
  });

  const [SelectedLanguagesToLearn, setSelectedLanguagesToLearn] = useState([]);
  const [SelectedMotherTongues, setSelectedMotherTongues] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = async () => {
    try {
      setFormValues(formValues);
      setIsEditing(false);
      const values = {
        ...formValues,
        languagetolearn: SelectedLanguagesToLearn,
        languagespeak: SelectedMotherTongues,
      };
  
      const response = await axios.post('http://localhost:8081/updateProfile', values);
      
      console.log(response.data.success);
  
      if (response.data.success) {
        alert(response.data.message);
        window.location.href = window.location.href;
      } else {
        alert(response.data.message);
        window.location.href = window.location.href;
      }
    } catch (error) {
      console.error(error);
    }
  };

  axios.defaults.withCredentials = true

  useEffect(() => {
    axios.get('http://localhost:8081/checkUser')
    .then(res => {
        if(res.data.valid === false){
          navigate('/login')
        }else{
          const fetchData = async () => {
            try {
              const profileRes = await axios.get('http://localhost:8081/getProfile')
              if (profileRes.data.success) {
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  ...profileRes.data.user[0]
                }));
                setFormValues((prevFormValues) => ({
                  ...prevFormValues,
                  ...profileRes.data.user[0]
                }))
              } else {
                navigate('/login')
              }
      
            } catch (err) {
              console.error(err)
            }
          }
          fetchData()
        }
    })
    .catch(err=> console.log(err))
  }, [])
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
                <form action = "" onSubmit={handleSave}>
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
                    name="languagespeak"
                    selectedLanguages={SelectedMotherTongues}
                    setSelectedLanguages={setSelectedMotherTongues}
                    api="http://localhost:8081/languages/learning"
                    />  
                    <h5>Target Languages: </h5>  
                    <LanguageSelector
                    name="languagetolearn"
                    selectedLanguages={SelectedLanguagesToLearn}
                    setSelectedLanguages={setSelectedLanguagesToLearn}
                    api="http://localhost:8081/languages/toLearn"
                    /> 
                    <button type="submit">Save changes</button>
                </form>)}
            </div>
            
            <Footer/>
        </div>
    );
}
export default ManageAcc;