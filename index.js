let hasBlackJack = false
let isAlive = true
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let randomNumber = Math.floor(Math.random() * 11) + 1
let startBtn= document.getElementById("start-btn")
let hitBtn= document.getElementById("hit-btn")
let standBtn= document.getElementById("stand-btn")
hitBtn.style.display = "none";
standBtn.style.display = "none";
function startGame() {
    startBtn.style.display = "none";
    hitBtn.style.display = "block";
standBtn.style.display = "block";
    cardsEl.textContent = "Cards: " + firstCard + " " + secondCard
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}

// 2. Create a function newCard() that logs out "Drawing a new card from the deck!"
