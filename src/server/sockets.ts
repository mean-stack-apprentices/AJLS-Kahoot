import {addName,addPlayer, cleanGame, game, generateGamePin, getPlayers, isGamePinValid, removePlayer, selectQuiz } from './game.js';
import { Quiz } from '../shared/models/quiz.model.js';
import { Server } from 'socket.io';
import { server } from './serverConfig.js';

const io = new Server(server,{
    cors: { origin: '*' }
});

export default io.on('connection', (socket) => {
    console.log("user connected with SocketId: ", socket.id);

    // add player if gamepin is correct
    socket.on('validate gamepin', (pin: string) => {
        if(isGamePinValid(pin)) {
            addPlayer({socketId: socket.id});
            socket.emit('route','Join-game')
        }
        else {
            console.log("Wrong Game Pin");
            socket.emit('message', 'Wrong pin');
        }
        console.log("players = ", getPlayers());
    }); 

    // disconnect socket when tab closed
    socket.on('disconnect',() => {
        console.log("user disconnected: ", socket.id);

        removePlayer(socket.id); // remove from players array
        console.log("Players(after deletion) = ",getPlayers());
    });

    // start quiz (1.reset game 2.select quiz 3.add player as host 4. generate gamepin)
    socket.on('start quiz', (quiz:Quiz) => {
        cleanGame();
        selectQuiz(quiz);
        addPlayer({socketId: socket.id, host: true});
        game.gamePin = generateGamePin();
        socket.emit('route','phase-lobby')
        socket.emit('get-pin',game.gamePin)
        console.log("game = ", game);
    });

    //Add Player Name
    socket.on("add-name", (name)=>{
        name = addName(name,socket.id)
        console.log("ADD NAME",game)

    })

    
    // test: send message to client
    socket.emit('message', 'welcome to sockets');
})

