/*
Create a module
Module takes 1 argument. (2 player or single player)
    If 2 players, module creates 2 players inside of itself using an outside factory function.
    If single player, module creates 1 player for the user and the 2nd player is the computer.

Basic game goes as:
    player1 starts the match.
        -> therefore, when a square is clicked, an event listtener will fire.. The event listener checks for the current player.
           Since our current player is player1, player1's mark is placed on the grid square.
                                                Player1's mark is stored for that grid id?
                                                Check to see if any player's grid id's line up for player1 to win....
                                                    If player's grid id's line up for a match, player1 wins,
                                                    If player's grid id's don't line up for a match and all the grid id's are filled, declare a tie.
                                                    If player's grid id's dont line up for a match and all the grid id's are not filled up, player2 becomes active player for a turn.
                                                    That particular function that checks for a match will check the current players id's for a match! Check player1 id's, as an example.

    player2 now goes next since the grid id's didn't line up for a match and since it's not the end of the game
        -> player2 is active player now. (Event) Listen for player stuff || Do computer stuff.. select random square (work up to AI).
                Check for player's grid id's (can make this a function inside of my module)..
                If not the end of game, player1 becomes active player.
        
    Active player function?

*/

const createGame = (function() {
    /* You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects */
    // anything outside of functions is apart of init() in a way.
    const public = {};
    public.elements = [...(document.querySelectorAll(".ticTacToeGrid div"))];
    public.createPlayers = (name1, mark1, name2, mark2) => {
        const incrementer = 0;
        const playerProto = {
            name: this.name,
            mark: this.mark
        }
        const newPlayer = function(name, mark) {
            return Object.assign(Object.create(playerProto), {name:name, mark:mark});
        }
        if ( name1 && mark1 && name2 && mark2 && incrementer == 0 ) {
            const player1 = newPlayer(name1, mark1);
            const player2 = newPlayer(name2, mark2);
            incrementer++; // stops people from adding more, unless they just hack the code through debugging or something else
        }
        return {player1, player2};
    }

    public.deleteEventHandler = element => {
        element.removeEventListener("click", playGame, true);
        console.log(element);
    }

    public.createEventHandlers = function() {
        elements.forEach( (element) => {
            element.addEventListener("click", playGame, true);
        });
    }
    return {public};
})();


    // function playGame() {
    //     deleteEventHandler(this);
    //     renderMark();
    //     checkGameStatus();
    // }


function endGame() {

}

function renderMark() {

}

function checkGameStatus() {

}