import React, { useState } from 'react';
import styled from 'styled-components';

const SetupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OptionGroup = styled.div`
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
`;

const Slider = styled.input`
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: #ddd;
  outline: none;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #667eea;
    cursor: pointer;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #667eea;
`;

const StartButton = styled.button`
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

const SliderValue = styled.span`
  font-weight: bold;
  color: #667eea;
`;

function QuizSetup({ onStartQuiz }) {
  const [difficulty, setDifficulty] = useState(3);
  const [numQuestions, setNumQuestions] = useState(10);
  const [includeMultDiv, setIncludeMultDiv] = useState(false);
  const [includeSqrtExp, setIncludeSqrtExp] = useState(false);

  const handleStart = () => {
    onStartQuiz({
      difficulty,
      numQuestions,
      includeMultDiv,
      includeSqrtExp
    });
  };

  return (
    <SetupContainer>
      <OptionGroup>
        <Label>Difficulty: <SliderValue>{difficulty}</SliderValue></Label>
        <Slider
          type="range"
          min="1"
          max="5"
          value={difficulty}
          onChange={(e) => setDifficulty(parseInt(e.target.value))}
        />
      </OptionGroup>

      <OptionGroup>
        <Label>Number of Questions: <SliderValue>{numQuestions}</SliderValue></Label>
        <Slider
          type="range"
          min="5"
          max="25"
          value={numQuestions}
          onChange={(e) => setNumQuestions(parseInt(e.target.value))}
        />
      </OptionGroup>

      <OptionGroup>
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={includeMultDiv}
            onChange={(e) => setIncludeMultDiv(e.target.checked)}
          />
          <Label>Include Multiplication & Division</Label>
        </CheckboxContainer>

        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={includeSqrtExp}
            onChange={(e) => setIncludeSqrtExp(e.target.checked)}
          />
          <Label>Include Square Roots & Exponents</Label>
        </CheckboxContainer>
      </OptionGroup>

      <StartButton onClick={handleStart}>
        🚀 Start Quiz
      </StartButton>
    </SetupContainer>
  );
}

export default QuizSetup;
