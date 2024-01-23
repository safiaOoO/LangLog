import React, { useState } from 'react';

const Addpicture = ({ onChange }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const selectedImage = reader.result;
        setSelectedImage(selectedImage);
        onChange(selectedImage,file); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div>
      <input
        type="file"
        name="photo"
        id="fileInput"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <div
        style={{
          margin:'40px 520px 0 0',
          width: '150px',
          height: '40px',
          borderRadius: '30px',
          overflow: 'hidden',
          position: 'relative',
          cursor: 'pointer',
          border:'solid 2px #739072',
        }}
        onClick={handleImageClick}
      >
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Profile"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
            
            }}
          >
            <span>Add picture</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Addpicture;
