// src/components/ImageCard.js
import React from "react";
import { FaHeart, FaDownload } from "react-icons/fa";
import "../styles/ImageCard.css";

const ImageCard = ({ image, onLike, onClick }) => {
  return (
    <div className="image-card" onClick={onClick}>
      <img src={`http://localhost:5000${image.image_path}`} alt={image.title} />
      <div className="image-overlay">
        <button onClick={(e) => { e.stopPropagation(); onLike(image.id); }}>
          <FaHeart /> {image.likes}
        </button>
        <a href={`http://localhost:5000${image.image_path}`} download onClick={(e)=> e.stopPropagation()}>
          <FaDownload />
        </a>
      </div>
    </div>
  );
};

export default ImageCard;
