import React from 'react';
import './AddCampButton.css'; // Import CSS file for styling

const AddCampButton = ({ onAddCamp }) => {
  return (
    <button className="add-camp-btn" onClick={onAddCamp}>
      Add Camp
    </button>
  );
};

export default AddCampButton;
