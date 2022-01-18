"use strict";

function playGame(userSelection){
    setTimeout(setRounds, 350); //hide userSetRounds 
    roundResult.parentNode.style.visibility = "visible"; //show round results
    let roundwinner;   
    roundCounter++;
    roundCounterP.textContent = roundCounter; //show round number on page
    let rndNumberAI = Math.floor(Math.random() * 3);
    selectIMG(rndNumberAI, userSelection);

    //checking who won
    if(rndNumberAI === 0){
        if(userSelection === 2){
            pointsUser++
            roundwinner = 1;
        }
        else if(userSelection === 1){
            pointsAI++;
            roundwinner = 0;
        }
        else{
            roundwinner = 2;
        }
    }
    if(rndNumberAI === 1){
        if(userSelection === 0){
            pointsUser++
            roundwinner = 1;
        }
        else if(userSelection === 2){
            pointsAI++;
            roundwinner = 0;
        }
        else{
            roundwinner = 2;
        }        
    }
    if(rndNumberAI === 2){
        if(userSelection === 0){
            pointsAI++;
            roundwinner = 0;
        }
        else if(userSelection === 1){
            pointsUser++
            roundwinner = 1;
        }
        else{
            roundwinner = 2;
        }   
    }
    //\checking who won
    if (roundwinner === 0){
        textPointsAI.textContent = pointsAI;
    }
    else if (roundwinner === 1){
        textPointsUser.textContent = pointsUser;
    }
    setWinnerofRound(roundwinner);
    //alert user who won match and reset gamefield
    setTimeout(function() {
        if(pointsUser === roundsToWin){
            alert("Spieler hat gewonnen")
            resetGame();
        }
        else if(pointsAI === roundsToWin){
            alert("AI hat gewonnen")
            resetGame();
        }
    }, 1000)
}

//show right images for ai and user selection
function selectIMG(rndNumberAI, userSelection){
    let tempSelection = rndNumberAI;

    for(let i = 0; i < 2; i++){
        switch(tempSelection){
            case 0: imgs[i].setAttribute("src","img/paper.png");
            break;

            case 1: imgs[i].setAttribute("src","img/rock.png");
            break;

            case 2: imgs[i].setAttribute("src","img/scissors.png");
            break;
        }
        tempSelection = userSelection
    }

}

//sets new value for round req. for winning
function setRounds(){
    console.log(userRound.value);
    if((userRound.value) !== ""){
        roundsToWin = Number(userRound.value);
    }
    userRoundsSet.style.display = "none";
}

//show user who won the round
function setWinnerofRound(winner){
    if (winner === 0){
        roundResult.textContent = "Die AI hat gewonnen";
    }
    else if (winner === 1){
        roundResult.textContent = "Du hast gewonnen";       
    }
    else{
        roundResult.textContent = "Unentschieden";        
    }
}

//after Match is over, reset Gamefield
function resetGame(){
    pointsAI = 0;
    pointsUser = 0;
    roundsToWin = 3;
    roundCounter = 0;
    imgs[0].setAttribute("src", "http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif");
    imgs[1].setAttribute("src", "http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif");  
    textPointsAI.textContent = pointsAI;
    textPointsUser.textContent = pointsUser;
    roundCounterP.textContent = roundCounter;
    userRoundsSet.removeAttribute("style");
    roundResult.parentNode.removeAttribute("style");
    roundResult.textContent = ""
}

//Animation on click for Icons
function animateIcons(icon){
    icon.style.transform = "scale(0.9)";
    icon.style.backgroundColor = "rgba(28, 28, 155, 0.4)";
    setTimeout(function(){
        icon.style.transform = "scale(1)";   
        icon.style.backgroundColor = "transparent";    
    },200)
}

//Get all needed Elements
let btnRound = document.getElementById("roundBTN");
let userRound = document.getElementById("inputForRounds");
let imgs = document.getElementById("showImgHere").getElementsByTagName("img");
let roundCounterP = document.getElementById("roundCounter");
let textPointsAI = document.getElementById("textPointsAI")
let textPointsUser = document.getElementById("textPointsUser")
let roundResult = document.getElementById("roundResult");
let userRoundsSet = document.getElementById("userRoundsSet") 
let icons = document.getElementById("icons").getElementsByTagName("img");


//Set default values & roundsToWin can be changed with setRounds
let pointsAI = 0;
let pointsUser = 0;
let roundsToWin = 3;
let roundCounter = 0;

//Print values on Page
textPointsAI.textContent = pointsAI;
textPointsUser.textContent = pointsUser;
roundCounterP.textContent = roundCounter;

//Event, when one icon is clicked
icons[0].addEventListener("click", function(e) {
    animateIcons(icons[0]);
    playGame(0);
})
icons[1].addEventListener("click", function(e) {
    animateIcons(icons[1]);
    playGame(1);
})
icons[2].addEventListener("click", function(e) {
    animateIcons(icons[2]);
    playGame(2);
})

//Set new Amount of Rounds is needed to win
btnRound.onclick = setRounds;