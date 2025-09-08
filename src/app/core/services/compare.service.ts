import { Injectable } from '@angular/core';
import { CompareRepository } from '../respository/compare/compare.repository';

@Injectable({
  providedIn: 'root',
})
export class CompareService {
  constructor(private repo: CompareRepository) {}

  getComparisons(id1: string, id2: string) {
    return this.repo.getPlayersToCompare(id1, id2);
  }
}