import React from 'react';
import './CampTable.css'; // Import CSS file for styling

const CampTable = ({ camps }) => {
  return (
    <table className="camps-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Date</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {camps.map((camp, index) => (
          <tr key={index}>
            <td>{camp.name}</td>
            <td>{camp.location}</td>
            <td>{camp.date}</td>
            <td>{camp.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CampTable;
