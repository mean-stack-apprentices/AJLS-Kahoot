import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { Player } from '../../../../../shared/models/player.model';


@Component({
  selector: 'app-phase-lobby',
  templateUrl: './phase-lobby.component.html',
  styleUrls: ['./phase-lobby.component.scss']
})
export class PhaseLobbyComponent implements OnInit {
  gamePin$: Observable<String | null>;
  players: Player[] = [];

  constructor(
    private socketService: SocketService
  ) 
  {
     this.gamePin$ = this.socketService.getGamePin();
   }

  ngOnInit(): void {
    this.socketService.getPlayersJoined().subscribe(data => this.players = data);
  }

  startGame() {
    this.socketService.goToQuestionPage();
  }

}
