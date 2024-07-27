import React, { useState } from 'react';
import AddCampButton from './AddCampButton';
import NoCampsMessage from './NoCampsMessage';
import CampTable from './CampTable';
import './AdminPage.css'; // Import CSS file for styling

const AdminPage = () => {
  const [tables, setTables] = useState([]);
  const [locations, setLocations] = useState([]);

  const handleAddCamp = () => {
    // Add a new table with an empty camp and an empty location
    setTables([...tables, [{ name: '', location: '', date: '', description: '' }]]);
    setLocations([...locations, '']);
  };

  const handleLocationChange = (index, value) => {
    // Update the location for a specific table
    const newLocations = [...locations];
    newLocations[index] = value;
    setLocations(newLocations);
  };

  return (
    <div className="admin-page">
      <div className="button-container">
        <AddCampButton onAddCamp={handleAddCamp} />
      </div>
      {tables.length === 0 && <NoCampsMessage />}
      {tables.map((table, index) => (
        <div key={index} className="table-container">
          <input
            type="text"
            placeholder="Enter location"
            value={locations[index] || ''}
            onChange={(e) => handleLocationChange(index, e.target.value)}
            className="location-input"
          />
          <CampTable camps={table} />
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
