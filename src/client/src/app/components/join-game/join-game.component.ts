import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})

export class JoinGameComponent implements OnInit {

  errMsg: string | null= null;

    constructor(private socket:Socket) { }

  ngOnInit(): void {
  }

  addPlayer(name:string){
    this.socket.emit("add-name", name);
    this.socket.on("error-message", (data:string)=>{
      this.errMsg = data;
      console.log(data);
      
    })
    }
   
}
