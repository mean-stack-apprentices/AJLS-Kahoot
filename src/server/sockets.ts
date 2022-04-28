import {
  addPlayer,
  cleanGame,
  game,
  generateGamePin,
  getPlayers,
  getQuestion,
  isGamePinValid,
  isUniquePlayerName,
  removePlayer,
  selectQuiz,
} from "./game.js";
import { Quiz } from "../shared/models/quiz.model.js";
import { Server } from "socket.io";
import { server } from "./serverConfig.js";

const io = new Server(server, {
  cors: { origin: "*" },
});

export default io.on("connection", (socket) => {
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

  // start quiz (1.reset game 2.select quiz 3.add player as host 4. generate gamepin)
  socket.on("start quiz", (quiz: Quiz) => {
    cleanGame();
    selectQuiz(quiz);
    addPlayer({ socketId: socket.id, host: true });
    game.gamePin = generateGamePin();
    socket.join('room host');
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
      io.to('room host').emit("player joined", game.players);
      socket.emit("route", "phase-waiting");
      socket.emit("get-player", {
        displayName: `Welcome ${name}, You are in!`,
        waitMsg: "Please Wait For The Game To Start...",});
      
    } else {
      socket.emit(
        "error-message",
        "Name already taken, please choose another name ;))"
        );
      }
    });
    
  
    //Send All Player to Question page
    socket.on('go-to-question', ()=>{
      socket.broadcast.emit('route','phase-question')
    })

     //Get Question    
    socket.on("get-question", ()=>{
      const question = getQuestion()
      socket.emit("data-question", question)
        })

    

  // test: send message to client
  socket.emit("message", "welcome to sockets");
});
