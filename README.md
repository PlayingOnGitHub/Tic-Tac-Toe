

Create players(player1name, mark, player2name, mark) {
	Create prototype
	Create factory function that creates object from prototype
	Create 2 player objects from factory function based on passed arguments.
}

createEventListeners() -> Call makeAMove()

makeAmove()
	-> delete event listener.
	-> update gameboard object's array property for the appropriate spot (grab id from "this" to choose the appropriate spot)
	-> call init

init()
	-> render()
	-> controlGameFlow()

render() {
	if ( player object is empty ) {
        if ( endofgame == true ) {
            deleteHtmlGrid();
            init();
        }
		createDataScreen() [asks user if they want to play 1 player or 2 player]...
	}
	else {
		if ( the enter-data-screen is present ) {
			deleteDataScreen() [enter-data-screen is deleted]
		}

		If (gameboard object array does not exist or is empty and if an html grid is not already present) {
            createGameBoardAndGrid() [creates a ticTacToe html grid and new gameboard object]
		}
		else {
			render displays X's and O's on grid for each item in gameboard object that is filled with X's and O's
		}
	}
}

controlGameFlow() {
    if ( endOfGame == true ) {
        endOfGame = false // push to endOfGameObject
    }

    if (aWinningMatchIsPresent) {
        endofGame = true // push to endOfGameObject
        resetPlayers() // Set player object to empty {}.
        resetGameBoard() // Set gameboard object array to DEFAULT VALUES
        resetActivePlayer
    }
    else if (next player==true) {
        changeActivePlayer();
    }
    init()
}

createDataScreen() {
    if ( valid data is passed ) {
        createPlayers()
    }
    else {
        deleteDataScreen()
    }
    init()
}

changeActivePlayer() {
    Set active player to the other player
}

resetActivePlayer() {
    Set active player to player1
}