import React, { useEffect, useState } from "react";
import { QRCodeSVG } from 'qrcode.react';

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    fetch("https://sbitmern1a0562-server-3.onrender.com/api/faculty")
      .then((res) => res.json())
      .then((staff) => {
        setStaff(staff);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching staff data:", err);
        setLoading(false);
      });
  }, []);

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
        Scan this QR code for Staff Details
      </h1>
      {staff && (
        <QRCodeSVG value={JSON.stringify(staff)} />
      )}
    </div>
  );
}

export default Staff;

 
