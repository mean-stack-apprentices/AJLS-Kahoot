
import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from "cookie-parser";
import http from 'http';
import {Server, Socket} from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { apiRouter } from './routers/api.routes.js';
import {addName,addPlayer, cleanGame, game, generateGamePin, getPlayers, isGamePinValid, removePlayer, selectQuiz } from './game.js';
import { Quiz } from '../shared/models/quiz.model.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();
const server = http.createServer(app);
const PORT = 3501;

export const io = new Server(server,{
    cors: { origin: '*' }
});

mongoose.connect(`${process.env.MONGO_URI}`)
.then(() => {
    console.log('Connected to DB Successfully');
})
.catch(err => console.log('Failed to Connect to DB', err))


app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.get('/', function(req, res) {
   res.json({message:'test'});
});

io.on('connection', (socket) => {
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

server.listen(PORT, function() {
    console.log( `listening to localhost http://localhost:${PORT}`);
});


