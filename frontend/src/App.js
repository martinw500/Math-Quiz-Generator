import React, { useState } from 'react';
import styled from 'styled-components';
import QuizSetup from './components/QuizSetup';
import QuizGame from './components/QuizGame';
import Results from './components/Results';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
`;

function App() {
  const [gameState, setGameState] = useState('setup'); // setup, playing, results
  const [quizConfig, setQuizConfig] = useState({});
  const [results, setResults] = useState({});

  const startQuiz = (config) => {
    setQuizConfig(config);
    setGameState('playing');
  };

  const finishQuiz = (finalResults) => {
    setResults(finalResults);
    setGameState('results');
  };

  const resetQuiz = () => {
    setGameState('setup');
    setQuizConfig({});
    setResults({});
  };

  return (
    <AppContainer>
      <Card>
        <Title>🧮 Math Quiz Generator</Title>
        
        {gameState === 'setup' && (
          <QuizSetup onStartQuiz={startQuiz} />
        )}
        
        {gameState === 'playing' && (
          <QuizGame 
            config={quizConfig} 
            onFinish={finishQuiz}
            onReset={resetQuiz}
          />
        )}
        
        {gameState === 'results' && (
          <Results 
            results={results}
            onReset={resetQuiz}
          />
        )}
      </Card>
    </AppContainer>
  );
}

export default App;
