// AJLS-kahoot 
// extra steps: help page for kahoot(steps to start game)
// 1. login person can select a quiz and start game and becomes host, and goes to lobby page(join-game component)
// 1. a. check if game started, then only accept the username in lobby, else show message, "game has not started"
// host connects ///  list of players and one has to be host()
// host selects quiz // Quiz, page for selecting quiz
// others join // keep track of the players sockets
// everyone add names // every time someone adds a name everyone receives names /// players names
// host starts game // which phase - lobby, question, leaderboard
// everyone routes to next route // to send which page everyone should be on
// all players are giving first question / send first question
// all players answer question/ / players answers for each game/ when everyone is done.
// all players route to leader board and are giving results - when everyone answers route each player to leader board
// host request next question / all players route to next question
// repeat line 11 to 14 until all questions are answered. /// know when it is done
// const game = {
//     phaseIndex: 0,
//     phases: ['select quiz', 'lobby', 'question', 'leader board'],
//     players: [
//         {name: 'Larry', host: true, socketId: '789579579', points: 100, done: true, answer: a }
//     ],
//     quiz: {
//         name: 'Angular',
//         questions: [ {
//             completed: true,
//             text: 'what is a component',
//             answers: [
//                 {text: true, correct: false},
//                 {text: false, correct: false},
//                 {text: 'all the above', correct: false}]
//         }],
//     }
// }
// game.js(algorithm steps,)
// Player model(playerName: string, host: boolean, socketId: string, point: number, done: boolean, answer: string)
// Game model(phases: array, players: array, quiz: Quiz)


import type { Game } from "../shared/models/game.model.js";
import { Player } from "../shared/models/player.model.js";

export const game: Game = {
    phases: ['start quiz', 'lobby', 'question', 'leaderboard'],
    players: [],
    quiz: null,
    gamePin: null
}

export function getPlayers() {
    return game.players;
}

// step 1: add socket id to players array
export function addPlayer(player: Player, pin: any) {

    // add player if gamepin matches and socketid is not duplicate
    if(isGamePinValid(pin) && !findBySocket(player.socketId)) {
        return game.players.push(player);
    }
    else 
        return false;
}

// remove socket id from players array
export function removePlayer(socket_id: string) {
    game.players = game.players.filter(player => player.socketId !== socket_id);
    return game.players;
}

// step 2: set player as host
export function setHost(socket_id: string){
    addPlayer({socketId: socket_id}, null)
    if(!hostExists()) {
        let player = findBySocket(socket_id);
        if(player) {
            player.host = true;
            game.gamePin = generateGamePin();
        }
    }
}

// find player by socket id
function findBySocket(socket_id: string) {
    return game.players.find(player => player.socketId === socket_id);
}


function hostExists() {
    return game.players.find(player => player.host)
}

// generate 6 digit random number
function generateGamePin() {
    let randomStr = '';
    for(let i = 0; i<6; i++)   
    {
        let randomNum;
        // generate random number between 0 and 9
        randomNum = Math.floor(Math.random() * 9) 
        randomStr += randomNum;
    }
    return randomStr;
};

function isGamePinValid(pin: string) {
    return game.gamePin === pin
};