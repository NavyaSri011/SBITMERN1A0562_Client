import React, { useEffect, useState } from "react";

const images = [
  "/images/1.jpg",
  "/images/4.avif",
  "/images/5.jpg",
];

function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <img
        src={images[currentIndex]}
        alt={`slide-${currentIndex}`}
        style={styles.image}
      />
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "70vh",
    overflow: "hidden",
    borderRadius: "8px",
    marginTop: "16px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 1s ease-in-out",
  },
};

export default Slideshow;
