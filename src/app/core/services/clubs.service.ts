import { Injectable } from '@angular/core';
import { ClubsRepository } from '../respository/clubs/clubs.repository';

@Injectable({
  providedIn: 'root',
})
export class ClubsService {
  constructor(private repo: ClubsRepository) {}

  getClubs() {
    return this.repo.getClubs();
  }
}