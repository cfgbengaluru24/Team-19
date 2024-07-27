import React, { useState } from 'react';
import './Login.css';
import LOGIN_PAGE_BG from '../../Assets/LOGIN_Page_bg.jpg';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        // Save formData as a JSON object in local storage
        localStorage.setItem('formData', JSON.stringify(formData));

        // Clear the form and set a success message
        setFormData({ username: '', password: '' });
        setMessage('Form submitted successfully!');
    };

    return (
        <div className="login-container" style={{ backgroundImage: `url(${LOGIN_PAGE_BG})` }}>
            <div className="overlay"></div>
            <div className="login-box">
                <h2>Login</h2>
                <p>Please enter your credentials to log in.</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default Login;
