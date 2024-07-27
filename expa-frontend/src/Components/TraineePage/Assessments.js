import React from 'react';
import './Assessments.css';

const Assessments = ({ data }) => {
    if (!data) return <p>No assessments data available.</p>;

    return (
        <div className="assessments">
            <h2>Assessments</h2>
            <p>Critical Thinking: {data.criticalThinking}</p>
            <p>Communication: {data.communication}</p>
            <p>Ethics: {data.ethics}</p>
            <p>Gender Sensitivity: {data.genderSensitivity}</p>
        </div>
    );
};

export default Assessments;
