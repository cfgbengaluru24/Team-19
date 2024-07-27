import React from 'react';
import './NavBar.css';

const Navbar = ({ setSection }) => {
    return (
        <nav className="navbar">
            <button onClick={() => setSection('profile')}>Profile</button>
            <button onClick={() => setSection('assessments')}>Assessments</button>
            <button onClick={() => setSection('feedback')}>Feedback</button>
        </nav>
    );
};

export default Navbar;
