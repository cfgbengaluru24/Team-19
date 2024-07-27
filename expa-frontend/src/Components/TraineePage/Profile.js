import React from 'react';
import './Profile.css';

const Profile = ({ data }) => {
    if (!data) return <p>No profile data available.</p>;

    return (
        <div className="profile">
            <h2>Profile</h2>
            <p>First Name: {data.firstName}</p>
            <p>Last Name: {data.lastName}</p>
            <p>Username: {data.username}</p>
            <p>Profile Pic: <img src={data.profilePic} alt="Profile" /></p>
            <p>Age: {data.age}</p>
        </div>
    );
};

export default Profile;
