import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ImageGallery.css";

function ImageGallery({ onImageClick }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/images");
        setImages(res.data);
      } catch (err) {
        console.error("❌ Error fetching images:", err);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="gallery-container">
      {images.map((img) => (
        <div key={img.id} className="image-card" onClick={() => onImageClick(img)}>
          <img src={`http://localhost:5000${img.image_path}`} alt={img.title} />
        </div>
      ))}
    </div>
  );
}

export default ImageGallery;
