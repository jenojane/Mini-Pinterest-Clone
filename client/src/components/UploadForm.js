import React, { useState } from "react";
import axios from "axios";
import "../styles/UploadForm.css";

function UploadForm() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/upload", formData);
      window.location.reload();
    } catch (err) {
      console.error("❌ Upload failed:", err);
    }
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadForm;
