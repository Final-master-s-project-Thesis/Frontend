import { Injectable } from '@angular/core';
import { LeagueRepository } from '../respository/leagues/leagues.repository';

@Injectable({
  providedIn: 'root',
})
export class LeaguesService {
  constructor(private repo: LeagueRepository) {}

  getLeagues() {
    return this.repo.getLeagues();
  }
}