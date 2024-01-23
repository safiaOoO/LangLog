import React, { useRef, useEffect } from 'react';

const LanguageBar = () => {
  const languages = ["Arabic", "বাংলা ", "Bulgarian", "မြန်မာ ", "Cebuano", "Chinese", "Croatian", "Czech", "Danish", "Dutch", "English", "Filipino", "Finnish", "French", "German", "Greek", "Gujarati", "Hindi", "Hungarian", "Indonesian", "Italian", "Japanese", "Javanese", "Kazakh", "Korean"]

  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    let animationId;

    const scrollLanguages = () => {
      container.scrollLeft += 1; 
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0;
      }

      animationId = requestAnimationFrame(scrollLanguages);
    };

    const startScrolling = () => {
      animationId = requestAnimationFrame(scrollLanguages);
    };

    const stopScrolling = () => {
      cancelAnimationFrame(animationId);
    };

    container.addEventListener('mouseover', stopScrolling);
    container.addEventListener('mouseout', startScrolling);

    startScrolling();

    return () => {
      stopScrolling();
      container.removeEventListener('mouseover', stopScrolling);
      container.removeEventListener('mouseout', startScrolling);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        overflowX: 'hidden', 
        whiteSpace: 'nowrap',
        width: '100%',
        border: 'none',
        padding: '10px',
        position: 'relative',
        backgroundColor:'#ECE3CE',
        color:'#3A4D39',
        marginTop:'30px',
      }}
    >
      {languages.map((language, index) => (
        <span key={index} style={{ marginRight: '30px' }}>
          {language}
        </span>
      ))}
    </div>
  );
};

export default LanguageBar;
