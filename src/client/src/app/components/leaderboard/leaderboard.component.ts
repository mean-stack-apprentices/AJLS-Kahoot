import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketService } from 'src/app/services/socket.service';
import { Player } from '../../../../../shared/models/player.model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  player: null | Player = null;
  players: Player[] = [];
  constructor(private socket: Socket,
              private socketService: SocketService) {}

  ngOnInit(): void {
    this.socket.emit('player-answered');
    this.socket.on('player-answered', (player: any) => {
      console.log(player);
      this.player = player;
    });

    this.socketService.getPlayersAnswered().subscribe(data => this.players = data);
  }
}
