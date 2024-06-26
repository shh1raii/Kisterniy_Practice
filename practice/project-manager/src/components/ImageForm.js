import React from 'react';
import './ImageForm.css';

const ImageForm = ({ onImageUploaded }) => {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageUploaded(file);
    }
  };

  return (
    <div className="image-form">
      <h2>Upload Image</h2>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default ImageForm;