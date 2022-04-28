import { Player } from "./player.model.js";
import { Quiz } from "./quiz.model.js";

export interface Host {
    socketId: string;
    hostName?: string;
}

export interface Game{
    phases: string[];
    host: Host | null;
    players: Player[];
    quiz: Quiz | null;
    gamePin: string | null; 
}