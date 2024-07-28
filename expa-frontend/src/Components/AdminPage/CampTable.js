import React, { useState, useEffect } from 'react';
import './CampTable.css'; // Import CSS file for styling

const CampTable = () => {
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await fetch('http://localhost:5000/getFile'); // Use HTTP
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCamps(data);
      } catch (error) {
        console.error("Error fetching camps data:", error);
      }
    };

    fetchCamps();
  }, []);

  return (
    <table className="camps-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Rank</th>
          <th>Request</th>
        </tr>
      </thead>
      <tbody>
        {camps.slice(0, 5).map((camp, index) => (
          <tr key={index}>
            <td>{camp.name}</td>
            <td>{camp.rank || 'N/A'}</td>
            <td>
              <button className="register-btn">Register</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CampTable;
