export interface Player{
    socketId: string;
    playerName?: string;
    answer?: string | null;
    points?: number;
    done?: boolean;
}