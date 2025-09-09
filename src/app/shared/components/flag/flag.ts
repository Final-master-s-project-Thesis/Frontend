import { Component, Input, OnInit } from '@angular/core';
import { iso3to2 } from '../../../utils/countries';
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
  countryCode2letter!: string;

  constructor() {
    this.countryCode2letter = iso3to2[this.countryCode] || 'es';
  }

  getFlagClass(): string {
    return `fi fi-${this.countryCode2letter.toLowerCase()}`;
  }
}
