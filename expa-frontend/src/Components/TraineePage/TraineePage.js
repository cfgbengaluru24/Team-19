import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';
import Profile from './Profile';
import Assessments from './Assessments';
import Feedback from './Feedback';
import './TraineePage.css';

const TraineePage = () => {
    const [section, setSection] = useState('profile');
    const [traineeData, setTraineeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://your-backend-api.com/trainee');
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
            case 'profile':
                return <Profile data={traineeData?.profile} />;
            case 'assessments':
                return <Assessments data={traineeData?.assessments} />;
            case 'feedback':
                return <Feedback />;
            default:
                return <Profile data={traineeData?.profile} />;
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="trainee-page">
            <Navbar setSection={setSection} />
            <div className="content">
                {renderSection()}
            </div>
        </div>
    );
};

export default TraineePage;
