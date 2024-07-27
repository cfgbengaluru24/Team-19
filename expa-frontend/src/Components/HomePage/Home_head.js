import React from 'react';
import './Home_head.css';
import image from '../../Assets/head_img.png'; // Update path as needed

const Header = () => {
  return (
    <header>
      <div id="head">
      <div className="head-container">
        <div className="quote">
          <p>To develop the youth of India towards becoming responsible citizens.</p>
          <h5>
            Reflecting the inclusive spirit of the NCC, EXPA is committed to fostering positive change in our society.
            EXPA is an apolitical and areligious organization, ensuring that our focus remains solely on the betterment of our youth and society at large.
          </h5>
        </div>
        <div className="svg-image">
          {/* <img src={image} alt="svg" /> */}
          <div className="image-container">
              <img src={image} alt="Description of the image" />
          </div>
        </div>
      </div>
      <div className="side-menu" id="side-menu">
        <div className="close" onClick={() => console.log('Close menu')}>
          {/* <img src={require('../../Assets/LOGIN_Page_bg.jpg')} alt="" /> */}
          <div className="image-container">
      <img src={image} alt="Description of the image" />
    </div>
        </div>
        <div className="user">
          {/* <img src={require('../../Assets/LOGIN_Page_bg.jpg')} alt="Username" /> */}
          <div className="image-container">
      <img src={image} alt="Description of the image" />
    </div>
          <p>roshank9419</p>
        </div>
      </div>
      </div>
    </header>
  );
};

export default Header;
