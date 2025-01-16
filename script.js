"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

window.addEventListener('load', () => {
    initGlobalObject();
    if(checkForGameOver() === 1) {
        console.log("Spelare 1 vann");        
    } else if(checkForGameOver() === 2) {
        console.log("Spelare 2 vann");
    } else if(checkForGameOver() === 3) {
        console.log("Oavgjort");
    } else {
        console.log("Spelet fortsätter");
    }
});

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
function initGlobalObject() {

    //Datastruktur för vilka platser som är lediga respektive har brickor
    //Genom at fylla i här med antingen X eler O kan ni testa era rättningsfunktioner 
    oGameData.gameField = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];
    
    /* Testdata för att testa rättningslösning */
    //oGameData.gameField = ['X', 'X', 'X', '', '', '', '', '', ''];
    //oGameData.gameField = ['X', '', '', 'X', '', '', 'X', '', ''];
    //oGameData.gameField = ['X', '', '', '', 'X', '', '', '', 'X'];
    //oGameData.gameField = ['', '', 'X', '', 'X', '', 'X', '', ''];
    //oGameData.gameField = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];

    //Indikerar tecknet som skall användas för spelare ett.
    oGameData.playerOne = "X";

    //Indikerar tecknet som skall användas för spelare två.
    oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
    oGameData.currentPlayer = "";

    //Nickname för spelare ett som tilldelas från ett formulärelement,
    oGameData.nickNamePlayerOne = "";

    //Nickname för spelare två som tilldelas från ett formulärelement.
    oGameData.nickNamePlayerTwo = "";

    //Färg för spelare ett som tilldelas från ett formulärelement.
    oGameData.colorPlayerOne = "";

    //Färg för spelare två som tilldelas från ett formulärelement.
    oGameData.colorPlayerTwo = "";

    //Antalet sekunder för timerfunktionen
    oGameData.seconds = 5;

    //Timerns ID
    oGameData.timerId = null;

    //Från start är timern inaktiverad
    oGameData.timerEnabled = false;

    //Referens till element för felmeddelanden
    oGameData.timeRef = document.querySelector("#errorMsg");
}

/**
 * Kontrollerar för tre i rad genom att anropa funktionen checkWinner() och checkForDraw().
 * Returnerar 0 om spelet skall fortsätta, 
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
function checkForGameOver() { 
    if(checkForDraw() === false){
        return 0;
    } 
    else if(checkWinner('X') === true){
        return 1;
    }
    else if(checkWinner('O')=== true){
        return 2;
    }
    else if(checkForDraw() === true){
        return 3;
    }
    
}

// Säg till om ni vill få pseudokod för denna funktion
// Viktigt att funktionen returnerar true eller false baserat på om den inskickade spelaren är winner eller ej
function checkWinner(playerIn) {
    const winPatterns = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    for (let pattern in winPatterns){
        const [a,b,c,] = pattern;
        if (oGameData.gameField[a] === playerIn &&
            oGameData.gameField[b] === playerIn &&
            oGameData.gameField[c] === playerIn){
            return true;   
            }      
    }
    return false;
}

//Kontrollera om alla platser i oGameData.GameField är fyllda. Om sant returnera true, annars false.
function checkForDraw() {
    for (let cell of oGameData.gameField) {
        if (cell === null || cell === '') {
            return false; // Spelet är inte klart eftersom det finns tomma positioner
        }
    }
    return true; // Alla positioner är fyllda, alltså är det oavgjort
}



// Nedanstående funktioner väntar vi med!

function prepGame() {

}

function validateForm() {
    
}

function initiateGame() {

}

function executeMove (event) {

}

function changePlayer() {

}

function timer() {

}

function gameOver(result) {

}
