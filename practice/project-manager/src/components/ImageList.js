import React, { useState, useEffect } from 'react';
import { getImages, uploadImage } from '../api';
import ImageItem from './ImageItem';
import { useParams } from 'react-router-dom';
import './ImageList.css';

const ImageList = () => {
  const { projectId } = useParams();
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, [projectId]);

  const fetchImages = async () => {
    const response = await getImages(projectId);
    setImages(response.data);
  };

  const handleImageUploaded = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    await uploadImage(projectId, formData);
    fetchImages();
  };

  return (
    <div className="image-list">
      <h2>Project Images</h2>
      <input type="file" onChange={(e) => handleImageUploaded(e.target.files[0])} />
      <div className="grid">
        {images.map((image) => (
          <ImageItem key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default ImageList;