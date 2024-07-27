import React from 'react';
import './NavBar.css';
import EXPA_LOGO from '../../Assets/Expa_Logo.png';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src={EXPA_LOGO} alt="Expa Logo" className="logo" />
            </div>
            <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
            </ul>
        </nav>
    );
};

export default NavBar;
