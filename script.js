// KBC Questions Database
const kbcQuestions = [
    {
        amount: 1000,
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    {
        amount: 2000,
        question: "Who wrote the Indian National Anthem?",
        options: ["Bankim Chandra", "Rabindranath Tagore", "Subhash Chandra Bose", "Sarojini Naidu"],
        answer: "Rabindranath Tagore"
    },
    {
        amount: 5000,
        question: "What is the capital of Karnataka?",
        options: ["Chennai", "Hyderabad", "Bengaluru", "Mysuru"],
        answer: "Bengaluru"
    },
    {
        amount: 10000,
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        answer: "Carbon Dioxide"
    },
    {
        amount: 20000,
        question: "Who was the first Prime Minister of India?",
        options: ["Sardar Patel", "Jawaharlal Nehru", "Rajendra Prasad", "Gandhi"],
        answer: "Jawaharlal Nehru"
    },
    {
        amount: 40000,
        question: "Which is the largest ocean in the world?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: "Pacific"
    },
    {
        amount: 80000,
        question: "In which year did India get independence?",
        options: ["1942", "1945", "1947", "1950"],
        answer: "1947"
    },
    {
        amount: 160000,
        question: "Which element has the chemical symbol 'Au'?",
        options: ["Silver", "Oxygen", "Gold", "Argon"],
        answer: "Gold"
    },
    {
        amount: 320000,
        question: "Who is known as the Missile Man of India?",
        options: ["C V Raman", "APJ Abdul Kalam", "Homi Bhabha", "Vikram Sarabhai"],
        answer: "APJ Abdul Kalam"
    },
    {
        amount: 640000,
        question: "Which Indian state has the longest coastline?",
        options: ["Kerala", "Tamil Nadu", "Gujarat", "Maharashtra"],
        answer: "Gujarat"
    },
    {
        amount: 1250000,
        question: "What does CPU stand for?",
        options: ["Central Processing Unit", "Computer Power Unit", "Control Processing Unit", "Core Program Unit"],
        answer: "Central Processing Unit"
    },
    {
        amount: 2500000,
        question: "Who discovered gravity?",
        options: ["Einstein", "Newton", "Galileo", "Tesla"],
        answer: "Newton"
    },
    {
        amount: 5000000,
        question: "Which Indian river is the longest?",
        options: ["Yamuna", "Godavari", "Ganga", "Brahmaputra"],
        answer: "Ganga"
    },
    {
        amount: 10000000,
        question: "Which Mughal emperor built the Taj Mahal?",
        options: ["Akbar", "Babur", "Shah Jahan", "Aurangzeb"],
        answer: "Shah Jahan"
    },
    {
        amount: 70000000,
        question: "Which country was formerly known as Persia?",
        options: ["Iraq", "Iran", "Turkey", "Afghanistan"],
        answer: "Iran"
    }
];

// Game State
let gameState = {
    currentQuestion: 0,
    earnedAmount: 0,
    lifelinesUsed: {
        fiftyFifty: false,
        phone: false,
        audience: false
    },
    answered: false,
    hiddenOptions: []
};

// DOM Elements
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const quitBtn = document.getElementById('quitBtn');
const restartBtn = document.getElementById('restartBtn');
const fiftyFiftyBtn = document.getElementById('fiftyFiftyBtn');
const phoneBtn = document.getElementById('phoneBtn');
const audienceBtn = document.getElementById('audienceBtn');
const optionBtns = document.querySelectorAll('.option-btn');

// Screen Elements
const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');
const gameOverScreen = document.getElementById('gameOverScreen');

// ===== INITIALIZE EVENT LISTENERS =====
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', nextQuestion);
quitBtn.addEventListener('click', quitGame);
restartBtn.addEventListener('click', restartGame);
fiftyFiftyBtn.addEventListener('click', useFiftyFifty);
phoneBtn.addEventListener('click', usePhone);
audienceBtn.addEventListener('click', useAudience);

optionBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        console.log('✅ Option clicked:', index);
        selectOption(index);
    });
});

