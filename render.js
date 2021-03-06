const ticTacToeModule = (function() {

    const player1 = {name: this.name, mark: this.mark};
    const player2 = {name: this.name, mark: this.mark};
    const gameBoard = { gameBoardArray: [] };
    const currentStatus = { activePlayer: "Player1", match: false, winner: "none", color: "DEFAULT", onePlayer: "DEFAULT" };
    const ticTacToe = document.getElementById("ticTacToe");

    const createPlayer = (player, playerName, playerMark) => {
        return Object.assign( player, Object.create({}), {name: playerName, mark: playerMark} );
    }

    // Run everything in the module in a loop
    function init() {
        checkForWinner();
        render();
        activateTheDestroyer();
    }

    function render() {
        const gameBoardArray = gameBoard.gameBoardArray;
        // One player or two player?
        if ( player1.name == undefined || player1.name == "" ) {
            if ( !(document.getElementById("data-prompt")) ) {
                createDataPrompt();
            }
        }
        // Now, render the game
        else {
            if ( gameBoardArray.length == 0 ) {
                deleteDataPrompt();
                createGameBoardArray();
                renderPlayerOne();
                createTicTacToeGrid();
                renderPlayerTwo();
            }
            else {
                renderXsAndOs(gameBoardArray);
            }
        }
    }

    function renderXsAndOs(gameBoardArray) {
        for ( let i = 0; i < 9; i++ ) {
            const claimed = gameBoardArray[i].claimed;
            if ( claimed != "DEFAULT" ) {
                let innerHTML = "<p style=\'color:";
                if ( claimed == "X" ) {
                    innerHTML += "red";
                }
                else if ( claimed == "O" ) {
                    innerHTML += "blue";
                }
                innerHTML += "\'>" + claimed + "</p>";
                document.getElementById(i).innerHTML = innerHTML;
            }
            else {
                let innerHTML = "";
                document.getElementById(i).innerHTML = innerHTML;
            }
        }
    }

    function activateTheDestroyer() {
        if ( currentStatus.onePlayer == true && currentStatus.activePlayer == "Player2" && currentStatus.match != true && currentStatus.endOfGame != true ) {
            // the Destroyer is invoked and goes ballastic on its enemies. This ruthless computer can beat any foe! JK
            deleteTicTacToeListeners();
            deleteRefreshButtonListener();
            makeDestroyerMove();
        }
    }

    function makeDestroyerMove() {
        setTimeout( () => { 
            const gameBoardArray = gameBoard.gameBoardArray;
            const bestMove = findWinningMoves();
            if ( bestMove !== false) {
                gameBoard.gameBoardArray[bestMove].claimed = player2.mark;
            }
            else {
                breakout:
                for ( let i = 0; i < gameBoardArray.length; i ++ ) {
                    if ( gameBoardArray[i].claimed == "DEFAULT" ) {
                        gameBoard.gameBoardArray[i].claimed = player2.mark;
                        break breakout;
                    }
                }
            }
            currentStatus.activePlayer = "Player1";
            recreateTicTacToeListeners();
            recreateRefreshButtonListener();
            init();
        }, 700);
    }

    function checkForWinner() {
        checkForAMatch();
        checkForEndOfGame();
        if (currentStatus.match == true || currentStatus.endOfGame == true ) {
            deleteRefreshButtonListener();
            deleteTicTacToeListeners();
            setTimeout(()=>{
                resetPlayers();
                resetGameBoardArray();
                deleteRenderPlayerOne();
                deleteTicTacToeGrid();
                deleteRenderPlayerTwo();
                deleteContentWrapper();
                resetActivePlayer();
                currentStatus.winner = "none";
                currentStatus.match = false;
                currentStatus.color = "DEFAULT";
                currentStatus.onePlayer = "DEFAULT";
                currentStatus.endOfGame = false;
                init();
            }, 3000);
        }
    }

    function checkForEndOfGame() {
        const gameBoardArray = gameBoard.gameBoardArray;
        if ( gameBoardArray.length != 0 ) {
            let endOfGame = gameBoardArray.every( (item) => {
                if ( item.claimed == "X" || item.claimed == "O" ) {
                    return true;
                }
                else {
                    return false;
                }
            });
            if ( endOfGame ) {
                currentStatus.endOfGame = true;
            }
        }
    }

    // implicitly calls init from checkData upon event fire -->
    function createDataPrompt() {
        // renders 2 sections. 1 section says "1 Player" other section says "2 player"
        const header = ticTacToe.appendChild(document.createElement("div"));
        header.className = "header";
        header.innerText = "Tic-Tac-Toe";
        const dataPromptWrapper = ticTacToe.appendChild(document.createElement("div"));
        dataPromptWrapper.className = "data-prompt-wrapper";
        const dataPrompt = dataPromptWrapper.appendChild(document.createElement("div"));
        dataPrompt.id = "data-prompt";
        const section1 = dataPrompt.appendChild(document.createElement("div"));
        const section2 = dataPrompt.appendChild(document.createElement("div"));
        section1.addEventListener("click", checkData.bind(section1), true);
        section1.className = "section1";
        section1.id = "one-player";
        section1.innerText = "1 Player";
        section2.addEventListener("click", request2Player, true);
        section2.className = "section2";
        section2.id = "two-player";
        section2.innerText = "2 Player";
        // probably for 1 and 2 player for sections! :) Then call another function to getData for a 
        // form with name etc.. then that function will call checkData()
    }

    function deleteDataPrompt() {
        const dataPromptWrapper = document.querySelector(".data-prompt-wrapper");
        const section1 = document.getElementById("one-player");
        const section2 = document.getElementById("two-player");
        const player1Input = document.getElementById("player1");
        const player2Input = document.getElementById("player2");
        const button = document.getElementsByTagName("button")[0];
        if ( player1Input ) {
            button.removeEventListener("click", checkData, true);
            player1Input.removeEventListener("focus", addRemovePlaceHolder, true );
            player1Input.removeEventListener("blur", addRemovePlaceHolder, true );
            player2Input.removeEventListener("focus", addRemovePlaceHolder, true );
            player2Input.removeEventListener("blur", addRemovePlaceHolder, true );
        }
        section1.removeEventListener("click", checkData, true);
        dataPromptWrapper.remove();
        const header = document.getElementsByClassName("header")[0];
        header.remove();
    }

    // calls init
    function checkData() {
        const section = this;
        if (section.id == "one-player" ) {
            currentStatus.onePlayer = true;
            createPlayer(player1, "You", "X");
            createPlayer(player2, "The Destroyer", "O");
        }
        else {
            event.preventDefault();
            const player1value = document.getElementById("player1").value;
            const player2value = document.getElementById("player2").value;

            if ( typeof player1value == "string" && typeof player2value == "string" && player1value.trim().length != 0 && player2value.trim().length != 0 ) {
                createPlayer(player1, player1value, "X");
                createPlayer(player2, player2value, "O");
            }

        }
        init();
    }

    function renderPlayerOne() {
        const contentWrapper = ticTacToe.appendChild(document.createElement("div"));
        contentWrapper.className = "content-wrapper";
        const playerOne = contentWrapper.appendChild(document.createElement("div"));
        playerOne.className = "players player1";
        playerOne.innerText = player1.name;
    }

    // create GameBoard
    function createTicTacToeGrid() {
        const contentWrapper = document.getElementsByClassName("content-wrapper")[0];
        const gridWrapper = contentWrapper.appendChild(document.createElement("div"));
        gridWrapper.className = "grid-wrapper";
        addRefreshButton();
        const grid = gridWrapper.appendChild(document.createElement("div"));
        grid.id = "grid";
        for ( let i = 0; i < 9; i++ ) {
            const gridSquare = grid.appendChild(document.createElement("div"));
            gridSquare.id = i;
            className = getClassName(i);
            gridSquare.className = className;
            gridSquare.addEventListener("click", makeAMove, true);
        }
    }

    function addRefreshButton() {
        const gridWrapper = document.getElementsByClassName("grid-wrapper")[0];
        const refreshButton = gridWrapper.appendChild(document.createElement("div"));
        refreshButton.className = "refreshButton"
        const refreshImage = refreshButton.appendChild(document.createElement("img"));
        refreshImage.src = "refresh.png";
        refreshButton.addEventListener("click", resetGame, true );
    }

    function resetGame() {
        const gameBoardArray = gameBoard.gameBoardArray;
        gameBoardArray.forEach( (item, index) => {
            const gridItem = document.getElementById(index);
            if (item.claimed != "DEFAULT" ) {
                gridItem.removeEventListener("click", makeAMove, true);
            }
            item.claimed = "DEFAULT";
            gridItem.addEventListener("click", makeAMove, true);
        });
        currentStatus.activePlayer = "Player1";
        currentStatus.match = false;
        currentStatus.winner = "none";
        init();
    }

    function renderPlayerTwo() {
        // create grid. Edit the part where grid instead appends to grid-wrapper
        const contentWrapper = document.getElementsByClassName("content-wrapper")[0];
        const playerTwo = contentWrapper.appendChild(document.createElement("div"));
        playerTwo.className = "players player2";
        playerTwo.innerText = player2.name;
    }

    function deleteTicTacToeGrid() {
        document.getElementsByClassName("grid-wrapper")[0].remove();
    }

    function deleteRenderPlayerOne() {
        const playerOne = document.getElementsByClassName("player1")[0];
        playerOne.remove();
    }

    function deleteRenderPlayerTwo() {
        const playerTwo = document.getElementsByClassName("player2")[0];
        playerTwo.remove();
    }

    function deleteContentWrapper() {
        const contentWrapper = document.getElementsByClassName("content-wrapper")[0];
        contentWrapper.remove();
    }

    function deleteRefreshButtonListener() {
        const refreshButton = document.getElementsByClassName("refreshButton")[0];
        if ( refreshButton ) {
            refreshButton.removeEventListener("click", resetGame, true );
        }
    }

    function deleteTicTacToeListeners() {
        for ( let i = 0; i < 9; i++ ) {
            const gridSquare = document.getElementById(i);
            gridSquare.removeEventListener("click", makeAMove, true);
        }
    }

    function recreateTicTacToeListeners() {
        for ( let i = 0; i < 9; i++ ) {
            const gameBoardArray = gameBoard.gameBoardArray;
            if ( gameBoardArray ) {
                if ( gameBoardArray[i].claimed == "DEFAULT" ) {
                    const gridSquare = document.getElementById(i);
                    gridSquare.addEventListener("click", makeAMove, true);
                }
            }
        }
    }

    function recreateRefreshButtonListener() {
        const refreshButton = document.getElementsByClassName("refreshButton")[0];
        refreshButton.addEventListener("click", resetGame, true );
    }

    function createGameBoardArray() {
        for ( let i = 0; i < 9; i++ ) {
            gameBoard.gameBoardArray.push( { claimed: "DEFAULT" } );
        }
    }

    function resetGameBoardArray() {
        gameBoard.gameBoardArray = [];
    }

    // Fires when a gridSquare is clicked
    function makeAMove() {
        const gridSquare = this;
        if ( gameBoard.gameBoardArray[this.id].claimed == "DEFAULT" && this.id <= 9 && this.id >= 0 ) {
            deleteEventListener.call(gridSquare);
            updateGameBoardArray.call(gridSquare);
            changeActivePlayer();
        }
        init();
    }

    function deleteEventListener() {
        const gridSquare = this;
        gridSquare.removeEventListener("click", makeAMove, true);
    }

    function updateGameBoardArray() {
        const gridSquare = this;
        if ( currentStatus.activePlayer == "Player1" ) {
            gameBoard.gameBoardArray[gridSquare.id].claimed = player1.mark;
        }
        else {
            gameBoard.gameBoardArray[gridSquare.id].claimed = player2.mark;
        }
    }

    function request2Player() {
        const section2 = document.getElementById("two-player");
        section2.removeEventListener("click", request2Player, true );
        const dataPromptWrapper = document.getElementsByClassName("data-prompt-wrapper")[0];
        const form = dataPromptWrapper.appendChild(document.createElement("form"))
        form.className = "enter-data";
        const player1Label = form.appendChild(document.createElement("label"));
        player1Label.className = "playerLabel";
        player1Label.htmlFor = "player1";
        player1Label.innerText = "Player 1: ";
        const player1Input = player1Label.appendChild(document.createElement("input"));
        player1Input.type = "text";
        player1Input.id = "player1";
        player1Input.htmlFor = "player1";
        player1Input.className = "playerInput";
        player1Input.name = "player1";
        player1Input.placeholder = "Enter name here...";
        const player2Label = form.appendChild(document.createElement("label"));
        player2Label.className = "playerLabel";
        player2Label.htmlFor = "player2";
        player2Label.innerText = "Player 2: ";
        const player2Input = player2Label.appendChild(document.createElement("input"));
        player2Input.type = "text";
        player2Input.id = "player2";
        player2Input.className = "playerInput";
        player2Input.name = "player2";
        player2Input.placeholder = "Enter name here...";
        player1Input.addEventListener("focus", addRemovePlaceHolder, true );
        player1Input.addEventListener("blur", addRemovePlaceHolder, true );
        player2Input.addEventListener("focus", addRemovePlaceHolder, true );
        player2Input.addEventListener("blur", addRemovePlaceHolder, true );

        const button = form.appendChild(document.createElement("button"));
        button.innerText = "Go!";
        button.className = "goButton";
        button.addEventListener("click", checkData, true );
        
        // button.addEventListener("click", checkData, true );

    }

    function addRemovePlaceHolder() {
        const thisInput = this;
        if (thisInput.placeholder.length != 0 ) {
            thisInput.placeholder = "";
        }
        else {
            thisInput.placeholder = "Enter name here...";
        }
    }

    function resetPlayers() {
        player1.name = "";
        player1.mark = "";
        player2.name = "";
        player2.mark = "";
    }

    function checkForAMatch() {
        const gameBoardArray = gameBoard.gameBoardArray;
        
        if ( gameBoardArray.length == 0 ) {
            return 0;
        }

        const player1mark = player1.mark;
        const player2mark = player2.mark;

        const item0 = gameBoardArray[0];
        const item1 = gameBoardArray[1];
        const item2 = gameBoardArray[2];
        const item3 = gameBoardArray[3];
        const item4 = gameBoardArray[4];
        const item5 = gameBoardArray[5];
        const item6 = gameBoardArray[6];
        const item7 = gameBoardArray[7];
        const item8 = gameBoardArray[8];

        const item0claimed = item0.claimed;
        const item1claimed = item1.claimed;
        const item2claimed = item2.claimed;
        const item3claimed = item3.claimed;
        const item4claimed = item4.claimed;
        const item5claimed = item5.claimed;
        const item6claimed = item6.claimed;
        const item7claimed = item7.claimed;
        const item8claimed = item8.claimed;

        if ( item0claimed == item3claimed && item3claimed == item6claimed && item6claimed != "DEFAULT" ) { 
            currentStatus.match = true;
            ( item6claimed == player1mark ) ? currentStatus.winner = player1.name : currentStatus.winner = player2.name;
            drawLine(0);
        }
        else if ( item1claimed == item4claimed && item4claimed == item7claimed && item7claimed != "DEFAULT" ) { 
            currentStatus.match = true;
            ( item7claimed == player1mark ) ? currentStatus.winner = player1.name : currentStatus.winner = player2.name;
            drawLine(1);
        }
        else if ( item2claimed == item5claimed && item5claimed == item8claimed && item8claimed != "DEFAULT" ) { 
            currentStatus.match = true;
            ( item8claimed == player1mark ) ? currentStatus.winner = player1.name : currentStatus.winner = player2.name;
            drawLine(2);
        }
        else if ( item0claimed == item1claimed && item1claimed == item2claimed && item2claimed != "DEFAULT" ) { 
            currentStatus.match = true;
            ( item2claimed == player1mark ) ? currentStatus.winner = player1.name : currentStatus.winner = player2.name;
            drawLine(3);
        }
        else if ( item3claimed == item4claimed && item4claimed == item5claimed && item5claimed != "DEFAULT" ) { 
            currentStatus.match = true;
            ( item5claimed == player1mark ) ? currentStatus.winner = player1.name : currentStatus.winner = player2.name;
            drawLine(4);
        }
        else if ( item6claimed == item7claimed && item7claimed == item8claimed && item8claimed != "DEFAULT" ) { 
            currentStatus.match = true;
            ( item8claimed == player1mark ) ? currentStatus.winner = player1.name : currentStatus.winner = player2.name;
            drawLine(5);
        }
        else if ( item0claimed == item4claimed && item4claimed == item8claimed && item8claimed != "DEFAULT" ) { 
            currentStatus.match = true;
            ( item8claimed == player1mark ) ? currentStatus.winner = player1.name : currentStatus.winner = player2.name;
            drawLine(6);
        }
        else if ( item2claimed == item4claimed && item4claimed == item6claimed && item6claimed != "DEFAULT" ) { 
            currentStatus.match = true;
            ( item6claimed == player1mark ) ? currentStatus.winner = player1.name : currentStatus.winner = player2.name;
            drawLine(7);
        }
    }

    function getClassName(i) {
        let className = "grid-item ";
        if ( i == 0 ) {
            className += "zero";
        }
        if ( i == 1 ) {
            className += "one";
        }
        if ( i == 2 ) {
            className += "two";
        }
        if ( i == 3 ) {
            className += "three";
        }
        if ( i == 4 ) {
            className += "four";
        }
        if ( i == 5 ) {
            className += "five";
        }
        if ( i == 6 ) {
            className += "six";
        }
        if ( i == 7 ) {
            className += "seven";
        }
        if ( i == 8 ) {
            className += "eight";
        }
        return className;
    }

    function drawLine(lineNumber) {
        const drawLine = document.getElementById("grid").appendChild(document.createElement("div"));
        ( currentStatus.winner == player1.name ) ? currentStatus.color = "red" : currentStatus.color = "blue";
        const idName = "draw-line-" + lineNumber;
        const drawClass = "draw-" + currentStatus.color;
        drawLine.id = idName;
        drawLine.className = drawClass;
        console.log("draw line: " + lineNumber );
    }

    function changeActivePlayer() {
        if ( currentStatus.activePlayer == "Player1" ) {
            currentStatus.activePlayer = "Player2";
        }
        else {
            currentStatus.activePlayer = "Player1";
        }
    }

    function resetActivePlayer() {
        currentStatus.activePlayer = "Player1";
    }

    function findWinningMoves() {
        const gameBoardArray = gameBoard.gameBoardArray;
        if (gameBoardArray.length == 0) return false;
        const claim0 = gameBoardArray[0].claimed + ";0"
        const claim1 = gameBoardArray[1].claimed + ";1";
        const claim2 = gameBoardArray[2].claimed + ";2"
        const claim3 = gameBoardArray[3].claimed + ";3";
        const claim4 = gameBoardArray[4].claimed + ";4";
        const claim5 = gameBoardArray[5].claimed + ";5";
        const claim6 = gameBoardArray[6].claimed + ";6";
        const claim7 = gameBoardArray[7].claimed + ";7";
        const claim8 = gameBoardArray[8].claimed + ";8";

        const claimPatternArray = [[claim0, claim3, claim6], [claim1, claim4, claim7], [claim2, claim5, claim8], [claim0, claim1, claim2],[claim3, claim4, claim5], [claim6, claim7, claim8], [claim0, claim4, claim8], [claim2, claim4, claim6]];
        let testedPatternedArray = [];
        claimPatternArray.forEach( (claimArray) => {
            testedPatternedArray.push( ( findPattern(...claimArray) ) );
        } );
        testedPatternedArray = testedPatternedArray.filter( (x) => ( x == -1 ) ? false: true );
        const bestMoves = testedPatternedArray
        let immediateWins,
            playerWins;
        if ( bestMoves.length != 0 ) {
            immediateWins = bestMoves.filter( (item) => (item[1] == "O") ? true : false);
            playerWins = bestMoves.filter( (item) => (item[1] == "X") ? true : false );
        }
        else {
            return false;
        }
        if ( immediateWins[0] ) {
            return +immediateWins[0][0];
        }
        if ( playerWins[0] ) {
            return +playerWins[0][0];
        }
    }

    // The location is where a winning spot resides. The "returned"-claim is the value of the other claims around this spot. This will tell->
                                                 //->the computer if it's a computer winning move or a player winning move.................
    function findPattern( spot0, spot3, spot6 ) {
        let claim0 = spot0.split(";")[0];
            let location0 = spot0.split(";")[1];
        let claim3 = spot3.split(";")[0];
            let location3 = spot3.split(";")[1];
        let claim6 = spot6.split(";")[0];
            let location6 = spot6.split(";")[1];
        if ( claim0 == claim3 && claim3 != "DEFAULT" && claim6 != "X" && claim6 != "O") {
            return [location6, claim0];
        }
        else if ( claim3 == claim6 && claim6 != "DEFAULT" && claim0 != "X" && claim0 != "O" ) {
            return [location0, claim3];
        }
        else if ( claim0 == claim6 && claim6 != "DEFAULT" && claim3 != "X" && claim3 != "O" ) {
            return [location3, claim0];
        }
        else {
            return -1;
        }
    }

    return {init};
})();

ticTacToeModule.init();