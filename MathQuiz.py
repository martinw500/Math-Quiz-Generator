import random
import math
import time
from tkinter import *

#Defines lists for later use. Determines whether to include multiplication, division, roots, or exponents in the problems
#Uses lists instead of integers in order for it to work with parameters
multidiv = [0]
sqrtexp = [0]

#Create a new window
root = Tk()

#Enter key will also submit your answer
root.bind('<Return>', lambda event: var.set(1))

#Variable to check for change
var = IntVar()

#Defines a function to increase a certain variable using a parameter
def valuechange(variable):
    variable[0] += 1

#Defines a function intended to be run after the start button has been clicked
def start_quiz():
    #Prevents the button from being clicked again
    startbutton.config(state="disabled")
    math_quiz()

#Function to create 1 question
def generate_question(difficulty):
    #Generates 2 different numbers based on difficulty chosen
    num1 = random.randint(1, difficulty*50)
    num2 = random.randint(1, difficulty*50)
    #Creates a list for the operators that may be used. Only addition and subtraction are avaialable by default
    operator = ['+', '-']
    #If the user selects to do multiplication & division, the 2 operators will be added to the list
    #The %2 indicates mod, this is used to determine whether the box is checked or not because the user can click the button multiple times
    if (multidiv[0]%2) == 1:
        operator.extend(['*', '/'])
    #If the user selects to do roots & exponents, the 2 operators will be added to the list
    if (sqrtexp[0]%2) == 1:
        operator.extend(['**', 'sqrt'])
    #Selects a random operator from the list to be used in the question
    operatorchoice = random.choice(operator)
    #If the operator is division
    if operatorchoice == '/':
        num1 *= num2  #Ensure division results in a whole number
    #If the operator is exponent, change the value of the numbers in the question in order to curve the difficulties
    if operatorchoice == '**':
        if difficulty < 3:
            num1 = random.randint(1,difficulty*2+1)
        else:
            #Ensures the value is an integer. If the number is even, subtract 0, if odd, subtract 1.
            num1 = random.randint(1, int(((difficulty**2)-(difficulty**2)%2)/2))
        num2 = random.randint(0, difficulty+1)
        #Creates the question by placing the operator in between the two numbers
        question1 = str(num1) + '^' + str(num2)
        answer = num1 ** num2
    #Curves the difficulty if the question is square rooted
    elif operatorchoice == 'sqrt':
        num1 = random.randint(1,difficulty*5)
        num1 **= 2
        question1 = 'sqrt(' + str(num1) + ')'
        answer = math.sqrt(num1)
    else:
        question1 = str(num1) + str(operatorchoice) + str(num2)
        answer = eval(question1)
    return question1, answer

#Based on user input, create i number of questions
def math_quiz():
    #slider.get is the value set by the difficulty slider
    questions = [generate_question(slider.get()) for i in range(length.get())]
    #Defines a score variable, it will be out of 100
    score = 0
    for i, (question1, answer) in enumerate(questions):
        #Updates the label to display current question
        questionmessage.config(text=f"Question {i+1}: {question1}")
        root.update()  #Update the GUI
        while True:
            #Wait for user to submit their answer
            submit_button.wait_variable(var)
            try:
                #Takes the answer from the input box
                user_answer = float(answerbox.get())
                break
            #If the value is not a float execute this code and return to the start of the loop
            except ValueError:
                feedback.config(text = "That wasn't an integer!")
                root.update()
        #If users answer is corect, update the label to display "Correct!" and give the user 100 points
        if user_answer == answer:
            feedback.config(text = "Correct!")
            root.update()
            score += 100
        #Else change label and show correct answer
        else:
            feedback.config(text = "Sorry, that's incorrect. The correct answer is " + str(answer) +".")
            root.update()
        #Clear the input field for the next question
        answerbox.delete(0, 'end')
    #Once all questions have finished, divide accumulated score  by the total number of questions to get the mean score
    #Gives time for the user to read feedback before being given final score
    time.sleep(1)
    feedback.config(text="Your final score is " + str(score/len(questions)) + "%.")
    root.update()


root.configure(background= "#F9B1B0")

#Label to display what the checkmark box below corresponds to
multidivmessage = Label(root, text = "Problems with multiplication and division", bg="#F9B1B0")
multidivmessage.grid(row=0, column = 0, sticky = "nsew")

#Checkmark button to include multiplication and division
multidivbutton = Checkbutton(root, command = valuechange(multidiv), bg="#F9B1B0")
multidivbutton.grid(row=1, column = 0, sticky = "nsew")

#Label to display what the checkmark box below corresponds to
sqrtexpmessage = Label(root, text = "Problems with roots and exponents", bg="#F9B1B0")
sqrtexpmessage.grid(row=2, column = 0, sticky = "nsew")

#Checkmark button to include square roots and exponents
sqrtexpbutton = Checkbutton(root, command = valuechange(sqrtexp), bg="#F9B1B0")
sqrtexpbutton.grid(row=3, column = 0, sticky = "nsew")

#Label to display what the slider below corresponds to
difficultymessage = Label(root, text = "Select your difficulty", bg="#F9B1B0")
difficultymessage.grid(row=4, column = 0, sticky = "nsew")
#Slider to let the user choose a difficulty between 1 and 5 inclusive
slider = Scale(root, from_ = 1, to = 5, orient = HORIZONTAL, bg="#F9B1B0")
slider.grid(row=5, column = 0, sticky = "nsew")

#Label to display what the slider below corresponds to
lengthmessage = Label(root, text = "Select total number of questions", bg="#F9B1B0")
lengthmessage.grid(row=6, column = 0, sticky = "nsew")
#Slider to let the user choose the total number of questions (between 1 and 25 inclusive)
length = Scale(root, from_ = 1, to = 25, orient = HORIZONTAL, bg="#F9B1B0")
length.grid(row=7, column = 0, sticky = "nsew")

#Button to start the quiz
startbutton = Button(root, text = "Click here to start", command=start_quiz, bg="#F9B1B0")
startbutton.grid(row=8, column = 0, sticky = "nsew")

#Label to display the current question
questionmessage = Label(root, text = "Question:", bg="#F9B1B0")
questionmessage.grid(row=9, column = 0, sticky = "nsew")
#Input field for the user to enter their answer
answerbox = Entry(root)
answerbox.grid(row=10, column = 0, sticky = "nsew")

#Create a submit button
submit_button = Button(root, text="Submit", command=lambda: var.set(1), bg="#F9B1B0")
submit_button.grid(row=11, column = 0, sticky = "nsew")

#Label to display the result of answer: correct, incorrect, or invalid input
feedback = Label(root, text="", bg="#F9B1B0")
feedback.grid(row=12, column = 0, sticky = "nsew")

root.mainloop() 