import { Component } from '@angular/core';
import { HubService } from 'src/app/services/hub.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  constructor(public _hubService: HubService) {

  }
  isVisible: boolean = false;
  openChat() {
    this._hubService.connect();
    this.isVisible = true;
  }
  closeChat() {
    this._hubService.disconnect();
    this.isVisible = false;
  }
}
