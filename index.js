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
initPcounter()
initWcounter()
let Wrate= document.getElementById("winrate")
Wrate.textContent="Winrate:"+winrate()
Wrate.style.display="block"
restartBtn.style.display = "none";
hitBtn.style.display = "none";
standBtn.style.display = "none";
let dealerCards=[]
let playerCards=[]
let currentP=2
let currentD=2
for (let i = 0; i < 4; i++){
    dealerCards.push(Math.floor(Math.random() * 11) + 1)
    playerCards.push(Math.floor(Math.random() * 11) + 1)
    }
let blackjackD=(dealerCards[0]+dealerCards[1]===21)
let blackjackP=(playerCards[0]+playerCards[1]===21)

function restart(){
    location.reload()
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
    Wrate.style.display="none"
    startBtn.style.display = "none";
    loading("Dealing the facedown card")
    await delay(1800)
    dealerEl.textContent="Dealer's hand: "+"x" 
    await delay(2000)
    loading("Dealing to the player's first card")
    await delay(1800)
    playerEl.textContent="Your hand: "+playerCards[0]
    await delay(2000)
    loading("Dealing the faceup dealer card and revealing facedown card")
    await delay(1800)
    dealerEl.textContent="Dealer's hand: "+"x"+"-"+dealerCards[1]
    await delay(1000)
    let initialD="Dealer's hand: "+dealerCards[0]+"-"+dealerCards[1]
    dealerEl.textContent=initialD
    await delay(2000)
    loading("Dealing the player's second card")
    await delay(1800)
    let initialP="Your hand: "+playerCards[0]+"-"+playerCards[1]
    playerEl.textContent=initialP
    hitBtn.style.display = "block";
    standBtn.style.display = "block";
    waiting.play();
    await delay(1200)
    messageEl.textContent="Hit or Stand"
    if (blackjackP===true){
        win()
        reset("WOW you win via blackjack"+" "+playerEl.textContent)
    }
    else if (blackjackD===true){
        loose()
        reset("The dealer CRUSHED you with a blackjack"+" "+dealerEl.textContent)
    }   
}


async function hit() {
    messageEl.textContent="You chose hit"
    await delay(1800)
    serving.play();
    console.log(currentP)
 playerEl.textContent=playerEl.textContent+"-"+playerCards[currentP]
 let sum=0
 for (let i = 0; i < currentP+1; i++){
    sum=sum+playerCards[i]
    console.log(sum)
}
 if (sum===21){
    messageEl.textContent="Hey check your cards"
    await delay(1000)
    win()
    return reset("You have won by having a perfect 21"+" "+playerEl.textContent) }

else if (sum>21){
    messageEl.textContent="Check your cards"
    await delay(1000)
    loose()
    return reset("You BUSTED . the sum is over 21:("+" "+playerEl.textContent)}

else if (currentP===3 && sum<21) {
    await delay(200)
    win()
    return reset("GRATS !!! you win by having 4 cards"+" "+playerEl.textContent)}
    
currentP=currentP+1
return currentP
}




async function stand() {
    messageEl.textContent = "You chose to stand"
    await delay(3000)
    messageEl.textContent = "It's time for the dealer to play"
    console.log(currentD)
  
    let Psum = 0
    for (let i = 0; i < currentP; i++) {
      Psum += playerCards[i]
      console.log(Psum)
    }
  
    let Dsum = 0
    for (let i = 0; i < currentD; i++) {
      Dsum += dealerCards[i]
      console.log(Dsum)
    }
  
    if (Dsum >= 17) {
      messageEl.textContent = "Dealer chose to stand";
      if (Dsum > Psum) {
        await delay(2000)
        loose()
        return reset(`The dealer pulled more than you. You lost.
                    ${dealerEl.textContent}
                    ${ playerEl.textContent}`)
      } else if (Dsum < Psum) {
        await delay(2000)*
        win()
        return reset(`Congratulations! You beat the dealer. 
                     ${dealerEl.textContent}
                     ${playerEl.textContent}`)
      } else {
        await delay(2000)
        win()
        return reset(`Push. (Push is a tie)${dealerEl.textContent}  ${playerEl.textContent}`)
      }
    } else {
      while (Dsum < 17 && currentD <= 3) {
        messageEl.textContent = "Dealer chose to hit"
        serving.play()
        await delay(1800)
        Dsum += dealerCards[currentD]
        console.log(Dsum)
        dealerEl.textContent = dealerEl.textContent + "-" + dealerCards[currentD]
        currentD++
      }
      if (Dsum > 21) {
        await delay(1000);
        win()
        return reset("The dealer BUSTED... You win!\n" + dealerEl.textContent);
      } else if (currentD === 4) {
        await delay(1000);
        loose()
        return reset("The dealer played 4 times... You lose.\n" + dealerEl.textContent);
      } else {
        if (Dsum > Psum) {
          await delay(2000);
          loose()
          return reset("The dealer pulled more than you. You lost.\n" + dealerEl.textContent + "\n" + playerEl.textContent);
        } else if (Dsum < Psum) {
          await delay(2000);
          win()
          return reset("Congratulations! You beat the dealer.\n" + dealerEl.textContent + "\n" + playerEl.textContent);
        } else {
          await delay(2000);
          win()
          return reset("Push. (Push is a tie)\n" + dealerEl.textContent + "\n" + playerEl.textContent);
        }
      }
    }
  }
function initWcounter(){
  let retrievedDataW = localStorage.getItem("Wins")
  if (retrievedDataW == null ) {
    retrievedDataW=0
    localStorage.setItem("Wins", retrievedDataW)
}}
function initPcounter(){
  let retrievedDataP = localStorage.getItem("Plays")
  if (retrievedDataP == null){
    retrievedDataP=0
    localStorage.setItem("Plays", retrievedDataP)
  }}
function win(){
  let retrievedDataW = localStorage.getItem("Wins");
  let retrievedDataP = localStorage.getItem("Plays");
  retrievedDataP++
  retrievedDataW++
  localStorage.setItem("Plays",retrievedDataP)
  localStorage.setItem("Wins",retrievedDataW)
}
function loose(){
  let retrievedDataP=localStorage.getItem("Plays")
  retrievedDataP++
  localStorage.setItem("Plays",retrievedDataP)
}
function winrate(){
  let retrievedDataW = localStorage.getItem("Wins")
  let retrievedDataP = localStorage.getItem("Plays")
  let filler=(retrievedDataW/retrievedDataP)*100 
  return Math.round(filler)+"%"
}