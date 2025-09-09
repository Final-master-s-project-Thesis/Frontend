import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flag.html',
  styleUrl: './flag.css',
})
export class Flag {
  @Input() countryCode!: string;

  constructor() {}
}
