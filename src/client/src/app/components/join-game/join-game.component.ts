import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnInit {
    constructor(private socket:Socket) { }

  ngOnInit(): void {
  }

  addPlayer(name:string){
    this.socket.emit("add-name", name)
    }

}
