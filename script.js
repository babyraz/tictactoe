"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

window.addEventListener('load', () => {
    initGlobalObject();
    prepGame();
});

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
function initGlobalObject() {

    //Datastruktur för vilka platser som är lediga respektive har brickor
    //Genom at fylla i här med antingen X eler O kan ni testa era rättningsfunktioner 
    oGameData.gameField = ['', '', '', '', '', '', '', '', ''];
    
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
    if (checkWinner(oGameData.playerOne)) {
        return 1;
    }
    if (checkWinner(oGameData.playerTwo)) {
        return 2;
    }
    if (checkForDraw()) {
        return 3;
    } else {
    return 0;
    }
}

// Säg till om ni vill få pseudokod för denna funktion
// Viktigt att funktionen returnerar true eller false baserat på om den inskickade spelaren är winner eller ej
function checkWinner(playerIn) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let pattern of winPatterns){
        const [a, b, c,] = pattern;
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
    let gameArea = document.getElementById('gameArea');
    gameArea.classList.add('d-none'); // Göm spelplanen från början

    let startClick = document.getElementById('newGame');
    startClick.addEventListener("click", function() {
        if (validateForm()) {
            initiateGame();
        }
    });
}


function initiateGame() {
    let formElement = document.getElementById('theForm');
    formElement.classList.add('d-none'); // Göm formuläret

    let showArea = document.getElementById('gameArea');
    showArea.classList.remove('d-none'); // Visa spelplanen

    let removeText = document.getElementById('errorMsg');
    removeText.innerText = '';  // Rensa textinnehåll

   

    //resetGameBoard();
    let emptyField = document.getElementsByTagName('td');

    for (let i = 0; i < emptyField.length; i++) {
        emptyField[i].innerText = "";
        emptyField[i].style.backgroundColor = "#ffffff";
    }

    //startingPlayer();
    let randomNum = Math.random();

    if (randomNum < 0.5) {
        oGameData.currentPlayer = oGameData.nickNamePlayerOne;
        console.log(`${oGameData.nickNamePlayerOne} börjar med symbolen X!`);
    } else {
        oGameData.currentPlayer = oGameData.nickNamePlayerTwo;
        console.log(`${oGameData.nickNamePlayerTwo} börjar med symbolen O!`);
    }

    //updateJumbotron();
    let h1Element = document.querySelector('.jumbotron h1');

    h1Element.innerText = `Aktuell spelare är ${oGameData.currentPlayer}`;



    //nextTurn(oGameData.currentPlayer);
    let playerChar;
    let playerName;

    if (oGameData.currentPlayer === oGameData.nickNamePlayerOne) {
        playerChar = "X";
        playerName = oGameData.nickNamePlayerOne;
    } else {
        playerChar = "O";
        playerName = oGameData.nickNamePlayerTwo;
    }

    console.log(`Det är ${playerName}s tur att spela (${playerChar}).`);
    //updateJumbotron();
    h1Element = document.querySelector('.jumbotron h1');

    h1Element.innerText = `Aktuell spelare är ${oGameData.currentPlayer}`;

    let gameTable = document.querySelector('table');
    gameTable.addEventListener('click', executeMove);
}


//prepGame();

function executeMove (event) {
    if (event.target.tagName !== 'TD') {
        return; // kontrollerar att det är en cell som klickas på
    }
    if (event.target.innerText !== "") {
        return; // Gör inget om cellen redan är ifylld
    }

    let playerChar = oGameData.currentPlayer === oGameData.nickNamePlayerOne ? "X" : "O";
    let playerColor = oGameData.currentPlayer === oGameData.nickNamePlayerOne ? oGameData.colorPlayerOne : oGameData.colorPlayerTwo;

    event.target.innerText = playerChar;
    event.target.style.backgroundColor = playerColor;

    // lägg till dataset istället
    let cellId = parseInt(event.target.getAttribute('data-id'), 10);
    oGameData.gameField[cellId] = playerChar;
    

    oGameData.currentPlayer =
    (oGameData.currentPlayer === oGameData.nickNamePlayerOne)
    ? oGameData.nickNamePlayerTwo
    : oGameData.nickNamePlayerOne

    //updateJumbotron();
    let h1Element = document.querySelector('.jumbotron h1');

    h1Element.innerText = `Aktuell spelare är ${oGameData.currentPlayer}`;

    let gameResult = checkForGameOver();
    if (gameResult !== 0) {
        gameOver(gameResult);
    }
}

/*function changePlayer() {

}*/



function gameOver(result) {
    let gameTable = document.querySelector('table');
    gameTable.removeEventListener('click', executeMove);

    let formElement = document.getElementById('theForm');
    formElement.classList.remove('d-none'); 

    let gameArea = document.getElementById('gameArea');
    gameArea.classList.add('d-none');

    let h1Element = document.querySelector('.jumbotron h1');
    if (result === 1) {
        h1Element.innerText = `${oGameData.nickNamePlayerOne} vinner! Spela igen?`;
    } else if (result === 2) {
        h1Element.innerText = `${oGameData.nickNamePlayerTwo} vinner! Spela igen?`;
    } else if (result === 3) {
        h1Element.innerText = `Oavgjort! spela igen?`;
    }

    initGlobalObject();
}


function validateForm() {
    oGameData.nickNamePlayerOne = document.getElementById('nick1').value;
    oGameData.nickNamePlayerTwo = document.getElementById('nick2').value;
    oGameData.colorPlayerOne = document.getElementById('color1').value;
    oGameData.colorPlayerTwo = document.getElementById('color2').value;

    console.log(`Color Player One: ${oGameData.colorPlayerOne}`);
    console.log(`Color Player Two: ${oGameData.colorPlayerTwo}`);

    if (oGameData.nickNamePlayerOne.length < 3 || oGameData.nickNamePlayerTwo.length < 3) {
        alert('Användarnamnen får inte understiga 3 bokstäver');
        return false;
    } else if (oGameData.nickNamePlayerOne.length > 10 || oGameData.nickNamePlayerTwo.length > 10) {
        alert('Användarnamnen får inte överstiga 10 bokstäver');
        return false;
    }
    else{
        if (oGameData.colorPlayerOne === '#ffffff' || oGameData.colorPlayerTwo === '#ffffff') {
            alert('Användaren får inte välja färgen vit');
            return false;
    } else if (oGameData.colorPlayerOne === '#000000' || oGameData.colorPlayerTwo === '#000000') {
            alert('Användaren får inte välja färgen svart');
            return false;
    } else {
            return true
        }
    }
}

function timer() {

}
