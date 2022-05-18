import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { apiRouter } from './routers/api.routes.js';
import { app, server } from './serverConfig.js';

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 3501;
const clientPath = path.join(__dirname, '/dist/client');

mongoose.connect(`${process.env.MONGO_URI}`)
.then(() => {
    console.log('Connected to DB Successfully');
})
.catch(err => console.log('Failed to Connect to DB', err))


app.use(cookieParser());
app.use(cors(
    {credentials: true,
    origin: ['http://localhost:4200']
    },
));
app.use(express.json());
app.use(express.static(clientPath));

app.use('/api', apiRouter);

app.get('/', function(req, res) {
   res.sendFile('../');
});

server.listen(PORT, function() {
    console.log( `listening to localhost http://localhost:${PORT}`);
});  
  

