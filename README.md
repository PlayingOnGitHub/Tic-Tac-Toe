/*
Create a module
Module creates 2 players inside of itself using an outside factory function?

Basic game goes as:
    player1 starts the match.
        -> therefore, when a square is clicked, an event listtener will fire.. The event listener checks for the current player.
           Since our current player is player1, player1's mark is placed on the grid square.
                                                Player1's mark is stored for that grid id?
                                                Check to see if any grid id's line up for player1 to win....
                                                    If grid id's line up for a match, player1 wins,
                                                    If grid id's don't line up for a match and all the grid id's are filled, declare a tie.
                                                    If grid id's dont line up for a match and all the grid id's are not filled up, player2 becomes active player for a turn.
                                                    That particular function that checks for a match will check the current players id's for a match! Check player1 id's, as an example.

    player2 now goes next since the grid id's didn't line up for a match and since it's not the end of the game
        -> Same Stuff

*/