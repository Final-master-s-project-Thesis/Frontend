import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'card-team',
  templateUrl: './card-team.html',
  styleUrls: ['./card-team.css'],
  imports: [CommonModule],
})
export class CardTeam {
  @Input() name: string = 'Premier League';
  @Input() subname: string = 'Inglaterra';
  @Input() data: string = '20 partidos';
  @Input() color: string = 'blue';
  @Input() id: string = '';

  @Output() cardSelected = new EventEmitter<string>();

  onClick() {
    this.cardSelected.emit(this.id);
  }
}
