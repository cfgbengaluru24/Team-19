import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import './Login.css';
import LOGIN_PAGE_BG from '../../Assets/LOGIN_Page_bg.jpg';
import { loginContext } from '../contexts/loginContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [roleNavigation, setRoleNavigation] = useState('');

  const { currentUser, error, userLoginStatus, loginUser, logoutUser } = useContext(loginContext);
  const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('Form Data:', formData);

    //     // Save formData as a JSON object in local storage
    //     localStorage.setItem('formData', JSON.stringify(formData));

    //     // Clear the form and set a success message
    //     setFormData({ username: '', password: '' });
    //     setMessage('Form submitted successfully!');
    // };
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Create a credentials object
        // const credentials = { email, password };
    
        try {
          const response = await fetch('http://localhost:5000/user/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Convert credentials object to JSON string
          });
    
          if (response.ok) {
            const data = await response.json();
            setMessage(`Login successful: ${data.user.username}`);
            console.log(data);
            // Handle successful login (e.g., store token, redirect user)
            if (data) {
              if (data.role === 'trainer') {
                // console.log("here1")
                  setRoleNavigation('/trainerPage');
              } else if (data.role === 'trainee') {
                // console.log("here")
                  setRoleNavigation('/traineePage');
              }
              else if(data.role === 'admin'){
                setRoleNavigation('/adminPage');
              }
          }
            
          } else {
            const errorData = await response.json();
            setMessage(`Login failed: ${errorData.message}`);
          }
        } catch (error) {
          setMessage(`Login failed: ${error.message}`);
        }
      };
      useEffect(() => {
        navigate(roleNavigation);
    }, [roleNavigation]);
    return (
        <div className="login-container" style={{ backgroundImage: `url(${LOGIN_PAGE_BG})` }}>
            <div className="overlay"></div>
            <div className="login-box">
                <h2>Login</h2>
                <p>Please enter your credentials to log in.</p>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
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
