import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./language.css"
const LanguageSelector = ({ selectedLanguages, setSelectedLanguages, pageType ,api }) => {
  const [languages, setLanguages] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    axios.get(api)
      .then(res => {
        const fetchedLanguages = res.data;
        setLanguages(fetchedLanguages);
        setAvailableLanguages(fetchedLanguages);
      })
      .catch(err => console.error(err));
  }, [api]);

  const handleLanguageChange = (event) => {
    const newSelectedLanguage = event.target.value;
    if (newSelectedLanguage && !selectedLanguages.includes(newSelectedLanguage)) {
      const selectedLanguageObj = languages.find(lang => lang.languageName === newSelectedLanguage);
      setSelectedLanguages((prevLanguages) => [...prevLanguages, selectedLanguageObj.codeLanguage]);
      setAvailableLanguages(availableLanguages.filter(lang => lang.codeLanguage !== selectedLanguageObj.codeLanguage));
      setSelectedLanguage('');
    }
  };

  const handleRemoveLanguage = (languageCode) => {
    const removedLanguage = languages.find(lang => lang.codeLanguage === languageCode);
    setSelectedLanguages((prevLanguages) => prevLanguages.filter(lang => lang !== removedLanguage.codeLanguage));
    setAvailableLanguages([...availableLanguages, removedLanguage]);
  };

  return (
    <div>
      <div>
        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className={`select ${pageType === 'page1' ? 'page1-style' : 'page2-style'}`}
        >
          <option value="" disabled>Select Language</option>
          {languages.map(lang => (
            <option key={lang.codeLanguage} value={lang.languageName}>{lang.languageName}</option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', maxWidth: '250px', flexWrap: 'wrap' }}>
        {selectedLanguages.map(langCode => {
          const lang = languages.find(l => l.codeLanguage === langCode);
          return (
            <div
              key={lang.codeLanguage}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FBF6F0',
                width: '100px',
                height: '30px',
                borderRadius: '26px',
                border: '',
                marginTop: '5px',
              }}
            >
              <span style={{ color: '#3A4D39', fontSize: '14px' }}>{lang.languageName}</span>
              <button
                onClick={() => handleRemoveLanguage(lang.codeLanguage)}
                style={{
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: 'none',
                  marginLeft: '8px',
                }}
              >
                <div style={{ cursor: 'pointer' }}>X</div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageSelector;