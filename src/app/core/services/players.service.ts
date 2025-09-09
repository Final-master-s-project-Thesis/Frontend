import { Injectable } from '@angular/core';
import { PlayerRepository } from '../respository/players/players.repository';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private repo: PlayerRepository) {}

  getPlayers(
    reduced_data?: boolean,
    all_data?: boolean,
    country_code?: string,
    club_id?: string,
    age_min?: number,
    age_max?: number,
    height_min?: number,
    height_max?: number,
    weight_min?: number,
    weight_max?: number,
    position?: string,
    market_value_max?: number,
    estimated_value_max?: number,
    salary_month_max?: number,
    talent_min?: number,
    limit?: number
  ) {
    const filter: Params = {
      reduced_data,
      all_data,
      country_code,
      club_id,
      age_min,
      age_max,
      height_min,
      height_max,
      weight_min,
      weight_max,
      position,
      market_value_max,
      estimated_value_max,
      salary_month_max,
      talent_min,
      limit,
    };

    // Elimina los filtros cuyo valor sea undefined
    Object.keys(filter).forEach((key) => filter[key] === undefined && delete filter[key]);

    return this.repo.getPlayers(filter);
  }

  getPlayerById(id: string) {
    return this.repo.getPlayerById(id);
  }

  getPlayerAllData(id: string) {
    return this.repo.getPlayerAllData(id);
  }

  getPlayerFMData(id: string) {
    return this.repo.getPlayerFMData(id);
  }

  getPlayerPerformance(id: string) {
    return this.repo.getPlayerPerformance(id);
  }

  getPlayerSimilar(
    id: string,
    country_code?: string,
    club_id?: string,
    age_min?: number,
    age_max?: number,
    height_min?: number,
    height_max?: number,
    weight_min?: number,
    weight_max?: number,
    position?: string,
    market_value_max?: number,
    estimated_value_max?: number,
    salary_month_max?: number,
    talent_min?: number
  ) {
    const filter: Params = {
      country_code,
      club_id,
      age_min,
      age_max,
      height_min,
      height_max,
      weight_min,
      weight_max,
      position,
      market_value_max,
      estimated_value_max,
      salary_month_max,
      talent_min,
    };

    // Elimina los filtros cuyo valor sea undefined
    Object.keys(filter).forEach((key) => filter[key] === undefined && delete filter[key]);

    return this.repo.getPlayerSimilar(id, filter);
  }
}