// ===== START GAME FUNCTION =====
function startGame() {
    console.log('🎮 Game Started');
    gameState.currentQuestion = 0;
    gameState.earnedAmount = 0;
    gameState.lifelinesUsed = { fiftyFifty: false, phone: false, audience: false };
    gameState.answered = false;
    gameState.hiddenOptions = [];
    
    hideAllScreens();
    showScreen(quizScreen);
    loadQuestion();
    enableLifelines();
}

// ===== LOAD CURRENT QUESTION =====
function loadQuestion() {
    const question = kbcQuestions[gameState.currentQuestion];
    
    console.log('📝 Loading Question:', gameState.currentQuestion + 1, question.question);
    
    // Update question number and amount
    document.getElementById('questionNum').textContent = `Question ${gameState.currentQuestion + 1} of 15`;
    document.getElementById('currentAmount').textContent = `Current: Rs. ${formatAmount(question.amount)}`;
    
    // Update question text
    document.getElementById('questionText').textContent = question.question;
    
    // Shuffle and load options
    const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
    optionBtns.forEach((btn, index) => {
        const optionText = shuffledOptions[index].trim();
        btn.querySelector('.option-text').textContent = optionText;
        btn.dataset.answer = optionText; // ✅ Set cleaned option
        btn.classList.remove('correct', 'wrong', 'selected', 'hidden');
        btn.style.display = 'flex';
        btn.disabled = false;
    });
    
    // Reset state
    gameState.answered = false;
    gameState.hiddenOptions = [];
    resetLifelines();
    updateLevelPanel();
}

// ===== SELECT OPTION (FIXED) =====
function selectOption(index) {
    if (gameState.answered) {
        console.log('⚠️ Already answered');
        return;
    }
    
    const selectedOption = optionBtns[index].dataset.answer.trim();
    const correctAnswer = kbcQuestions[gameState.currentQuestion].answer.trim();
    
    console.log('🎯 Selected:', selectedOption, 'Correct:', correctAnswer);
    
    gameState.answered = true;
    
    // Mark all options
    optionBtns.forEach((btn) => {
        btn.disabled = true;
        const btnAnswer = btn.dataset.answer.trim();
        if (btnAnswer === correctAnswer) {
            btn.classList.add('correct');
        }
    });
    
    // Check answer
    const isCorrect = selectedOption === correctAnswer;
    optionBtns[index].classList.add(isCorrect ? 'correct' : 'wrong');
    
    console.log(isCorrect ? '✅ CORRECT!' : '❌ WRONG!');
    
    // Show result
    setTimeout(() => {
        showResult(isCorrect);
    }, 1000);
}

// ===== SHOW RESULT (FIXED) =====
function showResult(isCorrect) {
    const question = kbcQuestions[gameState.currentQuestion];
    
    // 🔥 FIX #1: UPDATE EARNED AMOUNT WHEN ANSWER IS CORRECT
    if (isCorrect) {
        gameState.earnedAmount = question.amount;
        console.log('💰 Earned Amount Updated:', gameState.earnedAmount);
    }
    
    const resultAmount = isCorrect
        ? gameState.earnedAmount
        : calculateFallenAmount();
    
    // Update result screen
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    const resultAmountEl = document.getElementById('resultAmount');
    
    if (isCorrect) {
        resultIcon.textContent = '✅';
        resultTitle.textContent = 'Correct Answer!';
        resultMessage.textContent = 'Great job! Your answer is correct.';
        resultAmountEl.textContent = `Rs. ${formatAmount(gameState.earnedAmount)}`;
        nextBtn.style.display = 'inline-block';
    } else {
        resultIcon.textContent = '❌';
        resultTitle.textContent = 'Wrong Answer!';
        resultMessage.textContent = 'Oops! That was incorrect. Game Over!';
        resultAmountEl.textContent = `Rs. ${formatAmount(resultAmount)}`;
        nextBtn.style.display = 'none';
    }
    
    hideAllScreens();
    showScreen(resultScreen);
    
    // Auto move to game over after delay
    if (!isCorrect) {
        setTimeout(endGame, 2000);
    } else if (gameState.currentQuestion >= kbcQuestions.length - 1) {
        // Game won - reached last question
        setTimeout(endGame, 2000);
    }
}

