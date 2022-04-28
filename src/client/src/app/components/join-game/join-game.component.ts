import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss'],
})
export class JoinGameComponent implements OnInit {
  errMsg$!: Observable<string>;

  constructor(
    private socketService: SocketService
  ) 
  {}

  ngOnInit(): void {}

  addPlayer(name: string) {
    if (name) {
      this.socketService.addPlayerName(name);

      this.errMsg$ = this.socketService.getErrorMessage();
    }
    else {
      alert("Please enter a name");
    }
  }
}
