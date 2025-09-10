import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  standalone: true,
})
export class Header {
  isMenuOpen = false; // 🔹 define la propiedad
  isDarkMode = false;
  private isBrowser: boolean;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    // Cargar preferencia solo en navegador
    const saved = this.isBrowser ? localStorage.getItem('theme') : null;
    this.isDarkMode = saved === 'dark';
    if (this.isBrowser) this.applyTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isBrowser) {
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
    this.applyTheme();
  }

  private applyTheme() {
    if (!this.isBrowser) return;
    const root = document.documentElement;
    if (this.isDarkMode) root.classList.add('dark-mode');
    else root.classList.remove('dark-mode');
  }
}
