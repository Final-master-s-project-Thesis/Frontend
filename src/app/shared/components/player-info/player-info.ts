import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formatValueMoney } from '../../../utils/utils';
import { Flag } from '../flag/flag';

@Component({
  selector: 'app-player-info',
  standalone: true,
  imports: [CommonModule, Flag],
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

  formatValueMoney(value: number): string {
    return formatValueMoney(value);
  }
}
