import React from 'react';
import './Footer.css';
import logo from '../../Assets/Expa_Logo.png'; // Adjust path as needed
import fb from '../../Assets/Footer/fb.png';
import insta from '../../Assets/Footer/insta.png';
import ld from '../../Assets/Footer/linkedin.png';
import yt from '../../Assets/Footer/ytube.png';
// import email from '../../Assets/Footer/email.png';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="left-col">
          <img src={logo} style={{ width: '200px' }} alt="Logo" id="logo" />
          <div className="social-media">
            <a href="#"><img src={fb} alt="Facebook" /></a>
            <a href="https://www.instagram.com/cadet_expa_india/" target="_blank"><img src={insta} alt="Instagram" /></a>
            
            <a href="https://www.youtube.com/channel/UCdXrGifpsSqV8nc7Ss15IcQ" target="_blank"><img src={yt} alt="YouTube" /></a>
            <a href="https://www.linkedin.com/company/the-cadet-program/?originalSubdomain=in" target="_blank"><img src={ld} alt="LinkedIn" /></a>
          </div>
          <br /><br />
          <p className="rights-text">All Right Reserved | NCC EXPA India | The CADET Program |</p>
          <p > info@cadetprogram.org</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
