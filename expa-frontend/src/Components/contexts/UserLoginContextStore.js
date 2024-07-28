// UserLoginContextStore.js
import React, { useEffect, useState } from 'react';
import { loginContext } from './loginContext';
import axios from 'axios';

function UserLoginContextStore({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState("");
    const [userLoginStatus, setUserLoginStatus] = useState(false);

    // user login
    const loginUser = async (userCredObj) => {
        try {
            const response = await axios.post('http://localhost:5000/user/signin', userCredObj);

            if (response.status === 201) {
                // update current user state
                setCurrentUser(response.data.user);

                // update user login status
                setUserLoginStatus(true);

                // update error state
                setError("");

                // store JWT token and user information in local storage
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            console.error(err.message);
            setError("Login failed. Please try again.");
        }
    };

    // user logout
    const logoutUser = () => {
        // clear local storage
        localStorage.clear();

        // update user login status
        setUserLoginStatus(false);

        // clear current user state
        setCurrentUser(null);
    };

    // check if user is already logged in on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setCurrentUser(JSON.parse(storedUser));
                setUserLoginStatus(true);
            }
        }
    }, []);

    return (
        <loginContext.Provider value={{ currentUser, error, userLoginStatus, loginUser, logoutUser }}>
            {children}
        </loginContext.Provider>
    );
}

export default UserLoginContextStore;
