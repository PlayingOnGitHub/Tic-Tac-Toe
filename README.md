<!-- Create players(player1name, mark, player2name, mark) ->
	-> prototype
	-> factory function creates from prototype
	-> create players from factory function based on passed arguments

create event listeners (event listeners call delete listener) [Call play game?]

PlayGame function? -> create the ability to delete event listeners. call init

init()
	-> calls render
	-> calls check game status
		-> end game or next player
			-starts new game if end game is true [game status could be an object that gets passed in an earlier stage and
			 is later checked by init() -> end game()
				-> this also deletes previous player objects
	
	

render( ... data entered by players )
	-> render calls enterData function to ask user if they want to play 1 player or 2 player if there are no player objects... Call init else {
		-> render deletes previous screens (screens asking for data) if the screens are present
		-> render creates a ticTacToe grid if gameboard object array does not exist or is empty and if an html grid is not already present... else {
			-> render displays X's and O's on grid for each item in gameboard object that is filled with X's and O's
 -->