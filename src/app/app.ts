import { Component, signal } from '@angular/core';
import { Header } from './shared/header/header';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [Header],
})
export class App {}
