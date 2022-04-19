import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-game-pin',
  templateUrl: './game-pin.component.html',
  styleUrls: ['./game-pin.component.scss']
})
export class GamePinComponent implements OnInit {

  msg: string | null= null;

  constructor(
    private socketService: SocketService,
    private socket:Socket
  ) { }

  ngOnInit(): void {
  }

  checkPin(pin: string) {
    this.socketService.isValidPin(pin);
    this.socket.on("message", (data:string)=>{
      this.msg = data;
      console.log(data);
  })
}
}
