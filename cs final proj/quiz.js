document.addEventListener("DOMContentLoaded", function () {
    const quizSet = [
        { prompt: "What percentage of Earth's water is freshwater?", choices: ["3%", "25%", "50%", "75%"], answerIndex: 0 },
        { prompt: "Which activity wastes the most household water?", choices: ["Leaving the tap running", "Taking a shower", "Washing dishes", "Watering plants"], answerIndex: 0 },
        { prompt: "What is a common cause of water pollution?", choices: ["Plastic waste", "Wind", "Solar power", "Trees"], answerIndex: 0 },
        { prompt: "How can we conserve water at home?", choices: ["Fixing leaks", "Using more soap", "Running water all day", "None of the above"], answerIndex: 0 },
        { prompt: "What is the best way to clean dirty water?", choices: ["Boiling", "Freezing", "Shaking", "Adding salt"], answerIndex: 0 }
    ];

    let currentIndex = 0;
    let totalScore = 0;
    let countdown;
    let timeRemaining = 60;

    function initiateCountdown() {
        countdown = setInterval(() => {
            timeRemaining--;
            document.getElementById('time').innerText = timeRemaining;
            if (timeRemaining <= 0) {
                clearInterval(countdown);
                revealScore();
            }
        }, 1000);
    }

    function loadQuestion() {
        const promptElement = document.getElementById('query');
        const choicesContainer = document.getElementById('choices');
        promptElement.innerText = quizSet[currentIndex].prompt;
        choicesContainer.innerHTML = '';

        quizSet[currentIndex].choices.forEach((choice, idx) => {
            const choiceButton = document.createElement('button');
            choiceButton.innerText = choice;
            choiceButton.className = 'btn';
            choiceButton.onclick = () => verifyAnswer(idx);
            choicesContainer.appendChild(choiceButton);
        });

        document.getElementById('forwardBtn').disabled = true;
        document.getElementById('backBtn').disabled = currentIndex === 0;
        document.getElementById('finishBtn').style.display = currentIndex === quizSet.length - 1 ? 'inline-block' : 'none';
    }

    function verifyAnswer(selectedIndex) {
        const correctIndex = quizSet[currentIndex].answerIndex;
        if (selectedIndex === correctIndex) {
            totalScore++;
        }

        document.querySelectorAll('#choices .btn').forEach((button, idx) => {
            button.disabled = true;
            button.style.backgroundColor = idx === correctIndex ? "#28a745" : "#dc3545";
        });

        document.getElementById('forwardBtn').disabled = false;
    }

    document.getElementById('forwardBtn').onclick = function () {
        if (currentIndex < quizSet.length - 1) {
            currentIndex++;
            loadQuestion();
        } else {
            revealScore();
        }
    };

    document.getElementById('backBtn').onclick = function () {
        if (currentIndex > 0) {
            currentIndex--;
            loadQuestion();
        }
    };

    document.getElementById('finishBtn').onclick = revealScore;

    function revealScore() {
        clearInterval(countdown);
        document.getElementById('quiz-content').style.display = 'none';
        const scoreBox = document.getElementById('finalScore');
        scoreBox.innerText = `Your score is ${totalScore} out of ${quizSet.length}.`;
        scoreBox.style.display = 'block';
    }

    initiateCountdown();
    loadQuestion();
});
