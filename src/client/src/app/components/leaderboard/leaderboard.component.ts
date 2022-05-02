import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { Player } from '../../../../../shared/models/player.model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  players: Player[] = [];
  isHost: boolean = false ;

  constructor(
    private socketService: SocketService
  ) 
  {
    this.socketService.checkIfHost();
    this.socketService.isHost().subscribe(data => this.isHost = data); 
  }

  ngOnInit(): void {
    this.socketService.requestScores();
    this.socketService.getScores().subscribe(data => {
      this.players = this.sortPlayersByScores(data);
    });
  }

  sortPlayersByScores(players: Player[]) {
    let plyrArr = players.sort( ({points: a},{points: b}) => b!-a!);
    return plyrArr;
  }

}
