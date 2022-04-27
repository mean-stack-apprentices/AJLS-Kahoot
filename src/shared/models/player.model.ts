export interface Player{
    socketId: string;
    playerName?: string;
    host?: boolean;
    answer?: string | null;
    points?: number;
    done?: boolean;
}