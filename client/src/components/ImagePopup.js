import React from "react";
import "../styles/ImagePopup.css";
import { FaTimes } from "react-icons/fa";

export default function ImagePopup({ image, onClose }) {
  if (!image) return null;

  const imageUrl = `http://localhost:5000${image.image_path}`;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>
          <FaTimes />
        </button>
        <img src={imageUrl} alt={image.title} className="popup-image" />
        {image.title && <div className="popup-title">{image.title}</div>}
      </div>
    </div>
  );
}
