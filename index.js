let message = ""
let messageEl = document.getElementById("message-el")
let dealerEl = document.getElementById("dealer-el")
let playerEl = document.getElementById("player-el")
let startBtn= document.getElementById("start-btn")
let hitBtn= document.getElementById("hit-btn")
let standBtn= document.getElementById("stand-btn")
let restartBtn= document.getElementById("restart-btn")
const serving = new Audio("serve.mp3");
const waiting = new Audio("waiting.mp3");

restartBtn.style.display = "none";
hitBtn.style.display = "none";
standBtn.style.display = "none";
let dealerCards=[]
let playerCards=[]


for (let i = 0; i < 4; i++){
    dealerCards.push(Math.floor(Math.random() * 11) + 1)
    playerCards.push(Math.floor(Math.random() * 11) + 1)
    }
let blackjackD=(dealerCards[0]+dealerCards[1]===21)
let blackjackP=(playerCards[0]+playerCards[1]===21)

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
async function reset(arg){
    hitBtn.style.display = "none";
    standBtn.style.display = "none";
    startBtn.style.display = "none";
    playerEl.textContent=''
    dealerEl.textContent=''
    messageEl.textContent=arg
    await delay(3000)
    restartBtn.style.display = "block";
}

async function initial_dealing() {
    startBtn.style.display = "none";
    loading("dealing the facedown card")
    await delay(1800)
    dealerEl.textContent="Dealer's hand: "+"x" 
    await delay(2000)
    loading("dealing to the player's first card")
    await delay(1800)
    playerEl.textContent="Player's hand: "+playerCards[0]
    await delay(2000)
    loading("dealing the faceup dealer card and revealing facedown card")
    await delay(1800)
    dealerEl.textContent="Dealer's hand: "+"x"+"-"+dealerCards[1]
    await delay(1000)
    let initialD="Dealer's hand: "+dealerCards[0]+"-"+dealerCards[1]
    dealerEl.textContent=initialD
    await delay(2000)
    loading("dealing the player's second card")
    await delay(1800)
    let initialP="player's hand: "+playerCards[0]+"-"+playerCards[1]
    playerEl.textContent=initialP
    hitBtn.style.display = "block";
    standBtn.style.display = "block";
    waiting.play();
    await delay(1200)
    messageEl.textContent="Hit or Stand"
    if (blackjackP===true){

        reset("WOW you win via blackjack")
    }
    else if (blackjackD===true){
        
        reset("the dealer CRUSHED you with a blackjack")
    }   
    let currentP=2
    let currentD=2
}

async function hit(currentP) {
console.log(currentP)
playerEl.textContent=playerEl.textContent+playerCards[currentP]
for (let i = 0; i < currentP+1; i++){
        let sum=0
        sum=sum+playerCards[i]}
if (sum===21){
    messageEl.textContent="hey check your cards"

    await delay(3000)
    reset("you have won by having a perfect 21") }
else if (sum>21){
    messageEl.textContent="check your cards"
    await delay(3000)
    reset("you BUSTED . the sum is over 21:(")}
else if (currentP===4){
    messageEl.textContent="check your cards"
    await delay(3000)
    reset("GRATS !!! you win by having 4 cards")}
currentP=currentP+1
return currentP
}




//function stand() {}