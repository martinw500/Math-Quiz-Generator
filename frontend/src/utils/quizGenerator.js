// Frontend-only quiz generator with intelligent difficulty system
// This mirrors the backend logic for GitHub Pages deployment

class QuizGenerator {
  constructor() {
    this.maxAttempts = 50;
  }

  // Weighted random choice function (since we don't have numpy)
  weightedChoice(choices, weights) {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < choices.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        return choices[i];
      }
    }
    return choices[choices.length - 1];
  }

  generateQuestion(difficulty, includeMultDiv = false, includeSqrtExp = false) {
    try {
      difficulty = Math.max(1, Math.min(10, difficulty));
      
      // Intelligent operation selection
      const operators = [];
      const operationWeights = [];
      
      // Basic operations with smart weighting
      operators.push('+', '-');
      if (difficulty <= 3) {
        operationWeights.push(8, 8);
      } else if (difficulty <= 6) {
        operationWeights.push(4, 4);
      } else {
        operationWeights.push(2, 2);
      }
      
      // Multiplication and division
      if (includeMultDiv || difficulty >= 4) {
        operators.push('*', '/');
        if (difficulty <= 5) {
          operationWeights.push(6, 5);
        } else {
          operationWeights.push(7, 8);
        }
      }
      
      // Advanced operations
      if (includeSqrtExp || difficulty >= 6) {
        operators.push('**', 'sqrt');
        const expWeight = Math.max(2, difficulty - 3);
        operationWeights.push(expWeight, expWeight);
      }
      
      // Choose operator
      const operatorChoice = this.weightedChoice(operators, operationWeights);
      
      // Generate numbers intelligently
      let num1, num2;
      
      if (operatorChoice === '+' || operatorChoice === '-') {
        const maxNum = difficulty <= 3 ? difficulty * 15 : 
                      difficulty <= 6 ? difficulty * 40 : difficulty * 80;
        num1 = Math.floor(Math.random() * maxNum) + 1;
        num2 = Math.floor(Math.random() * maxNum) + 1;
        
      } else if (operatorChoice === '*') {
        if (difficulty <= 3) {
          num1 = Math.floor(Math.random() * (difficulty * 4)) + 2;
          num2 = Math.floor(Math.random() * (difficulty * 4)) + 2;
        } else if (difficulty <= 6) {
          num1 = Math.floor(Math.random() * (difficulty * 8)) + 3;
          num2 = Math.floor(Math.random() * (difficulty * 8)) + 3;
          // Avoid powers of 10 at high difficulty
          if (difficulty > 4) {
            while ([10, 100, 1000].includes(num1) || [10, 100, 1000].includes(num2)) {
              num1 = Math.floor(Math.random() * (difficulty * 8)) + 3;
              num2 = Math.floor(Math.random() * (difficulty * 8)) + 3;
            }
          }
        } else {
          num1 = Math.floor(Math.random() * (difficulty * 12)) + 5;
          num2 = Math.floor(Math.random() * (difficulty * 12)) + 5;
        }
        
      } else if (operatorChoice === '/') {
        // ALWAYS ensure division results in whole numbers
        let divisor, multiplier;
        if (difficulty <= 3) {
          divisor = Math.floor(Math.random() * 7) + 2; // 2-8
          multiplier = Math.floor(Math.random() * 10) + 1; // 1-10
        } else if (difficulty <= 6) {
          divisor = Math.floor(Math.random() * 13) + 3; // 3-15
          multiplier = Math.floor(Math.random() * 19) + 2; // 2-20
        } else {
          // High difficulty: larger numbers, avoid trivial cases
          divisor = Math.floor(Math.random() * 24) + 7; // 7-30
          multiplier = Math.floor(Math.random() * 96) + 5; // 5-100
          // Avoid same-number divisions at high difficulty
          while (multiplier === 1 && difficulty > 5) {
            multiplier = Math.floor(Math.random() * 96) + 5;
          }
        }
        num1 = divisor * multiplier; // Ensures perfect division
        num2 = divisor;
        
      } else if (operatorChoice === '**') {
        if (difficulty <= 3) {
          num1 = Math.floor(Math.random() * 7) + 2; // 2-8
          num2 = Math.floor(Math.random() * 2) + 2; // 2-3
        } else if (difficulty <= 6) {
          num1 = Math.floor(Math.random() * 10) + 3; // 3-12
          num2 = Math.floor(Math.random() * 3) + 2; // 2-4
        } else {
          num1 = Math.floor(Math.random() * 17) + 4; // 4-20
          num2 = Math.floor(Math.random() * 4) + 2; // 2-5
        }
        
      } else if (operatorChoice === 'sqrt') {
        let base;
        if (difficulty <= 3) {
          base = Math.floor(Math.random() * 11) + 2; // 2-12
        } else if (difficulty <= 6) {
          base = Math.floor(Math.random() * 22) + 4; // 4-25
        } else {
          base = Math.floor(Math.random() * 43) + 8; // 8-50
        }
        num1 = base * base; // Perfect square
        num2 = 0; // Not used for sqrt
      }
      
      // Generate question and answer
      let question, answer;
      
      if (operatorChoice === '/') {
        question = `${num1} ÷ ${num2}`;
        answer = Math.floor(num1 / num2); // Integer division ensures whole numbers
        
      } else if (operatorChoice === '**') {
        question = `${num1}^{${num2}}`;
        answer = Math.pow(num1, num2);
        
      } else if (operatorChoice === 'sqrt') {
        question = `\\sqrt{${num1}}`;
        answer = Math.sqrt(num1);
        
      } else {
        question = `${num1} ${operatorChoice} ${num2}`;
        if (operatorChoice === '+') {
          answer = num1 + num2;
        } else if (operatorChoice === '-') {
          answer = Math.max(num1, num2) - Math.min(num1, num2); // Avoid negatives
        } else if (operatorChoice === '*') {
          answer = num1 * num2;
        }
      }
      
      return {
        question: question,
        answer: parseFloat(answer)
      };
      
    } catch (error) {
      console.error('Error generating question:', error);
      // Fallback question
      return {
        question: `${Math.floor(Math.random() * 10) + 1} + ${Math.floor(Math.random() * 10) + 1}`,
        answer: parseFloat(Math.floor(Math.random() * 19) + 2)
      };
    }
  }

  generateQuiz(difficulty, numQuestions, includeMultDiv = false, includeSqrtExp = false) {
    const questions = [];
    for (let i = 0; i < numQuestions; i++) {
      const question = this.generateQuestion(difficulty, includeMultDiv, includeSqrtExp);
      questions.push(question);
    }
    return { questions };
  }

  checkAnswer(userAnswer, correctAnswer) {
    const tolerance = 0.001;
    const isCorrect = Math.abs(userAnswer - correctAnswer) < tolerance;
    return {
      correct: isCorrect,
      correctAnswer: correctAnswer
    };
  }
}

export default QuizGenerator;
