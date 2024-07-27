import React from 'react';
import './About.css';
import sideImage from '../../Assets/img2.png'; 

const About = () => {
  return (
    <div className="diffSection" id="about_section">
      <center><p style={{ fontSize: '50px', padding: '100px' }}>About</p></center>
      <div className="about-content">
        <div className="side-image">
          <img className="sideImage" src={sideImage} alt="About Us" />
        </div>
        <div className="side-text">
          <h2>What you think about us?</h2>
          <p>EXPA (NCC Exchange Participants Association of India) is a Society registered under the Karnataka Societies Registration Act, 1960, in Bangalore, Karnataka. EXPA’s members are NCC cadets who have traveled abroad on the NCC Youth Exchange Program, whereby selected cadets participate in a country-to-country exchange of cadets belonging to youth organizations of friendly countries. The YEP, in place since 1979, has included an estimated 5,000 cadets over the years.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
