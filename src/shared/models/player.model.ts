export interface Player{
    socketId: string;
    playerName?: string;
    host?: boolean;
    answer?: string;
    points?: number;
    done?: boolean;
}