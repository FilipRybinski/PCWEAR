import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('check') button!:HTMLInputElement;
  closeMenu() {
    if(this.button!=null) this.button.checked = false;
  }
}
