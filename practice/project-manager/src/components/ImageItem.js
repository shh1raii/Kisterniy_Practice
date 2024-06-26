import React from 'react';
import './ImageItem.css';

const ImageItem = ({ image }) => {
  return (
    <div className="image-item grid-item">
      <img src={`/${image.path}`} alt={image.name} />
      <p>{image.name}</p>
      <button>Delete</button>
    </div>
  );
};

export default ImageItem;