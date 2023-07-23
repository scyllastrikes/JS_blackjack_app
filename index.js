let hasBlackJack = false
let isAlive = true
let message = ""
let messageEl = document.getElementById("message-el")
let dealerEl = document.getElementById("dealer-el")
let playerEl = document.getElementById("player-el")
let randomNumber = Math.floor(Math.random() * 11) + 1
let startBtn= document.getElementById("start-btn")
let hitBtn= document.getElementById("hit-btn")
let standBtn= document.getElementById("stand-btn")
var serveSound = document.getElementById("servingAudio");

hitBtn.style.display = "none";
standBtn.style.display = "none";
let dealerCards=[]
let playerCards=[]
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
async function loading(arg){  
    messageEl.textContent=arg
    for (let i = 0; i < 3; i++){
        await delay(300)
        messageEl.textContent=messageEl.textContent+"."
     }
    serveSound.play();
}
function startGame() {
    startBtn.style.display = "none";
    dealerCards.push(Math.floor(Math.random() * 11) + 1)
    playerCards.push(Math.floor(Math.random() * 11) + 1)
    loading("dealing the facedown card")
    dealerEl.textContent="Dealers hand: "+dealerCards[0]
    loading("dealing to the player")
    loading("dealing the faceup dealer card ")

        
    
    playerEl.textContent="Dealers hand: "+playerCards[0]




    
    
    hitBtn.style.display = "block";
    standBtn.style.display = "block";
}

// 2. Create a function newCard() that logs out "Drawing a new card from the deck!"
