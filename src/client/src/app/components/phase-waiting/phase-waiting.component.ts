import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs/internal/Observable';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-phase-waiting',
  templateUrl: './phase-waiting.component.html',
  styleUrls: ['./phase-waiting.component.scss']
})
export class PhaseWaitingComponent implements OnInit {
  message$:Observable<any>;

  constructor(
    private socketservice: SocketService
  ) 
  {
    this.message$ = this.socketservice.getPlayerJoinMsg();
  }

  ngOnInit(): void {
  }
  
}
