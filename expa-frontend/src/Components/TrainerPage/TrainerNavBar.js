// src/components/TrainerPage/TrainerNavBar.js
import React from 'react';
import './TrainerNavBar.css';
import ExpaLogo from '../../Assets/Expa_Logo.png';

const TrainerNavBar = ({ setActiveTab }) => {
    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src={ExpaLogo} alt="Logo" className="logo" />
            </div>
            <ul className="nav-links">
                <li><a href="#" onClick={() => setActiveTab('home')}>Home</a></li>
                <li><a href="#" onClick={() => setActiveTab('profile')}>Profile</a></li>
            </ul>
        </nav>
    );
};

export default TrainerNavBar;