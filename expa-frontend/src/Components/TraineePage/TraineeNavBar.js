// // import React from 'react';
// // import './Trainee-NavBar.css';

// // const Navbar = ({ setSection }) => {
// //     return (
// //         <nav className="navbar">
// //             <button onClick={() => setSection('profile')}>Profile</button>
// //             <button onClick={() => setSection('assessments')}>Assessments</button>
// //             <button onClick={() => setSection('feedback')}>Feedback</button>
// //         </nav>
// //     );
// // };

// // export default Navbar;

// import React from 'react';
// import './TraineeNavBar.css';
// import ExpaLogo from '../../Assets/Expa_Logo.png';

// const TraineeNavBar = ({ setActiveTab }) => {
//     return (
//         <nav className="navbar">
//             <div className="logo-container">
//                 <img src={ExpaLogo} alt="Logo" className="logo" />
//             </div>
//             <ul className="nav-links">
//                 <li><a href="#" onClick={() => setActiveTab('home')}>Home</a></li>
//                 <li><a href="#" onClick={() => setActiveTab('profile')}>Profile</a></li>
//                 <li><a href="#" onClick={() => setActiveTab('assessment')}>Assessment</a></li>
//                 <li><a href="#" onClick={() => setActiveTab('feedback')}>Feedback</a></li>
//             </ul>
//         </nav>
//     );
// };

// export default TraineeNavBar;

// src/components/TraineePage/TraineeNavBar.js
import React from 'react';
import './TraineeNavBar.css';
import ExpaLogo from '../../Assets/Expa_Logo.png';

const TraineeNavBar = ({ setActiveTab }) => {
    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src={ExpaLogo} alt="Logo" className="logo" />
            </div>
            <ul className="nav-links">
                <li><a href="#" onClick={() => setActiveTab('home')}>Home</a></li>
                <li><a href="#" onClick={() => setActiveTab('profile')}>Profile</a></li>
                <li><a href="#" onClick={() => setActiveTab('assessments')}>Assessments</a></li>
            </ul>
        </nav>
    );
};

export default TraineeNavBar;