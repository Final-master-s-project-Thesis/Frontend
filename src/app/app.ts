import { Component, signal } from '@angular/core';
import { Header } from './shared/header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [Header, RouterOutlet],
})
export class App {}
