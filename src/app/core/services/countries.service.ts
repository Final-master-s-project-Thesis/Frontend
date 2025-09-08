import { Injectable } from '@angular/core';
import { CountriesRepository } from '../respository/countries/countries,repository';

@Injectable({
  providedIn: 'root',
})
export class CompareService {
  constructor(private repo: CountriesRepository) {}

  getCountries() {
    return this.repo.getCountries();
  }
}