import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
      menu.classList.toggle('hidden'); // toggles between hidden and flex (showing the menu)
    }
  }
}
