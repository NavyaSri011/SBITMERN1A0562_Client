import React, { useEffect, useState } from "react";
import { QRCodeSVG } from 'qrcode.react';

const Management = () => {
  const [management, setManagement] = useState([]);
  const [ loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetch("/api/management") 
      .then((res) => res.json())
      .then((faculty) => {
        setManagement(management);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching faculty data:", err);
        setLoading(false);
      });
  }, );

  return (
          <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1
        style={{
          fontSize: "20px",          
          fontFamily: "serif", 
          color: "#2c3e50",        
          fontWeight: "600",
        }}
      >
        Scan this QR code for Management Details
      </h1>
      {management && (
        <QRCodeSVG value={JSON.stringify(management)} />
      )}
    </div>
  );
}

export default Management;

 