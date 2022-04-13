
import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from "cookie-parser";
import http from 'http';
import {Server, Socket} from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { apiRouter } from './routers/api.routes.js';
import { addPlayer, game, getPlayers, removePlayer, setHost } from './game.js';
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

    addPlayer({socketId: socket.id});
    console.log("Players = ",getPlayers());

    // disconnect socket when tab closed
    socket.on('disconnect',() => {
        console.log("user disconnected: ", socket.id);

        removePlayer(socket.id); // remove from players array
        console.log("Players(after deletion) = ",getPlayers());
    });

    // set host to true
    socket.on('start quiz', (quiz:Quiz) => {
        console.log("set host ",socket.id);
        setHost(socket.id,quiz);
        console.log("Players(after set host) = ",getPlayers());
        console.log("START GAME", JSON.stringify(game, null, 4))
    })

    // test: send message to client
    socket.emit('message','Instructions: To create your own Kahoot quiz, log in and click create quiz. To start a new game, go to quiz list and click the Start button.')

    
})

server.listen(PORT, function() {
    console.log( `listening to localhost http://localhost:${PORT}`);
});
