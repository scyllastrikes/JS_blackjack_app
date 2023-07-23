let message = ""
let messageEl = document.getElementById("message-el")
let dealerEl = document.getElementById("dealer-el")
let playerEl = document.getElementById("player-el")
let startBtn= document.getElementById("start-btn")
let hitBtn= document.getElementById("hit-btn")
let standBtn= document.getElementById("stand-btn")
const serving = new Audio("serve.mp3");
const waiting = new Audio("waiting.mp3");


hitBtn.style.display = "none";
standBtn.style.display = "none";
let dealerCards=[]
let playerCards=[]


for (let i = 0; i < 4; i++){
    dealerCards.push(Math.floor(Math.random() * 11) + 1)
    playerCards.push(Math.floor(Math.random() * 11) + 1)
    }


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


async function loading(arg){  
    messageEl.textContent=arg
    for (let i = 0; i < 3; i++){
        await delay(300)
        messageEl.textContent=messageEl.textContent+"."
     }
     serving.play();
}


async function initial_dealing() {
    startBtn.style.display = "none";
    loading("dealing the facedown card")
    await delay(1800)
    dealerEl.textContent="Dealer's hand: "+"x" //dealerCards[0]
    await delay(2000)
    loading("dealing to the player's first card")
    await delay(1800)
    playerEl.textContent="Dealer's hand: "+playerCards[0]
    await delay(2000)
    loading("dealing the faceup dealer card and revealing facedown card")
    await delay(1800)
    dealerEl.textContent="Player's hand: "+dealerCards[0]+"-"+dealerCards[1]
    await delay(2000)
    loading("dealing the player's second card")
    await delay(1800)
    playerEl.textContent="player's hand: "+playerCards[0]+"-"+playerCards[1]
    hitBtn.style.display = "block";
    standBtn.style.display = "block";
    waiting.play();
}


function hit(){

}


function stand() {

}