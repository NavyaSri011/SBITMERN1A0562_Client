import React, { useEffect, useState } from "react";
import { QRCodeSVG } from 'qrcode.react';

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    fetch("/api/faculty") 
      .then((res) => res.json())
      .then((faculty) => {
        setFaculty(faculty);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching faculty data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
        <h1
        style={{
          fontSize: "20px",         
          fontFamily: "serif",
          color: "#2c3e50",        
          fontWeight: "600",
        }}
      >
        Scan this QR code for Faculty Details
      </h1>
      {faculty && (
        <QRCodeSVG value={JSON.stringify(faculty)} />
      )}
    </div>
  );
}

export default Faculty;

 