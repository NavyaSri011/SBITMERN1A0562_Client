import React, { useEffect, useState } from "react";
import { QRCodeSVG } from 'qrcode.react';

const Student = () => {
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    fetch("https://sbitmern1a0562-server-3.onrender.com/api/students")
      .then((res) => res.json())
      .then((student) => {
        setStudent(student);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stuent data:", err);
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
        Scan this QR code for Student Details
      </h1>
      {student && (
        <QRCodeSVG value={JSON.stringify(student)} />
      )}
    </div>
  );
}

export default Student;

 
