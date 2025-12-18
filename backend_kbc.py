import random

print("Welcome to my sexy KBC")

kbc_questions = [
    {
        "amount": 1000,
        "question": "Which planet is known as the Red Planet?",
        "options": ["Earth", "Mars", "Jupiter", "Venus"],
        "answer": "Mars"
    },
    {
        "amount": 2000,
        "question": "Who wrote the Indian National Anthem?",
        "options": ["Bankim Chandra", "Rabindranath Tagore", "Subhash Chandra Bose", "Sarojini Naidu"],
        "answer": "Rabindranath Tagore"
    },
    {
        "amount": 5000,
        "question": "What is the capital of Karnataka?",
        "options": ["Chennai", "Hyderabad", "Bengaluru", "Mysuru"],
        "answer": "Bengaluru"
    },
    {
        "amount": 10000,
        "question": "Which gas do plants absorb from the atmosphere?",
        "options": ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        "answer": "Carbon Dioxide"
    },
    {
        "amount": 20000,
        "question": "Who was the first Prime Minister of India?",
        "options": ["Sardar Patel", "Jawaharlal Nehru", "Rajendra Prasad", "Gandhi"],
        "answer": "Jawaharlal Nehru"
    },
    {
        "amount": 40000,
        "question": "Which is the largest ocean in the world?",
        "options": ["Atlantic", "Indian", "Arctic", "Pacific"],
        "answer": "Pacific"
    },
    {
        "amount": 80000,
        "question": "In which year did India get independence?",
        "options": ["1942", "1945", "1947", "1950"],
        "answer": "1947"
    },
    {
        "amount": 160000,
        "question": "Which element has the chemical symbol 'Au'?",
        "options": ["Silver", "Oxygen", "Gold", "Argon"],
        "answer": "Gold"
    },
    {
        "amount": 320000,
        "question": "Who is known as the Missile Man of India?",
        "options": ["C V Raman", "APJ Abdul Kalam", "Homi Bhabha", "Vikram Sarabhai"],
        "answer": "APJ Abdul Kalam"
    },
    {
        "amount": 640000,
        "question": "Which Indian state has the longest coastline?",
        "options": ["Kerala", "Tamil Nadu", "Gujarat", "Maharashtra"],
        "answer": "Gujarat"
    },
    {
        "amount": 1250000,
        "question": "What does CPU stand for?",
        "options": ["Central Processing Unit", "Computer Power Unit", "Control Processing Unit", "Core Program Unit"],
        "answer": "Central Processing Unit"
    },
    {
        "amount": 2500000,
        "question": "Who discovered gravity?",
        "options": ["Einstein", "Newton", "Galileo", "Tesla"],
        "answer": "Newton"
    },
    {
        "amount": 5000000,
        "question": "Which Indian river is the longest?",
        "options": ["Yamuna", "Godavari", "Ganga", "Brahmaputra"],
        "answer": "Ganga"
    },
    {
        "amount": 10000000,
        "question": "Which Mughal emperor built the Taj Mahal?",
        "options": ["Akbar", "Babur", "Shah Jahan", "Aurangzeb"],
        "answer": "Shah Jahan"
    },
    {
        "amount": 70000000,
        "question": "Which country was formerly known as Persia?",
        "options": ["Iraq", "Iran", "Turkey", "Afghanistan"],
        "answer": "Iran"
    }
]

levels = [1000, 2000, 5000, 10000, 20000, 40000, 80000, 160000, 320000, 640000, 1250000, 2500000, 5000000, 10000000, 70000000]
earned_amount = 0

for i, q in enumerate(kbc_questions):
    print(f"\nQuestion for Rs.{q['amount']}: {q['question']}")
    options = q['options']
    random.shuffle(options)
    for idx, option in enumerate(options, 1):
        print(f"{idx}. {option}")
    
    try:
        answer_index = int(input("Enter the option number (1-4) or 0 to quit: ")) - 1
        if options[answer_index] == q['answer']:
            earned_amount = q['amount']
            print(f"✅ Correct! You have earned Rs.{earned_amount:,}\n")
        elif answer_index == -1:
            print("You have chosen to quit the game.")
            break
        else:
            print(f"❌ Wrong answer! The correct answer was: {q['answer']}")
            break
    except (ValueError, IndexError):
        print("Invalid input! Please enter a number between 1 and 4.")
        break

# Safe levels logic
safe_levels = [10000, 320000, 10000000]
for level in reversed(safe_levels):
    if earned_amount >= level:
        earned_amount = level
        print(f"🎉 Congratulations! You have reached a safe level with Rs.{earned_amount:,} guaranteed.\n")
        break

print(f"\n🏆 You have won a total of Rs.{earned_amount:,}. Thank you for playing KBC!")


from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run()
