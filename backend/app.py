from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import math
import os
from werkzeug.exceptions import BadRequest

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Configuration
app.config['DEBUG'] = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'
app.config['PORT'] = int(os.environ.get('PORT', 5000))

class QuizGenerator:
    def __init__(self):
        pass
    
    def generate_question(self, difficulty, include_multdiv=False, include_sqrtexp=False):
        """Generate a single math question based on difficulty and operation types"""
        try:
            # Validate difficulty (now supports 1-10)
            difficulty = max(1, min(10, difficulty))
            
            # Dynamic number ranges based on difficulty
            if difficulty <= 2:
                max_range = difficulty * 25
            elif difficulty <= 5:
                max_range = difficulty * 50
            elif difficulty <= 7:
                max_range = difficulty * 100
            else:
                max_range = difficulty * 200
            
            num1 = random.randint(1, max_range)
            num2 = random.randint(1, max_range)
            
            # Dynamic operation selection based on difficulty
            operators = []
            operation_weights = []
            
            # Addition and subtraction (always available, but weight decreases with difficulty)
            operators.extend(['+', '-'])
            add_sub_weight = max(1, 10 - difficulty)  # Weight decreases from 10 to 1
            operation_weights.extend([add_sub_weight, add_sub_weight])
            
            # Multiplication and division (auto-include at higher difficulties)
            if include_multdiv or difficulty >= 4:
                operators.extend(['*', '/'])
                mult_div_weight = min(10, difficulty * 2)  # Weight increases with difficulty
                operation_weights.extend([mult_div_weight, mult_div_weight])
            
            # Square roots and exponents (auto-include at higher difficulties)
            if include_sqrtexp or difficulty >= 6:
                operators.extend(['**', 'sqrt'])
                sqrt_exp_weight = max(1, difficulty - 3)  # Weight increases significantly after difficulty 3
                operation_weights.extend([sqrt_exp_weight, sqrt_exp_weight])
              # Choose operator based on weights
            operator_choice = random.choices(operators, weights=operation_weights)[0]
              # Generate question based on operator
            if operator_choice == '/':
                # ALWAYS ensure division results in whole number (no decimals)
                # Generate divisor first, then create dividend as a multiple
                if difficulty <= 3:
                    divisor = random.randint(2, 8)
                    multiplier = random.randint(1, 10)
                elif difficulty <= 6:
                    divisor = random.randint(3, 15)
                    multiplier = random.randint(2, 25)
                else:
                    # For high difficulty, use larger numbers and avoid trivial cases
                    divisor = random.randint(7, 30)
                    multiplier = random.randint(5, 100)
                    # Avoid same-number divisions at high difficulty (like 110/110 = 1)
                    while multiplier == 1 and difficulty > 5:
                        multiplier = random.randint(5, 100)
                
                # Create dividend as multiple of divisor to ensure whole number result
                num1 = divisor * multiplier
                num2 = divisor
            
            if operator_choice == '**':
                # Adjust exponent ranges based on difficulty
                if difficulty <= 3:
                    num1 = random.randint(1, difficulty * 3)
                    num2 = random.randint(2, difficulty + 1)
                elif difficulty <= 6:
                    num1 = random.randint(1, difficulty * 5)
                    num2 = random.randint(2, difficulty + 2)
                else:
                    num1 = random.randint(1, difficulty * 8)
                    num2 = random.randint(2, min(difficulty, 6))  # Cap exponent to prevent overflow
                
                question = f"{num1}^{{{num2}}}"  # LaTeX format for superscript
                answer = num1 ** num2
                
            elif operator_choice == 'sqrt':
                # Generate perfect squares for cleaner answers
                if difficulty <= 3:
                    base = random.randint(1, difficulty * 5)
                elif difficulty <= 6:
                    base = random.randint(1, difficulty * 8)
                else:
                    base = random.randint(1, difficulty * 12)
                
                num1 = base ** 2
                question = f"\\sqrt{{{num1}}}"  # LaTeX format for square root
                answer = float(base)
                
            else:
                question = f"{num1} {operator_choice} {num2}"
                answer = eval(f"{num1} {operator_choice} {num2}")
            
            return {
                'question': question,
                'answer': float(answer)
            }
        except Exception as e:
            app.logger.error(f"Error generating question: {str(e)}")
            # Return a simple fallback question
            return {
                'question': f"{random.randint(1, 10)} + {random.randint(1, 10)}",
                'answer': float(random.randint(2, 20))
            }

quiz_gen = QuizGenerator()

@app.errorhandler(BadRequest)
def handle_bad_request(e):
    return jsonify({'error': 'Invalid request data'}), 400

@app.errorhandler(500)
def handle_internal_error(e):
    return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/generate-quiz', methods=['POST'])
def generate_quiz():
    """Generate a quiz with multiple questions"""
    try:
        data = request.get_json()
        
        if not data:
            raise BadRequest("No JSON data provided")
          # Validate and sanitize inputs
        difficulty = int(data.get('difficulty', 1))
        difficulty = max(1, min(10, difficulty))  # Updated to support 1-10
        
        num_questions = int(data.get('numQuestions', 5))
        num_questions = max(1, min(50, num_questions))  # Reasonable limits
        
        include_multdiv = bool(data.get('includeMultDiv', False))
        include_sqrtexp = bool(data.get('includeSqrtExp', False))
        
        questions = []
        for _ in range(num_questions):
            question_data = quiz_gen.generate_question(
                difficulty, include_multdiv, include_sqrtexp
            )
            questions.append(question_data)
        
        return jsonify({'questions': questions})
    
    except (ValueError, TypeError) as e:
        app.logger.error(f"Validation error in generate_quiz: {str(e)}")
        return jsonify({'error': 'Invalid input parameters'}), 400
    except Exception as e:
        app.logger.error(f"Error in generate_quiz: {str(e)}")
        return jsonify({'error': 'Failed to generate quiz'}), 500

@app.route('/api/submit-answer', methods=['POST'])
def submit_answer():
    """Check if submitted answer is correct"""
    try:
        data = request.get_json()
        
        if not data:
            raise BadRequest("No JSON data provided")
        
        user_answer = float(data.get('userAnswer', 0))
        correct_answer = float(data.get('correctAnswer', 0))
        
        # Use small tolerance for floating point comparison
        tolerance = 0.001
        is_correct = abs(user_answer - correct_answer) < tolerance
        
        return jsonify({
            'correct': is_correct,
            'correctAnswer': correct_answer
        })
    
    except (ValueError, TypeError) as e:
        app.logger.error(f"Validation error in submit_answer: {str(e)}")
        return jsonify({'error': 'Invalid answer format'}), 400
    except Exception as e:
        app.logger.error(f"Error in submit_answer: {str(e)}")
        return jsonify({'error': 'Failed to check answer'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Math Quiz Generator API is running'
    })

if __name__ == '__main__':
    port = app.config['PORT']
    debug = app.config['DEBUG']
    
    print(f"🚀 Starting Math Quiz Generator Backend...")
    print(f"📍 Server running on: http://localhost:{port}")
    print(f"🔧 Debug mode: {debug}")
    print(f"📊 Health check: http://localhost:{port}/api/health")
    print(f"⚡ Ready for frontend connections!")
    
    app.run(debug=debug, port=port, host='0.0.0.0')
