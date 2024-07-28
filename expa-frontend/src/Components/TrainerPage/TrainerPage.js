// src/Components/TrainerPage/TrainerPage.js
import React, { useState } from 'react';
import TrainerNavBar from './TrainerNavBar';
import Profile from './Profile'; // Ensure this path is correct
import HomePage from '../HomePage/HomePage';

const TrainerPage = () => {
    const [activeTab, setActiveTab] = useState('home');

    const renderTab = () => {
        switch (activeTab) {
            case 'home':
                return <HomePage />;
            case 'profile':
                return <Profile />;
            default:
                return <div>Home Content</div>;
        }
    };

    return (
        <div>
            <TrainerNavBar setActiveTab={setActiveTab} />
            {renderTab()}
        </div>
    );
};

export default TrainerPage;