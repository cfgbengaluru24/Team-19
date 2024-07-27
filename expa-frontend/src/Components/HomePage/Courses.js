import React from 'react';
import './Courses.css';

const Courses = () => {
  return (
    <div className="title">
      <span id="heading">The Subjects we teach</span>
      <br /><br />
      <div className="course">
        <center>
          <div className="cbox">
            <div className="det"><a href="/subjects/jee.html"><img src={require('../../Assets/Expa_Logo.png')} alt="Critical Thinking" />Critical Thinking</a></div>
            <div className="det"><a href="/subjects/gate.html"><img src={require('../../Assets/Expa_Logo.png')} alt="Communication" />Communication</a></div>
            <div className="det"><a href="/subjects/jee.html#sample_papers"><img src={require('../../Assets/Expa_Logo.png')} alt="Ethics" />Ethics</a></div>
            <div className="det"><a href="/subjects/quiz.html"><img src={require('../../Assets/Expa_Logo.png')} alt="Gender Sensitivity" />Gender Sensitivity</a></div>
          </div>
        </center>
      </div>
    </div>
  );
};

export default Courses;
