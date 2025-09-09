import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flag } from '../flag/flag';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-info',
  standalone: true,
  imports: [Flag, CommonModule],
  templateUrl: './player-info.html',
  styleUrls: ['./player-info.css'],
})
export class PlayerInfo {
  @Input() id!: string;
  @Input() name!: string;
  @Input() countryCode!: string;
  @Input() position!: string;
  @Input() team!: string;
  @Input() age!: number;
  @Input() league!: string;
  @Input() value!: number;
  @Input() estimatedValue!: number;
  @Input() height!: number;
  @Input() weight!: number;
  @Input() talent!: number;

  @Output() cardSelected = new EventEmitter<string>();

  onClick() {
    this.cardSelected.emit(this.id);
  }
}
