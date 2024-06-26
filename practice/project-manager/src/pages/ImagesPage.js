import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getImages, uploadImage } from '../api';
import './ImagesPage.css';

const ImagesPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await getImages(projectId);
        setImages(result);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };
    fetchImages();
  }, [projectId]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('projectId', projectId);

    try {
      const newImage = await uploadImage(formData);
      setImages([...images, newImage]);
      setSelectedFile(null);
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  return (
    <div className="images-page">
      <header>
      Practice Project v1.0
      </header>
      <button class = "button-home" onClick={() => navigate('/')}>Home</button>
      <div className="upload-section">
        <input type="file" onChange={handleFileChange} />
        <button class = "button-upload-image" onClick={handleUpload}>Upload Image</button>
      </div>
      <div className="images-grid">
        {images.map((image) => (
          <div key={image.id} className="image-item">
            <img src={image.url} alt={image.description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesPage;