import React, { useState } from 'react';
import './Feedback.css';

const Feedback = () => {
    const [trainerName, setTrainerName] = useState('');
    const [question1, setQuestion1] = useState('');
    const [question2, setQuestion2] = useState('');
    const [question3, setQuestion3] = useState('');
    const [comments, setComments] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://your-backend-api.com/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    trainerName,
                    question1,
                    question2,
                    question3,
                    comments,
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('Feedback submitted successfully!');
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="feedback">
            <h2>Feedback</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Trainer Username:
                    <input type="text" value={trainerName} onChange={(e) => setTrainerName(e.target.value)} />
                </label>
                <label>
                    Question 1:
                    <input type="text" value={question1} onChange={(e) => setQuestion1(e.target.value)} />
                </label>
                <label>
                    Question 2:
                    <input type="text" value={question2} onChange={(e) => setQuestion2(e.target.value)} />
                </label>
                <label>
                    Question 3:
                    <input type="text" value={question3} onChange={(e) => setQuestion3(e.target.value)} />
                </label>
                <label>
                    Comments:
                    <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Feedback;
