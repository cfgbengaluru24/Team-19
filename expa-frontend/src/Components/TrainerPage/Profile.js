// // src/components/Profile.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Profile = () => {
//     const [profileData, setProfileData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchProfileData = async () => {
//             try {
//                 const response = await axios.get('https://localhost:5000/user/getdata', {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     }
//                 });
//                 console.log({response});
//                 setProfileData(response.data);
//             } catch (err) {
//                 setError(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProfileData();
//     }, []);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;
//     if (!profileData) return <p>No profile data available</p>;

//     return (
//         <div>
//             <h2>Profile Information</h2>
//             <p><strong>Username:</strong> {profileData.username}</p>
//             <p><strong>Name:</strong> {profileData.name}</p>
//             <p><strong>Date of Birth:</strong> {profileData.dob}</p>
//             <p><strong>Phone Number:</strong> {profileData.phoneNumber}</p>
//             <p><strong>Email:</strong> {profileData.email}</p>
//             <p><strong>Contact Number:</strong> {profileData.contactNumber}</p>
//         </div>
//     );
// };

// export default Profile;
// src/components/TrainerPage/Profile.js
import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => {
    const [profileData, setProfileData] = useState({
        username: '',
        name: '',
        dob: '',
        phoneNumber: '',
        email: '',
        contactNumber: ''
    });

    // Simulate fetching data from an API
    useEffect(() => {
        // Replace with actual API call
        const fetchProfileData = async () => {
            // Mock data
            const data = {
                username: 'johndoe',
                name: 'John Doe',
                dob: '1990-01-01',
                phoneNumber: '123-456-7890',
                email: 'johndoe@example.com',
                contactNumber: '987-654-3210'
            };
            setProfileData(data);
        };

        fetchProfileData();
    }, []);

    return (
        <div className="profile-container">
            <div className="overlay"></div>
            <div className="profile-form">
                <h2>Profile</h2>
                <div className="profile-field">
                    <label>Username:</label>
                    <p>{profileData.username}</p>
                </div>
                <div className="profile-field">
                    <label>Name:</label>
                    <p>{profileData.name}</p>
                </div>
                <div className="profile-field">
                    <label>Date of Birth:</label>
                    <p>{profileData.dob}</p>
                </div>
                <div className="profile-field">
                    <label>Phone Number:</label>
                    <p>{profileData.phoneNumber}</p>
                </div>
                <div className="profile-field">
                    <label>Email ID:</label>
                    <p>{profileData.email}</p>
                </div>
                <div className="profile-field">
                    <label>Contact Number:</label>
                    <p>{profileData.contactNumber}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;