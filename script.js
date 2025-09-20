// Quiz questions
const questions = [
    { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correct: 2 },
    { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1 },
    { question: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], correct: 1 },
    { question: "Which element has the chemical symbol 'O'?", options: ["Gold", "Oxygen", "Osmium", "Oganesson"], correct: 1 },
    { question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"], correct: 2 }
];

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const currentQuestionElement = document.getElementById('current');
const totalQuestionsElement = document.getElementById('total');
const scoreElement = document.getElementById('score');
const correctAnswersElement = document.getElementById('correct-answers');
const totalQuestionsResultElement = document.getElementById('total-questions');
const resultMessageElement = document.getElementById('result-message');
const resultEmojiElement = document.getElementById('result-emoji');
const timeElement = document.getElementById('time');

// Quiz state
let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;
let selectedOption = null;

// Initialize quiz
function initQuiz() {
    currentQuestion = 0;
    score = 0;
    totalQuestionsElement.textContent = questions.length;
    loadQuestion();
}

// Load question
function loadQuestion() {
    clearInterval(timer);
    resetOptions();
    nextBtn.style.display = 'none';
    
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    currentQuestionElement.textContent = currentQuestion + 1;
    
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index, optionElement));
        optionsContainer.appendChild(optionElement);
    });
    
    timeLeft = 15;
    timeElement.textContent = timeLeft;
    startTimer();
}

// Start timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeUp();
        }
    }, 1000);
}

// Handle time up
function handleTimeUp() {
    const correctIndex = questions[currentQuestion].correct;
    optionsContainer.children[correctIndex].classList.add('correct');
    disableOptions();
    setTimeout(nextQuestion, 1500);
}

// Select option
function selectOption(index, optionElement) {
    if (selectedOption !== null) return;
    selectedOption = index;
    optionElement.classList.add('selected');
    
    const correctIndex = questions[currentQuestion].correct;
    const correctOption = optionsContainer.children[correctIndex];
    
    if (index === correctIndex) score++, optionElement.classList.add('correct');
    else optionElement.classList.add('incorrect'), correctOption.classList.add('correct');
    
    disableOptions();
    clearInterval(timer);
    nextBtn.style.display = 'block';
}

// Disable options
function disableOptions() {
    Array.from(optionsContainer.children).forEach(opt => opt.style.pointerEvents = 'none');
}

// Reset options
function resetOptions() {
    selectedOption = null;
    Array.from(optionsContainer.children).forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
        opt.style.pointerEvents = 'auto';
    });
}

// Next question
function nextQuestion() {
    currentQuestion++;
    currentQuestion < questions.length ? loadQuestion() : showResults();
}

// Show results
function showResults() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    scoreElement.textContent = `${score}/${questions.length}`;
    correctAnswersElement.textContent = score;
    totalQuestionsResultElement.textContent = questions.length;
    
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) resultMessageElement.textContent = "Excellent! You're a genius!", resultEmojiElement.textContent = "🎓";
    else if (percentage >= 60) resultMessageElement.textContent = "Good job! Well done!", resultEmojiElement.textContent = "👍";
    else if (percentage >= 40) resultMessageElement.textContent = "Not bad! Keep learning!", resultEmojiElement.textContent = "🙂";
    else resultMessageElement.textContent = "Better luck next time!", resultEmojiElement.textContent = "😊";
}

// Event listeners
startBtn.addEventListener('click', () => (startScreen.classList.remove('active'), quizScreen.classList.add('active'), initQuiz()));
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', () => (resultScreen.classList.remove('active'), startScreen.classList.add('active')));

// Initialize total questions display
totalQuestionsElement.textContent = questions.length;

