import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MathExpression from './MathExpression';
import QuizGenerator from '../utils/quizGenerator';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: #eee;
  border-radius: 5px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
`;

const QuestionText = styled.h2`
  font-size: 2rem;
  color: #333;
  margin: 1rem 0;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnswerInput = styled.input`
  padding: 1rem;
  font-size: 1.2rem;
  border: 2px solid #ddd;
  border-radius: 10px;
  text-align: center;
  outline: none;
  
  &:focus {
    border-color: #667eea;
  }
`;

const SubmitButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #5a6fd8;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Feedback = styled.div`
  padding: 1rem;
  border-radius: 10px;
  font-weight: 600;
  background: ${props => props.correct ? '#d4edda' : '#f8d7da'};
  color: ${props => props.correct ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.correct ? '#c3e6cb' : '#f5c6cb'};
`;

function QuizGame({ config, onFinish, onReset }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizGenerator] = useState(() => new QuizGenerator());

  useEffect(() => {
    generateQuiz();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const generateQuiz = () => {
    try {
      // Use local quiz generator instead of API call
      const quizData = quizGenerator.generateQuiz(
        config.difficulty,
        config.numQuestions,
        config.includeMultDiv,
        config.includeSqrtExp
      );
      setQuestions(quizData.questions);
      setLoading(false);
    } catch (error) {
      console.error('Error generating quiz:', error);
      setLoading(false);
    }
  };

  const submitAnswer = () => {
    if (!userAnswer.trim()) return;

    try {
      // Use local answer checking instead of API call
      const result = quizGenerator.checkAnswer(
        parseFloat(userAnswer),
        questions[currentQuestion].answer
      );

      const isCorrect = result.correct;
      
      if (isCorrect) {
        setScore(score + 1);
        setFeedback('Correct! 🎉');
      } else {
        setFeedback(`Incorrect. The answer was ${result.correctAnswer}`);
      }
      
      setShowFeedback(true);
        setTimeout(() => {
        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion(currentQuestion + 1);
          setUserAnswer('');
          setShowFeedback(false);
          setFeedback('');
        } else {
          const finalScore = isCorrect ? score + 1 : score;
          onFinish({
            score: finalScore,
            total: questions.length,
            percentage: Math.round((finalScore / questions.length) * 100)
          });
        }
      }, 1500);
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !showFeedback) {
      submitAnswer();
    }
  };

  if (loading) {
    return <div>Generating your quiz... 🎲</div>;
  }

  if (questions.length === 0) {
    return <div>Error loading quiz. Please try again.</div>;
  }

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <GameContainer>
      <ProgressBar>
        <Progress percentage={progressPercentage} />
      </ProgressBar>
      
      <div>Question {currentQuestion + 1} of {questions.length}</div>
        <QuestionText>
        <MathExpression expression={questions[currentQuestion]?.question} />
      </QuestionText>
      
      <AnswerInput
        type="number"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter your answer"
        disabled={showFeedback}
      />
      
      <SubmitButton 
        onClick={submitAnswer} 
        disabled={showFeedback || !userAnswer.trim()}
      >
        Submit Answer
      </SubmitButton>
      
      {showFeedback && (
        <Feedback correct={feedback.includes('Correct')}>
          {feedback}
        </Feedback>
      )}
      
      <button onClick={onReset} style={{marginTop: '1rem', background: 'transparent', border: '1px solid #ddd', padding: '0.5rem', borderRadius: '5px', cursor: 'pointer'}}>
        Reset Quiz
      </button>
    </GameContainer>
  );
}

export default QuizGame;
