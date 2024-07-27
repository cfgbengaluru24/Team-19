import { useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";

export const Comm = function Example() {
  const [value, setValue] = useState("");
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");
  const question = "What are your strengths and weaknesses?"; // Hardcoded question
  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });

  const handleMouseUp = () => {
    stop();
    // Send the question and recorded text to the backend
    fetch("http://localhost:5000/trainee/assess-voice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, answer: value }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setScore(data.score); // Set the score from the response
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setError("There was an error processing your request.");
      });
  };

  return (
    <div>
      <p>{question}</p>
      <button onMouseDown={listen} onMouseUp={handleMouseUp}>
        🎤
      </button>
      {score && (
        <div>
          <h3>Score:</h3>
          <p>{score}</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};
