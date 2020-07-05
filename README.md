const ticTacToeModule = (function() {

    const player1 = {};
    const player2 = {};
    const gameBoard = { gameBoardArray: [] };
    const currentStatus = { activePlayer: "Player1", endOfGame: false };
    const ticTacToe = document.getElementById("ticTacToe");

    // this will mix values into player1 and player2 when called
    const createPlayer = (player, playerName, playerMark) => {
        const playerProto = { name: this.name,
                              mark: this.mark }
        const createPlayer = () => {
            Object.assign( player, Object.create(playerProto), {name: playerName, mark: playerMark} ); // directly changes target -> player
        }
    }

    init()
        -> render()
        -> controlGameFlow()

    render() {
        if ( player object is empty ) {
            if ( currentStatus.endofgame == true ) {
                deleteHtmlGrid();
                currentStatus.endofgame = false
                init();
            }
            else {
                <!-- implicitly calls init through checkData() -->
                createDataPrompt() [asks user if they want to play 1 player or 2 player]...
            }
        }
        else {
            if ( the enter-data-screen is present ) {
                deleteDataScreen() [enter-data-screen is deleted]
            }

            If (gameboard object array does not exist or is empty and if an html grid is not already present) {
                createGameBoard() [creates a ticTacToe html grid]
            }
            else {
                render displays X's and O's on grid for each item in gameboard object that is filled with X's and O's
            }
        }
    }

    function controlGameFlow() {
        if ( currentStatus.endOfGame == true ) {
            currentStatus.endOfGame = false
        }

        if (aWinningMatchIsPresent) {
            currentStatus.endofGame = true
            resetPlayers() // Set player object to empty {}.
            resetGameBoard() // Set gameboard object array to DEFAULT VALUES
            resetActivePlayer()
        }

        init()
    }

    <!-- implicitly calls init from checkData upon event fire -->
    function createDataPrompt() {
        renders 2 sections. 1 section says "1 Player" other section says "2 player"
        1section.addEventListener("click", checkData, true);
        2section.addEventListener("click", checkData, true);
    }

    <!-- calls init -->
    function checkData() {
        if ( valid data is passed ) {
            // get elements as well and then create players
            createPlayer(player1, player1name, player1mark);
            createPlayer(player2, player2name, player2mark);
        }
        else {
            deleteDataPrompt()
        }
        init()
    }

    <!-- create GameBoard -->
    function createGameBoard() {
        const grid = ticTacToe.appendChild(document.createElement("div"));
        grid.id = "grid";
        for ( let i = 0; i < 9; i++ ) {
            const gridSquare = grid.appendChild(document.createElement("div"));
            gridSquare.id = i;
            gridSquare.className = "grid-item";
            gridSquare.addEventListener("click", makeAMove, true);
        }
    }

    <!-- Fires when a gridSquare is clicked -->
    function makeAmove() {
        const gridSquare = this;
        // Use grid id to search gameBoard.gameBoardArray..
        if (if gameBoard.gameBoardArray[this.id] == "DEFAULT" && this.id <= 9 && this.id >= 0 ) {
            deleteEventListener.call(gridSquare);
            updateGameBoardArray.call(gridSquare);
            changeActivePlayer();
        }
        init();
    }

    function updateGameBoardArray() {
        const gridSquare = this;
        if ( currentStatus.activePlayer == "Player1" ) {
            gameBoard.gameBoardArray[gridSquare.id] = player1.mark;
        }
        else {
            gameBoard.gameBoardArray[gridSquare.id] = player2.mark;
        }
    }

    <!-- Last 2 functions change the active player -->
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
})();