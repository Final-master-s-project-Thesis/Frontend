import { Injectable, Injector } from '@angular/core';
import { Repository } from '../../base/repository.repository';
import { League } from '../../models/league/league';

@Injectable({
  providedIn: 'root',
})
export class LeagueRepository extends Repository {
  constructor(protected override injector: Injector) {
    super(injector);
  }

  getLeagues() {
    return this.doRequest<League[]>('get', `/leagues/`);
  }
}
