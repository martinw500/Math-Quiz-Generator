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
            # Validate difficulty
            difficulty = max(1, min(5, difficulty))
            
            num1 = random.randint(1, difficulty * 50)
            num2 = random.randint(1, difficulty * 50)
            
            operators = ['+', '-']
            
            if include_multdiv:
                operators.extend(['*', '/'])
            
            if include_sqrtexp:
                operators.extend(['**', 'sqrt'])
            
            operator_choice = random.choice(operators)
            
            if operator_choice == '/':
                num1 *= num2  # Ensure division results in whole number
            
            if operator_choice == '**':
                if difficulty < 3:
                    num1 = random.randint(1, difficulty * 2 + 1)
                else:
                    num1 = random.randint(1, int(((difficulty**2) - (difficulty**2) % 2) / 2))
                num2 = random.randint(0, difficulty + 1)
                question = f"{num1}^{num2}"
                answer = num1 ** num2
            elif operator_choice == 'sqrt':
                num1 = random.randint(1, difficulty * 5)
                num1 **= 2
                question = f"√{num1}"
                answer = math.sqrt(num1)
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
        difficulty = max(1, min(5, difficulty))
        
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
