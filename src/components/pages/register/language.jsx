import React, { useState } from 'react';

const LanguageSelector = () => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState([
    'English', 'Spanish', 'French', 'German', 
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleLanguageChange = (event) => {
    const newSelectedLanguage = event.target.value;
    if (newSelectedLanguage && !selectedLanguages.includes(newSelectedLanguage)) {
      setSelectedLanguages([...selectedLanguages, newSelectedLanguage]);
      setAvailableLanguages(availableLanguages.filter(lang => lang !== newSelectedLanguage));
      setSelectedLanguage(''); 
    }
  };

  const handleRemoveLanguage = (language) => {
    setSelectedLanguages(selectedLanguages.filter(lang => lang !== language));
    setAvailableLanguages([...availableLanguages, language]);
  };

  return (
    <div>
      
      <div>
        <select value={selectedLanguage} onChange={handleLanguageChange} 
                style={{
                    width: '250px',
                    padding: '10px',
                    border: '2px solid #739072',
                    borderRadius: '18px',
                    height: '50px',
                    }}>
          <option value="" disabled>Select Language</option>
          {availableLanguages.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>
      <div style={{display:'flex',maxWidth:'250px' , flexWrap:'wrap'}}>
        {selectedLanguages.map(lang => (
          <div key={lang} style={{
                                  display:'flex',
                                  justifyContent:'center',
                                  alignItems:'center',
                                  backgroundColor:'#FBF6F0',   
                                  width: '100px',
                                  height: '30px',
                                  borderRadius: '26px',
                                  border: '',
                                  marginTop:'5px',
                                }}>
            <span style={{color:'#3A4D39', fontSize:'14px'}}>{lang}</span>
            <button onClick={() => handleRemoveLanguage(lang)} style={{
                                                                        borderRadius:'50%',
                                                                        backgroundColor:'#ffffff',
                                                                        border:'none',
                                                                        marginLeft:'8px'
                                                                      }}
            ><div style={{cursor:'pointer'}}>X</div></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
