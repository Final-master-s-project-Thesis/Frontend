import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInfoReduced } from './player-info-reduced';

describe('PlayerInfoReduced', () => {
  let component: PlayerInfoReduced;
  let fixture: ComponentFixture<PlayerInfoReduced>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerInfoReduced]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerInfoReduced);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
