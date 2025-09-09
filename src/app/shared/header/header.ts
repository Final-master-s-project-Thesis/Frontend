import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  standalone: true,
})
export class Header {
  isMenuOpen = false; // 🔹 define la propiedad

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
