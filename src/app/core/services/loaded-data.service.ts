import { Injectable } from '@angular/core';
import { Country } from '../models/country/country';
import { PlayerPartialData } from '../models/player/player';
import { Club } from '../models/club/club';
import { League } from '../models/league/league';

@Injectable({
  providedIn: 'root',
})
export class LoadedDataService {
  private countries: Country[] = [];
  private leagues: League[] = [];
  private clubs: Club[] = [];
  private playersPartial: PlayerPartialData[] = [];

  setCountries(countries: Country[]): void {
    this.countries = countries;
  }

  getCountries(): Country[] {
    return this.countries;
  }

  setLeagues(leagues: League[]): void {
    this.leagues = leagues;
  }

  getLeagues(): League[] {
    return this.leagues;
  }

  setClubs(clubs: Club[]): void {
    this.clubs = clubs;
  }

  getClubs(): Club[] {
    return this.clubs;
  }

  setPlayersPartial(players: PlayerPartialData[]): void {
    this.playersPartial = players;
  }

  getPlayersPartial(): PlayerPartialData[] {
    return this.playersPartial;
  }
}
