import { Injectable, Injector } from '@angular/core';
import { Repository } from '../../base/repository.repository';
import { Club } from '../../models/club/club';

@Injectable({
  providedIn: 'root',
})
export class ClubsRepository extends Repository {
  constructor(protected override injector: Injector) {
    super(injector);
  }

  getClubs() {
    return this.doRequest<Club[]>('get', `/clubs/`);
  }
}
