// src/contexts/ProfileContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({
        username: '',
        name: '',
        dob: '', 
        phoneNumber: '',
        email: '',
        contactNumber: ''
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('https://localhost:5000/user/getdata', {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                setProfileData(response.data);
            } catch (error) {
                console.error('Failed to fetch profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    return (
        <ProfileContext.Provider value={{profileData}}>
            {children}
        </ProfileContext.Provider>
    );
};