// ===== NEXT QUESTION (FIXED) =====
function nextQuestion() {
    console.log('➡️ Next Question');
    if (gameState.currentQuestion < kbcQuestions.length - 1) {
        gameState.currentQuestion++;
        hideAllScreens();
        showScreen(quizScreen);
        loadQuestion();
    } else {
        endGame();
    }
}

// ===== CALCULATE FALLEN AMOUNT (Safe Level Logic) =====
function calculateFallenAmount() {
    const safeLevels = [10000, 320000, 10000000];
    
    // Find the nearest LOWER safe level
    for (let i = safeLevels.length - 1; i >= 0; i--) {
        if (gameState.earnedAmount >= safeLevels[i]) {
            return safeLevels[i];
        }
    }
    
    return 0; // No safe level reached yet
}

// ===== END GAME (FIXED) =====
function endGame() {
    console.log('🏁 Game Ended. Final Amount:', gameState.earnedAmount);
    
    const safeLevels = [10000, 320000, 10000000];
    let guaranteedAmount = 0;
    
    // Find the highest safe level that was PASSED
    for (let level of safeLevels) {
        if (gameState.earnedAmount >= level) {
            guaranteedAmount = level;
        }
    }
    
    // Update game over screen
    document.getElementById('finalAmount').textContent = `Rs. ${formatAmount(gameState.earnedAmount)}`;
    
    // Only show safe level info if earned amount is HIGHER than guaranteed amount
    if (guaranteedAmount > 0 && gameState.earnedAmount > guaranteedAmount) {
        document.getElementById('safeLevelInfo').style.display = 'block';
        document.getElementById('safeLevelAmount').textContent = `Rs. ${formatAmount(guaranteedAmount)}`;
    } else {
        document.getElementById('safeLevelInfo').style.display = 'none';
    }
    
    hideAllScreens();
    showScreen(gameOverScreen);
}

// // ===== QUIT GAME (FIXED) =====
// function quitGame() {
//     if (confirm('Are you sure you want to quit? You will be given your guaranteed amount.')) {
//         const safeLevels = [10000, 320000, 10000000];
//         let guaranteedAmount = 0;
        
//         for (let level of safeLevels) {
//             if (gameState.earnedAmount >= level) {
//                 guaranteedAmount = level;
//             }
//         }
        
//         // Update earned amount to safe level
//         gameState.earnedAmount = guaranteedAmount;
        
//         endGame();
//     }
// }

// 🔥 FIX: QUIT GAME - SIMPLE VERSION
function quitGame() {
    if (confirm('Are you sure you want to quit?')) {
        console.log('🚪 Player quit at question:', gameState.currentQuestion + 1);
        console.log('💰 Final amount:', gameState.earnedAmount);
        
        // gameState.earnedAmount is already the correct amount they earned
        endGame();
    }
}


// ===== RESTART GAME =====
function restartGame() {
    console.log('🔄 Game Restarted');
    resetLifelinesUI();
    startGame();
}

// ===== ENHANCED LIFELINES =====

// 1. FIFTY-FIFTY LIFELINE
function useFiftyFifty() {
    if (gameState.lifelinesUsed.fiftyFifty || gameState.answered) return;
    
    console.log('🎯 Using 50-50');
    gameState.lifelinesUsed.fiftyFifty = true;
    fiftyFiftyBtn.disabled = true;
    fiftyFiftyBtn.style.opacity = '0.5';
    fiftyFiftyBtn.innerHTML = '<span class="lifeline-icon">✓</span><span class="lifeline-name">Used</span>';
    
    const question = kbcQuestions[gameState.currentQuestion];
    const correctAnswer = question.answer.trim();
    
    const wrongOptions = [];
    optionBtns.forEach((btn, index) => {
        const btnAnswer = btn.dataset.answer.trim();
        if (btnAnswer !== correctAnswer) {
            wrongOptions.push(index);
        }
    });
    
    const toHide = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 2);
    
    toHide.forEach((index) => {
        optionBtns[index].classList.add('hidden');
        optionBtns[index].style.display = 'none';
        gameState.hiddenOptions.push(index);
    });
    
    showEnhancedNotification(
        '50-50 Lifeline Used! ✅',
        'Two incorrect options have been removed. You now have 2 options left!',
        'success'
    );
}

