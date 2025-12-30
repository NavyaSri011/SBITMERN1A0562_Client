import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const Management = () => {
  const [management, setManagement] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchManagement = async () => {
      try {
        const response = await fetch("https://your-api-base-url.com/management"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setManagement(data);
      } catch (err) {
        console.error("QR fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchManagement();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading QR Code...</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2 style={{ color: "#2c3e50" }}>
        Scan this QR Code for Management Details
      </h2>

      {management.length > 0 ? (
        <QRCodeSVG value={JSON.stringify(management)} size={220} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Management;

