import Footer from "../footer/footer";
import { Navbar } from "../navbar/nav";
import "./createpost.css"
import { useState,useEffect } from "react";
import axios from 'axios';
import Addpicture from "./addpicture";
import LanguageSelector from "../register/language"

const Postform = () => {
  const [selectedLanguage, setSelectedLanguage] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        language: '',
        postType: '',
        content: '',
        picture: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleImageChange = (selectedImage,file) => {
        setFormData((prevData) => ({ ...prevData, picture: selectedImage ,pictureName: file.name }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({
          title: '',
          description: '',
          language: '',
          postType: '',
          content: '',
          picture: '',
        });
      };
    return(
        <div >
            <Navbar/>
            <div className="postform">
                <form onSubmit={handleSubmit}>
                    <h1>Create Post</h1>
                    <div className="input-group">
                        <input
                        className="title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder=''
                        />
                        <label>Post title</label>
                    </div>
                    <div className="input-group">
                        <input
                        className="description"
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder=''
                        />
                        <label>Brief Description</label>
                    </div>

                    <LanguageSelector
                    pageType="page2"
                    name="language"
                    selectedLanguages={selectedLanguage}
                    setSelectedLanguages={setSelectedLanguage}
                    />
                    <select name="postType" value={formData.postType} onChange={handleChange}>
                    <option value="" disabled>Select Type of Post</option>
                    <option value="essay">Essay</option>
                    <option value="dairy">Dairy</option>
                    </select>
                    
                    <div className="input-group">
                        <input
                        className="content"
                        type="text"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder=''
                        />
                        <label>Content</label>
                    </div>
                    <Addpicture onChange={handleImageChange}/>

                    <button type="submit">Share</button>
                </form>
            </div>
            
            <Footer/>
        </div>
    );
}

export default Postform;