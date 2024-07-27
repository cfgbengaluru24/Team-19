// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import Login from './Components/LoginPage/Login';
import NavBar from './Components/NavBar/NavBar';
import AdminPage from './Components/AdminPage/AdminPage';
import Register from './Components/register/Register';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;