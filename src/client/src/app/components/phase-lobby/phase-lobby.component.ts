import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-phase-lobby',
  templateUrl: './phase-lobby.component.html',
  styleUrls: ['./phase-lobby.component.scss']
})
export class PhaseLobbyComponent implements OnInit {
  gamePin$: Observable<String | null>;
  players: any = [];

  constructor(private socket:Socket) {
     this.gamePin$ = this.socket.fromEvent<string>('get-pin')

     this.socket.fromEvent('player joined').subscribe(data => {
       this.players = data;
       this.players = this.players.filter((player: { host: any; }) => !player.host)
     })
   }

  ngOnInit(): void {
  }


}
