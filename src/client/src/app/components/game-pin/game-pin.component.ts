import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-game-pin',
  templateUrl: './game-pin.component.html',
  styleUrls: ['./game-pin.component.scss']
})
export class GamePinComponent implements OnInit {

  constructor(
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
  }

  checkPin(pin: string) {
    this.socketService.isValidPin(pin);
  }
}
