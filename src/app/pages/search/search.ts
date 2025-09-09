import { Component, OnInit } from '@angular/core';
import { PlayerInfo } from '../../shared/components/player-info/player-info';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PlayerService } from '../../core/services/players.service';
import { ClubsService } from '../../core/services/clubs.service';
import { CountriesService } from '../../core/services/countries.service';
import { LeaguesService } from '../../core/services/leagues.service';
import { LoadedDataService } from '../../core/services/loaded-data.service';
import { League } from '../../core/models/league/league';
import { Club } from '../../core/models/club/club';
import { Country } from '../../core/models/country/country';
import { Player } from '../../core/models/player/player';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, PlayerInfo],
  templateUrl: './search.html',
  styleUrls: ['./search.css'],
})
export class Search implements OnInit {
  isLoading: boolean = true;
  players: Player[] = [];
  countries: Country[] = [];
  clubs: Club[] = [];
  leagues: League[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService,
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

  handlePlayerSelected(player_id: string) {
    this.router.navigate(['/player', player_id]);
  }
}
