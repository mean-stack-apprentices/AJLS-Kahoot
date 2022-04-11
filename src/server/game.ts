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

export const game: Game = {
    phases: ['start quiz', 'lobby', 'question', 'leaderboard'],
    players: [],
    quiz: null
}





