import { Injectable, Injector } from '@angular/core';
import { Repository } from '../../base/repository.repository';
import { Country } from '../../models/country/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesRepository extends Repository {
  constructor(protected override injector: Injector) {
    super(injector);
  }

  getCountries() {
    return this.doRequest<Country[]>('get', `/countries`);
  }
}