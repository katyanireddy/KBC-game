# 🎬 Kaun Banega Crorepati (KBC) – Web Quiz Game

A fully interactive **KBC-style quiz game** built with HTML, CSS, and JavaScript.  
Play through 15 questions, use lifelines, track your prize money, and experience a mini version of *Kaun Banega Crorepati* in the browser.

---

## 🌐 Live Demo

The game is deployed on Netlify.

🔗 **Play here:** 
https://6949539825514384ad578bf5--play-kbc-game.netlify.app


## ✨ Features

- **15-question KBC ladder**
  - Increasing prize amounts from ₹1,000 up to ₹7 Crore.
- **Safe levels**
  - Defined checkpoints so that on a wrong answer you fall back to a guaranteed amount.
- **Quit logic**
  - If the player quits, they receive the **last earned amount** (previous correct question).
- **Lifelines**
  - `50-50`: Removes two incorrect options.  
  - `Phone a Friend`: Simulated suggestion with probabilities.  
  - `Audience Poll`: Visual poll bars showing what the “audience” thinks.
- **Modern UI**
  - Separate **Home page** with rules and “How to Play”.
  - Game page with:
    - Question area
    - 4 options (A, B, C, D)
    - Prize ladder on the left
    - Lifelines on the right
    - Result and Game Over screens.
- **Responsive design**
  - Works on desktop and adapts to smaller screens.

---

## 🗂 Project Structure


> In the current version, styles can be either embedded inside `index.html` or split into a separate `style.css` file, as you prefer.

---

## 🚀 Getting Started

### 1. Clone the repository


### 2. Run locally

No build step is required. Just open `index.html` in a browser.

- Option 1: Double-click `index.html`.
- Option 2 (recommended): Use a simple local server (e.g., VS Code Live Server, `python -m http.server`, etc.).


---

## 🎮 How to Play

1. **Home Page**
   - Read the game rules and “How to Play”.
   - Click **“Start Game Now”** to go to the game screen.
2. **Answering Questions**
   - Each question has four options (A–D).
   - Click an option to lock your answer.
   - Correct answers:
     - Highlight in green.
     - Update your **earned amount**.
     - Show a result screen with your current winnings.
   - Wrong answers:
     - Correct answer is highlighted.
     - You fall back to the **nearest safe level**.
3. **Quitting**
   - Click **“Quit Game”**.
   - On quitting, you get your **last earned amount** (the amount from the previous correct question).
4. **Lifelines**
   - Click any lifeline button once per game:
     - **50-50**: Hides two wrong options.
     - **Phone**: Shows a friend’s “opinion” with percentages.
     - **Audience**: Shows a bar chart with audience vote percentages.
5. **Game Over**
   - When you answer wrong or finish all 15 questions:
     - Game Over screen shows:
       - Total winnings
       - Safe level reached (if any)
       - Buttons to **Play Again** or **Back to Home**.

---

## 🧠 Core Logic Highlights

- **Game state** is tracked in a single `gameState` object:
  - `currentQuestion`
  - `earnedAmount`
  - `lifelinesUsed`
  - `answered`
  - `hiddenOptions`
- **Safe levels** are defined as:
  - `10000`, `320000`, `10000000`
- **Quit behavior**:
  - Does **not** fall back to a safe level.
  - Uses the **current `earnedAmount`** which always reflects the last correct question.

---

## 🔧 Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **No frameworks** required.
- Works in **modern browsers** (Chrome, Edge, Firefox, etc.).

---

## 📦 Future Improvements

Some ideas you can add later:

- Timer for each question.
- Sound effects for correct/wrong answers.
- Question bank loaded from a JSON or API.
- Difficulty levels (Easy / Medium / Hard).
- Leaderboard using localStorage or a backend.

---

## 🤝 Contributing

Pull requests and suggestions are welcome.  
If you find a bug or have an idea, feel free to open an **Issue** or a **PR**.

---

## 📜 License

This project is open-source. You can use or modify it for learning and personal projects.  
For commercial or public deployments, please add proper credits.

---

## 🙌 Acknowledgements

- Inspired by the TV show **Kaun Banega Crorepati**.
- Built for learning frontend development and JavaScript game logic.
