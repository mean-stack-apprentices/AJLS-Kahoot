import { Player } from "./player.model";
import { Quiz } from "./quiz.model";

export interface Game{
    phases:string[];
    player:Player[];
    quiz:Quiz[] | null;
}