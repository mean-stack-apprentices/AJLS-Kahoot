import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  socketMessage$: Observable<string>;

  constructor(
    private socket: Socket,
    private socketService: SocketService
  ) 
  { 
    this.socketMessage$ = this.socketService.getMessage();
  }

  ngOnInit(): void {
  }

}
