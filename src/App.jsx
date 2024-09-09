import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Compressor from "./components/Compressor";
import imageCompression from "browser-image-compression";
import { Helmet } from "react-helmet";

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [originalSize, setOriginalSize] = useState({
    size: 0,
    width: 0,
    height: 0,
  });
  const [compressedSize, setCompressedSize] = useState({
    size: 0,
    width: 0,
    height: 0,
  });
  const [isCompressing, setIsCompressing] = useState(false);

  useEffect(() => {
    const compressedImage = async () => {
      setOriginalSize({
        size: (imageFile.size / 1024).toFixed(2),
        width: 0,
        height: 0,
      });

      const originalImageObject = new Image();
      originalImageObject.src = URL.createObjectURL(imageFile);
      originalImageObject.onload = () => {
        setOriginalSize((prev) => ({
          ...prev,
          width: originalImageObject.width,
          height: originalImageObject.height,
        }));
      };

      setOriginalImage(URL.createObjectURL(imageFile));

      // Compression options
      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      try {
        setIsCompressing(true);

        const compressedFile = await imageCompression(imageFile, options);

        // Get compressed file size
        setCompressedSize({
          size: (compressedFile.size / 1024).toFixed(2), // Convert bytes to KB
          width: 0,
          height: 0,
        });

        // Create an Image object to extract dimensions for the compressed image
        const compressedImageObject = new Image();
        compressedImageObject.src = URL.createObjectURL(compressedFile);
        compressedImageObject.onload = () => {
          setCompressedSize((prev) => ({
            ...prev,
            width: compressedImageObject.width,
            height: compressedImageObject.height,
          }));
        };

        // Scroll to the #compressor div after the image upload
        document
          .getElementById("compressor")
          .scrollIntoView({ behavior: "smooth" });

        // Set the compressed image URL
        const compressedImageUrl = URL.createObjectURL(compressedFile);
        setCompressedImage(compressedImageUrl);
      } catch (error) {
        console.log(error);
      } finally {
        setIsCompressing(false);
      }
    };

    if (imageFile != null) {
      compressedImage();
    }
  }, [imageFile]);

  return (
    <div className="min-h-screen bg-black-400">
      <Helmet>
        <meta property="title" content="Online Image Compressor" />
        <meta
          name="description"
          content="100kb-image is the ultimate image optimizer to compress your images in JPEG, GIF and PNG formats to the minimum possible size."
        />
        <meta property="og:title" content="Online Image Compressor" />
        <meta
          property="og:description"
          content="100kb-image is the ultimate image optimizer to compress your images in JPEG, GIF and PNG formats to the minimum possible size."
        />
        <meta property="og:image" content="/assets/hero.svg" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <Hero setImageFile={setImageFile} />
      {originalImage != null ? (
        <Compressor
          originalImage={originalImage}
          compressedImage={compressedImage}
          originalSize={originalSize}
          compressedSize={compressedSize}
          isCompressing={isCompressing}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
