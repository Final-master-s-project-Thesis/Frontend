import { Injectable, Injector } from '@angular/core';
import { Repository } from '../../base/repository.repository';
import { Player } from '../../models/player/player';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PlayerRepository extends Repository {
  constructor(protected override injector: Injector) {
    super(injector);
  }

  getPlayers(filter?: Params) {
    return this.doRequest<Player[]>('get', `/players/`, { params: filter });
  }

  getPlayerById(id: string) {
    return this.doRequest<Player>('get', `/players/${id}/`);
  }

  getPlayerAllData(id: string) {
    return this.doRequest<Player>('get', `/players/${id}/full_data/`);
  }

  getPlayerFMData(id: string) {
    return this.doRequest<Player>('get', `/players/${id}/fm24_data/`);
  }

  getPlayerPerformance(id: string) {
    return this.doRequest<any>('get', `/players/${id}/performance/`);
  }

  getPlayerSimilar(id: string, filter?: Params) {
    return this.doRequest<Player[]>('get', `/players/${id}/similar/`, { params: filter });
  }
}
