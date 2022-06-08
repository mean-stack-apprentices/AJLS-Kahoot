import {
	addHost,
	addPlayer,
	cleanGame,
	findBySocket,
	game,
	generateGamePin,
	getPlayers,
	getQuestion,
	getQuestionLength,
	isGamePinValid,
	isHost,
	isUniquePlayerName,
	playerAnswersQues,
	removePlayer,
	selectQuiz,
} from "./game.js";
import { Quiz } from "../shared/models/quiz.model.js";
import { Server } from "socket.io";
import { server } from "./serverConfig.js";

const io = new Server(server, {
	cors: { origin: "*" },
});


io.on("connection", (socket) => {
	console.log("user connected with SocketId: ", socket.id);

	// add player if gamepin is correct
	socket.on("validate gamepin", (pin: string) => {
		if (isGamePinValid(pin)) {
			socket.emit("route", "Join-game");
		} else {
			console.log("Wrong Game Pin");
			socket.emit("err-message", "Wrong pin");
		}
		console.log("players = ", getPlayers());
	});

	// disconnect socket when tab closed
	socket.on("disconnect", () => {
		console.log("user disconnected: ", socket.id);
		removePlayer(socket.id); // remove from players array
		console.log("Players(after deletion) = ", getPlayers());
	});

	// start quiz (1.reset game 2.select quiz 3.add host 4. generate gamepin)
	socket.on("start quiz", (quiz: Quiz) => {
		cleanGame();
		selectQuiz(quiz);
		addHost({ socketId: socket.id });
		game.gamePin = generateGamePin();
		socket.join("room host");
		socket.emit("route", "phase-lobby");
		socket.emit("get-pin", game.gamePin);
		console.log("game = ", game);
	});

	//Add Player Name
	socket.on("add-name", (name) => {
		if (isUniquePlayerName(name)) {
			socket.emit("error-message", null);
			addPlayer({ socketId: socket.id, playerName: name });
			console.log("Game", game);
			io.to("room host").emit("player joined", game.players);
			socket.emit("route", "phase-waiting");
			socket.emit("get-join-msg", {
				displayName: `Welcome ${name}, You are in!`,
				waitMsg: "Please Wait For The Game To Start...",
			});
		} else {
			socket.emit(
				"error-message",
				"Name already taken, please choose another name ;))"
			);
		}
	});

	//Send All Player to Question page
	socket.on("go-to-question", () => {
		socket.broadcast.emit("route", "phase-question");
	});

	//Get Question
	socket.on("request-question", () => {
		const question = getQuestion();
		const questionProperties = getQuestionLength();
		const player = findBySocket(socket.id);
		const name = player?.playerName;
		socket.emit("data-question", { question, questionProperties, name });
	});

	//send answer, check, give points, send to scoreboard page
	socket.on("send-answer", (answer) => {
		console.log("answer = ", answer);
		if (answer) {
			const allAnswered = playerAnswersQues(socket.id, answer);
			if (allAnswered) {
				io.emit("route", "phase-leaderboard");
			}
		}
	});

	// get players scores when requested
	socket.on("request-players-scores", () => {
		const allPlayers = getPlayers();
		io.emit("all-players-scores", allPlayers);
	});

	// check if it is host
	socket.on("check-if-host", () => {
		const is_host = isHost(socket.id);
		console.log("is host? ", is_host);
		socket.emit("is-host", is_host);
	});

	// Ask for Next Question
	socket.on("next-question", () => {
		socket.broadcast.emit("route", "phase-question");
	});

	// test: send message to client
	socket.emit("message", "welcome to sockets");
});
