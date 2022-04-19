import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-phase-waiting',
  templateUrl: './phase-waiting.component.html',
  styleUrls: ['./phase-waiting.component.scss']
})
export class PhaseWaitingComponent implements OnInit {
  player$:Observable<String | null>

  constructor(private socket:Socket) {
    this.player$ = this.socket.fromEvent<string>('get-player')
  }

  ngOnInit(): void {
  }


}
