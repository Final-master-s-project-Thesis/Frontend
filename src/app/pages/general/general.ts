import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardTeam } from '../../shared/components/card-team/card-team';
import { ClubsService } from '../../core/services/clubs.service';
import { LeaguesService } from '../../core/services/leagues.service';
import { CountriesService } from '../../core/services/countries.service';
import { Country } from '../../core/models/country/country';
import { Club } from '../../core/models/club/club';
import { League } from '../../core/models/league/league';
import { LoadedDataService } from '../../core/services/loaded-data.service';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [CommonModule, CardTeam],
  templateUrl: './general.html',
  styleUrls: ['./general.css'],
})
export class General implements OnInit {
  isLoading: boolean = true;
  countries: Country[] = [];
  clubs: Club[] = [];
  leagues: League[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clubservice: ClubsService,
    private leagueservice: LeaguesService,
    private countryservice: CountriesService,
    private loadedDataService: LoadedDataService
  ) {}

  ngOnInit() {
    this.loadData();
    this.isLoading = false;
  }

  loadData() {
    this.countries = this.loadedDataService.getCountries();
    this.clubs = this.loadedDataService.getClubs();
    this.leagues = this.loadedDataService.getLeagues();

    if (this.countries.length == 0) {
      this.countryservice.getCountries().subscribe((countries: Country[]) => {
        this.countries = countries;
        this.loadedDataService.setCountries(countries);
      });
    }

    if (this.clubs.length == 0) {
      this.clubservice.getClubs().subscribe((clubs: Club[]) => {
        this.clubs = clubs;
        this.loadedDataService.setClubs(clubs);
      });
    }

    if (this.leagues.length == 0) {
      this.leagueservice.getLeagues().subscribe((leagues: League[]) => {
        this.leagues = leagues;
        this.loadedDataService.setLeagues(leagues);
      });
    }
  }

  navigateToPlayer() {
    this.router.navigate(['/player']);
  }

  navigateToFilterLeague() {
    this.router.navigate(['/filter-leagues']);
  }

  navigateToFilterClub() {
    this.router.navigate(['/filter-clubs']);
  }

  navigateToSearch() {
    this.router.navigate(['/search']);
  }

  handlePlayerSelected(id: string) {
    console.log('ID del jugador:', id);
    this.router.navigate(['/player', id]);
  }

  handleLeagueSelected(id: string) {
    console.log('ID de la liga:', id);
    this.router.navigate(['/filter-clubs'], { queryParams: { league_id: id } });
  }

  handleClubSelected(id: string) {
    console.log('ID del club:', id);
    this.router.navigate(['/search'], { queryParams: { club_id: id } });
  }
}