// 2. PHONE A FRIEND LIFELINE
function usePhone() {
    if (gameState.lifelinesUsed.phone || gameState.answered) return;
    
    console.log('📞 Using Phone A Friend');
    gameState.lifelinesUsed.phone = true;
    phoneBtn.disabled = true;
    phoneBtn.style.opacity = '0.5';
    phoneBtn.innerHTML = '<span class="lifeline-icon">✓</span><span class="lifeline-name">Used</span>';
    
    const question = kbcQuestions[gameState.currentQuestion];
    const correctAnswer = question.answer.trim();
    const pollResults = generatePhonePollResults(correctAnswer);
    
    showPhoneResult(pollResults, question);
}

// 3. AUDIENCE POLL LIFELINE
function useAudience() {
    if (gameState.lifelinesUsed.audience || gameState.answered) return;
    
    console.log('👥 Using Audience Poll');
    gameState.lifelinesUsed.audience = true;
    audienceBtn.disabled = true;
    audienceBtn.style.opacity = '0.5';
    audienceBtn.innerHTML = '<span class="lifeline-icon">✓</span><span class="lifeline-name">Used</span>';
    
    const question = kbcQuestions[gameState.currentQuestion];
    const correctAnswer = question.answer.trim();
    const pollResults = generateAudiencePollResults(correctAnswer);
    
    showAudienceResult(pollResults, question);
}

// Generate Phone Friend Poll Results
function generatePhonePollResults(correctAnswer) {
    const results = [];
    
    optionBtns.forEach((btn, index) => {
        const btnAnswer = btn.dataset.answer.trim();
        const isCorrect = btnAnswer === correctAnswer;
        let percentage;
        
        if (isCorrect) {
            percentage = Math.floor(Math.random() * 45 + 50); // 50-95%
        } else {
            percentage = Math.floor(Math.random() * 30); // 0-30%
        }
        
        results.push({
            index: index,
            option: btn.querySelector('.option-text').textContent,
            percentage: percentage,
            isCorrect: isCorrect,
            label: String.fromCharCode(65 + index)
        });
    });
    
    // Normalize to 100%
    const total = results.reduce((sum, r) => sum + r.percentage, 0);
    results.forEach(r => {
        r.percentage = Math.round((r.percentage / total) * 100);
    });
    
    return results;
}

// Generate Audience Poll Results
function generateAudiencePollResults(correctAnswer) {
    const results = [];
    
    optionBtns.forEach((btn, index) => {
        const btnAnswer = btn.dataset.answer.trim();
        const isCorrect = btnAnswer === correctAnswer;
        let percentage;
        
        if (isCorrect) {
            percentage = Math.floor(Math.random() * 45 + 45); // 45-90%
        } else {
            percentage = Math.floor(Math.random() * 25); // 0-25%
        }
        
        results.push({
            index: index,
            option: btn.querySelector('.option-text').textContent,
            percentage: percentage,
            isCorrect: isCorrect,
            label: String.fromCharCode(65 + index)
        });
    });
    
    // Normalize to 100%
    const total = results.reduce((sum, r) => sum + r.percentage, 0);
    results.forEach(r => {
        r.percentage = Math.round((r.percentage / total) * 100);
    });
    
    return results;
}

