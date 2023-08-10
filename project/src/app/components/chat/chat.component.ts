import { Component } from '@angular/core';
import { HubService } from 'src/app/services/hub.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  isVisible: boolean = false;
  constructor(public _hubService: HubService) {

  }
  openChat() {
    if (!this._hubService.isSuccessfulyConnected) {
      this._hubService.connect();
    }
    this.isVisible = true;
  }
  closeChat() {
    this._hubService.disconnect();
    this.isVisible = false;
  }
  minimalizeChat() {
    this.isVisible = false;
  }
}
