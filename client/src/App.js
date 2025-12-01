import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ImageGallery from "./components/ImageGallery";
import ImagePopup from "./components/ImagePopup";
import UploadForm from "./components/UploadForm";
import Footer from "./components/Footer";
import "./styles/App.css";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="app">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Scrollable Content */}
      <main className="main-content">
        {/* Upload Section */}
        <UploadForm />

        {/* Image Grid Section */}
        <ImageGallery onImageClick={setSelectedImage} />
      </main>

      {/* Popup for Enlarged Image */}
      {selectedImage && (
        <ImagePopup
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      {/* Footer appears at the bottom after scrolling */}
      <Footer />
    </div>
  );
}

export default App;
