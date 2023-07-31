import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  closeMenu() {
    var button = document.getElementById('check') as HTMLInputElement;
    if (button != null) button.checked = false;
  }
}
