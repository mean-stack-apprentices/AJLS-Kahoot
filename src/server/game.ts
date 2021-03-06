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

import type { Game, Host } from "../shared/models/game.model.js";
import { Player } from "../shared/models/player.model.js";
import { Quiz } from "../shared/models/quiz.model.js";

export const game: Game = {
	phases: ["start quiz", "lobby", "question", "leaderboard"],
	host: null,
	players: [],
	quiz: null,
	gamePin: null,
};

export function getPlayers() {
	return game.players;
}

export function addHost(host: Host) {
	game.host = host;
	return game.host;
}

// step 1: add player
export function addPlayer(player: Player) {
	if (!findBySocket(player.socketId)) {
		return game.players.push(player);
	}
	console.log("can not add! player already exists!");
	return false;
}

// remove socket id from players array
export function removePlayer(socket_id: string) {
	game.players = game.players.filter((player) => player.socketId !== socket_id);
	return game.players;
}

// check if playername is unique
export function isUniquePlayerName(player_Name: string) {
	player_Name = player_Name.toLowerCase();
	return !game.players.find(
		(player) => player.playerName?.toLowerCase() === player_Name
	);
}

export function cleanGame() {
	game.host = null;
	game.gamePin = null;
	game.players = [];
	game.quiz = null;
}

// find player by socket id
export function findBySocket(socket_id: string) {
	return game.players.find((player) => player.socketId === socket_id);
}

function hostExists() {
	return game.host;
}

export function isHost(socket_id: string) {
	return game.host?.socketId === socket_id;
}

// generate 6 digit random number
export function generateGamePin() {
	let randomStr = "";
	for (let i = 0; i < 6; i++) {
		let randomNum;
		// generate random number between 0 and 9
		randomNum = Math.floor(Math.random() * 9);
		randomStr += randomNum;
	}
	return randomStr;
}

export function isGamePinValid(pin: string) {
	return game.gamePin === pin;
}

export function selectQuiz(quiz: Quiz) {
	game.quiz = quiz;
}

export function getQuestionLength() {
	let questionNumber = game.quiz?.questions?.findIndex(
		(question) => !question.completed
	);
	if (questionNumber != -1) {
		questionNumber! += 1;
	}
	const totalLength = game.quiz?.questions?.length;
	return { questionNumber, totalLength };
}

export function getQuestion() {
	return game.quiz?.questions?.find((question) => !question.completed);
}

function getCorrectAnswer() {
	return getQuestion()?.answers.find((answer) => answer.correct);
}

export function hasEveryoneAnswered() {
	return game.players.every((player) => player.answer);
}

export function playerAnswersQues(socketId: string, ans: string) {
	const player = findBySocket(socketId);
	// if player exists, save answer given by player
	if (player) {
		player.answer = ans;
		console.log("players (after answered:)", game.players);
		// if all players answered, check if correct and give points
		if (hasEveryoneAnswered()) {
			game.players.forEach((player) => {
				if (!player.points) player.points = 0;

				const correct = player.answer == getCorrectAnswer()?.option;

				if (correct) {
					player.points += 5;
				}
				//make answer null after points given
				player.answer = null;
			});
			console.log("players (after points given:)", game);

			// change question's completed value to true
			const question = getQuestion();
			if (question) {
				question.completed = true;
			}
			return true;
		}
	}
}
