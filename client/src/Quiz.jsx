import { useState, useEffect } from "react";
import "./Quiz.css";

const allQuestions = {
  "Critical Thinking": [
    {
      question: "What number comes next in the series: 2, 3, 5, 9, 17, ___?",
      options: ["29", "33", "35", "37"],
      correct_answer: "33",
    },
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correct_answer: "Paris",
    },
  ],
  "Gender Sensitivity": [
    {
      question: "Can a woman be the primary breadwinner of the family?",
      options: [
        "Yes",
        "No",
        "Depends on the country",
        "Only in specific professions",
      ],
      correct_answer: "Yes",
    },
  ],
  Ethics: [
    {
      question:
        "Is it okay to cheat in an exam if you're sure you won’t get caught?",
      options: [
        "Yes",
        "No",
        "Depends on the circumstances",
        "It depends on the subject",
      ],
      correct_answer: "No",
    },
  ],
};

const getRandomQuestion = (questions) => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    const selectedQuestions = Object.keys(allQuestions).map((topic) =>
      getRandomQuestion(allQuestions[topic])
    );
    setQuestions(shuffleArray(selectedQuestions));
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
    setSelectedOption("");
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="results">
        <h1>Quiz Completed!</h1>
        <p>
          Your Score: {score}/{questions.length}
        </p>
      </div>
    );
  }

  const question = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h1 className="question">{question.question}</h1>
      <div className="options">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionChange(option)}
            disabled={selectedOption}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={!selectedOption}
      >
        Submit
      </button>
    </div>
  );
};

export default Quiz;
