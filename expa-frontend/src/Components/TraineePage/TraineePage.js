import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import Assessments from './Assessments';
import Feedback from './Feedback';
import TraineeNavBar from './TraineeNavBar';
import './TraineePage.css';
import HomePage from '../HomePage/HomePage';

const TraineePage = () => {
    const [section, setSection] = useState('profile');
    const [traineeData, setTraineeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/user/getdata', {user: {email: ''}});
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTraineeData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderSection = () => {
        switch (section) {
            case 'home' : 
                return <HomePage/>;
            case 'profile':
                return <Profile />;
            case 'assessments':
                return <Assessments/>;
            default:
                return <HomePage/>;
        }
    };

    if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="trainee-page">
            <TraineeNavBar setActiveTab={setSection} />
            <div className="content">
                {renderSection()}
            </div>
        </div>
    );
};

export default TraineePage;