// Show Phone Result in Modal
function showPhoneResult(results, question) {
    const modal = document.createElement('div');
    modal.className = 'lifeline-modal';
    modal.innerHTML = `
        <div class="lifeline-modal-content phone-modal">
            <div class="modal-header">
                <span class="modal-icon">📞</span>
                <h3>Phone A Friend</h3>
                <button class="modal-close" onclick="this.closest('.lifeline-modal').remove()">✕</button>
            </div>
            <div class="modal-body">
                <p class="expert-info">Your friend thinks:</p>
                <div class="poll-container">
                    ${results.map(result => `
                        <div class="poll-item ${result.isCorrect ? 'correct-hint' : ''}">
                            <div class="poll-option">
                                <span class="poll-label">${result.label}.</span>
                                <span class="poll-text">${result.option}</span>
                            </div>
                            <div class="poll-bar-container">
                                <div class="poll-bar" style="width: ${result.percentage}%; background: ${result.isCorrect ? '#43e97b' : '#ff6b6b'};">
                                    <span class="poll-percentage">${result.percentage}%</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <p class="modal-note">💡 Your friend is fairly confident about the answer they highlighted.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="this.closest('.lifeline-modal').remove()">Thanks!</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Show Audience Result in Modal
function showAudienceResult(results, question) {
    const modal = document.createElement('div');
    modal.className = 'lifeline-modal';
    modal.innerHTML = `
        <div class="lifeline-modal-content audience-modal">
            <div class="modal-header">
                <span class="modal-icon">👥</span>
                <h3>Audience Poll</h3>
                <button class="modal-close" onclick="this.closest('.lifeline-modal').remove()">✕</button>
            </div>
            <div class="modal-body">
                <p class="audience-info">Here's what the audience voted:</p>
                <div class="poll-container">
                    ${results.map(result => `
                        <div class="poll-item ${result.isCorrect ? 'correct-hint' : ''}">
                            <div class="poll-option">
                                <span class="poll-label">${result.label}.</span>
                                <span class="poll-text">${result.option}</span>
                            </div>
                            <div class="poll-bar-container">
                                <div class="poll-bar audience-bar" style="width: ${result.percentage}%; background: ${result.isCorrect ? '#38f9d7' : '#667eea'};">
                                    <span class="poll-percentage">${result.percentage}%</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <p class="modal-note">📊 The audience consensus is shown above.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="this.closest('.lifeline-modal').remove()">Got it!</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Enhanced Notification Function
function showEnhancedNotification(title, message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `enhanced-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <div class="notification-text">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ===== RESET LIFELINES (SINGLE VERSION - NO DUPLICATES) =====
function resetLifelines() {
    fiftyFiftyBtn.disabled = gameState.lifelinesUsed.fiftyFifty;
    phoneBtn.disabled = gameState.lifelinesUsed.phone;
    audienceBtn.disabled = gameState.lifelinesUsed.audience;
    
    fiftyFiftyBtn.style.opacity = gameState.lifelinesUsed.fiftyFifty ? '0.5' : '1';
    phoneBtn.style.opacity = gameState.lifelinesUsed.phone ? '0.5' : '1';
    audienceBtn.style.opacity = gameState.lifelinesUsed.audience ? '0.5' : '1';
}

// Enable Lifelines
function enableLifelines() {
    fiftyFiftyBtn.disabled = false;
    phoneBtn.disabled = false;
    audienceBtn.disabled = false;
    
    fiftyFiftyBtn.style.opacity = '1';
    phoneBtn.style.opacity = '1';
    audienceBtn.style.opacity = '1';
}

// Reset Lifelines UI on Restart
function resetLifelinesUI() {
    gameState.lifelinesUsed.fiftyFifty = false;
    gameState.lifelinesUsed.phone = false;
    gameState.lifelinesUsed.audience = false;

    fiftyFiftyBtn.disabled = false;
    phoneBtn.disabled = false;
    audienceBtn.disabled = false;

    fiftyFiftyBtn.style.opacity = "1";
    phoneBtn.style.opacity = "1";
    audienceBtn.style.opacity = "1";

    fiftyFiftyBtn.innerHTML = `<span class="lifeline-icon">5️⃣0️⃣</span><span class="lifeline-name">50-50</span>`;
    phoneBtn.innerHTML = `<span class="lifeline-icon">📞</span><span class="lifeline-name">Phone</span>`;
    audienceBtn.innerHTML = `<span class="lifeline-icon">👥</span><span class="lifeline-name">Audience</span>`;
}

// Update Level Panel Highlighting
function updateLevelPanel() {
    document.querySelectorAll('.level-item').forEach((item, index) => {
        item.classList.remove('current-level');
        if (index === gameState.currentQuestion) {
            item.classList.add('current-level');
        }
    });
}

// ===== UTILITY FUNCTIONS =====
function formatAmount(amount) {
    return amount.toLocaleString('en-IN');
}

function showScreen(screen) {
    screen.classList.add('active');
}

function hideAllScreens() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
}

// ===== INITIALIZE GAME =====
console.log('🎮 KBC Game Ready!');
