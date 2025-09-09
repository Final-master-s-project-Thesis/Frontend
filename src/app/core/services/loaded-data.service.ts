import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadedDataService {
  private countries: any[] = [];
  private leagues: any[] = [];
  private clubs: any[] = [];

  setCountries(countries: any[]): void {
    this.countries = countries;
  }

  getCountries(): any[] {
    return this.countries;
  }

  setLeagues(leagues: any[]): void {
    this.leagues = leagues;
  }

  getLeagues(): any[] {
    return this.leagues;
  }

  setClubs(clubs: any[]): void {
    this.clubs = clubs;
  }

  getClubs(): any[] {
    return this.clubs;
  }
}
