// container of all quiz questions, options, and correct answers
const questions = [
    {
        question: "When was Treaty 6 signed?",
        options: ["1867", "1876", "1885", "1905"],
        answer: 1 // Index of correct option (1876)
    },
    {
        question: "Which Indigenous groups are part of Treaty 6?",
        options: [
            "Cree, Dene, and Stoney Nakoda",
            "Haida and Tlingit",
            "Mohawk and Huron-Wendat",
            "Inuit and Métis only"
        ],
        answer: 0
    },
    {
        question: "What was promised under Treaty 6?",
        options: [
            "Unlimited hunting rights",
            "Education, medicine, and farming tools",
            "Ownership of all land in Canada",
            "Exemption from all laws"
        ],
        answer: 1
    },
    {
        question: "Where was Treaty 6 first signed?",
        options: [
            "Fort Edmonton",
            "Fort Carlton and Fort Pitt",
            "Batoche",
            "Blackfoot Crossing"
        ],
        answer: 1
    },
    {
        question: "What is the spirit and intent of Treaty 6?",
        options: [
            "Assimilation of Indigenous peoples",
            "Peace, sharing, and mutual respect",
            "Surrender of all Indigenous rights",
            "A temporary agreement"
        ],
        answer: 1
    }
];

// Track current question and user's score
let currentQuestion = 0;
let score = 0;

// Load the first question when the page loads
loadQuestion();

// Function to display the current question and options
function loadQuestion() {
    // Get current question object
    const q = questions[currentQuestion];
    
    // Display question text and progress
    document.getElementById("questionContainer").textContent = q.question;
    document.getElementById("quizProgress").textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    
    // Clear previous options and create new buttons for each option
    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = "";
    
    // Create a button for each answer option
    q.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(index); // Set click handler
        optionsContainer.appendChild(button);
    });
    
    // Hide next button and clear result message for new question
    document.getElementById("nextButton").style.display = "none";
    document.getElementById("quizResult").textContent = "";
}

// Function to check if selected answer is correct
function checkAnswer(selectedIndex) {
    const q = questions[currentQuestion];
    const options = document.querySelectorAll("#optionsContainer button");
    
    // Disable all buttons to prevent multiple selections
    options.forEach(button => button.disabled = true);
    
    // Check if selected answer is correct
    if (selectedIndex === q.answer) {
        // Highlight correct answer in green
        options[selectedIndex].style.background = "#4CAF50";
        document.getElementById("quizResult").textContent = "Correct!";
        score++; // Increment score
    } else {
        // Highlight wrong answer in red and correct answer in green
        options[selectedIndex].style.background = "#f44336";
        options[q.answer].style.background = "#4CAF50";
        document.getElementById("quizResult").textContent = `Incorrect. The answer is: ${q.options[q.answer]}`;
    }
    
    // Show next button to proceed
    document.getElementById("nextButton").style.display = "block";
}

// Event handler for next button
document.getElementById("nextButton").onclick = function() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        // Load next question if available
        loadQuestion();
    } else {
        // Show final score
        showFinalScore();
    }
};

// Function to display final results
function showFinalScore() {
    // Replace quiz content with results message
    document.getElementById("treatyQuiz").innerHTML = `
    <h2>Quiz Completed!</h2>
    <div id="finalScore">
        You scored ${score} out of ${questions.length}.<br>
        ${score === questions.length ? "🏆 Excellent! You know Treaty 6 well!" : "🥀 Were you even paying attention?! LOCK IN!!!"}
    </div>
    <button onclick="location.reload()">Try Again</button>
    `;
}