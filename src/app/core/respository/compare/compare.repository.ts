import { Injectable, Injector } from '@angular/core';
import { Repository } from '../../base/repository.repository';
import { Player } from '../../models/player/player';

@Injectable({
  providedIn: 'root',
})
export class CompareRepository extends Repository {
  constructor(protected override injector: Injector) {
    super(injector);
  }

  getPlayersToCompare(player_id1: string, player_id2: string) {
    return this.doRequest<Player[]>('get', `/compare/`, {
      params: { player_id1: player_id1, player_id2: player_id2 },
    });
  }
}
