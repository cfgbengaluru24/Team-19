import React, { useState, useEffect } from 'react';
import './CampTable.css'; // Import CSS file for styling
import Papa from 'papaparse'; // Import PapaParse for reading CSV files

const CampTable = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    // Load trainers from the CSV file when the component mounts
    const fetchTrainers = async () => {
      const response = await fetch('expa-frontend/src/Assets/file.csv');
      const csvText = await response.text();
      
      Papa.parse(csvText, {
        header: true,
        complete: (result) => {
          const trainersData = result.data.slice(0, 5); // Get the first 5 rows
          setTrainers(trainersData);
        },
        error: (error) => {
          console.error('Error parsing CSV file:', error);
        }
      });
    };

    fetchTrainers();
  }, []);

  const handleRegisterClick = (trainerId) => {
    // Handle the button click event
    console.log(`Register button clicked for Trainer ID: ${trainerId}`);
    // Implement your request logic here
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Accepted':
        return 'status-accepted';
      case 'Rejected':
        return 'status-rejected';
      case 'Pending':
        return 'status-pending';
      default:
        return '';
    }
  };

  return (
    <table className="camps-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Action</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {trainers.map((trainer, index) => (
          <tr key={index}>
            <td>{trainer['Trainer ID']}</td>
            <td>
              <button className="register-btn" onClick={() => handleRegisterClick(trainer['Trainer ID'])}>
                Register
              </button>
            </td>
            <td className={getStatusClass(trainer['Rank'])}>
              {trainer['Rank']}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CampTable;