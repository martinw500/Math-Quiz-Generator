import React from 'react';
import styled from 'styled-components';

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
`;

const ScoreDisplay = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: ${props => props.percentage >= 80 ? '#28a745' : props.percentage >= 60 ? '#ffc107' : '#dc3545'};
`;

const Message = styled.div`
  font-size: 1.2rem;
  color: #666;
`;

const RestartButton = styled.button`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

function Results({ results, onReset }) {
  const getEmoji = (percentage) => {
    if (percentage >= 90) return '🏆';
    if (percentage >= 80) return '🎉';
    if (percentage >= 70) return '👍';
    if (percentage >= 60) return '👌';
    return '💪';
  };

  const getMessage = (percentage) => {
    if (percentage >= 90) return 'Outstanding! You\'re a math wizard!';
    if (percentage >= 80) return 'Great job! You\'re doing excellent!';
    if (percentage >= 70) return 'Good work! Keep practicing!';
    if (percentage >= 60) return 'Not bad! Room for improvement!';
    return 'Keep practicing! You\'ll get better!';
  };

  return (
    <ResultsContainer>
      <div style={{ fontSize: '4rem' }}>
        {getEmoji(results.percentage)}
      </div>
      
      <ScoreDisplay percentage={results.percentage}>
        {results.percentage}%
      </ScoreDisplay>
      
      <div>
        You got {results.score} out of {results.total} questions correct!
      </div>
      
      <Message>
        {getMessage(results.percentage)}
      </Message>
      
      <RestartButton onClick={onReset}>
        🔄 Take Another Quiz
      </RestartButton>
    </ResultsContainer>
  );
}

export default Results;
