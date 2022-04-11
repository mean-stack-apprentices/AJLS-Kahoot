import { Player } from "./player.model.js";
import { Quiz } from "./quiz.model.js";

export interface Game{
    phases: string[];
    players: Player[];
    quiz: Quiz | null;
}