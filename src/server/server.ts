
import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from "cookie-parser";
import http from 'http';
import {Server, Socket} from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { apiRouter } from './routers/api.routes.js';

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
})

server.listen(PORT, function() {
    console.log( `listening to localhost http://localhost:${PORT}`);
});
