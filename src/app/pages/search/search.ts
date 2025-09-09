import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PlayerInfo } from '../../shared/components/player-info/player-info';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { Filters } from '../../utils/utils';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, PlayerInfo],
  templateUrl: './search.html',
  styleUrls: ['./search.css'],
})
export class Search implements OnInit {
  isLoading: boolean = false;
  players: Player[] = [];
  countries: Country[] = [];
  clubs: Club[] = [];
  leagues: League[] = [];
  positions: string[] = [];
  selectedLeagueId: number = 0;
  showFilters: boolean = true;

  filters: Filters = {
    club_id: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clubservice: ClubsService,
    private leagueservice: LeaguesService,
    private countryservice: CountriesService,
    private playerservice: PlayerService,
    private loadedDataService: LoadedDataService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['club_id']) {
        this.filters.club_id = params['club_id'];
      } else {
        this.filters.club_id = '';
      }
    });

    this.filters.position = '';
    this.filters.country_code = '';
    this.filters.limit = 100;

    this.loadData();
  }

  ngOnDestroy() {
    this.players = [];
  }

  loadData() {
    this.isLoading = true;

    this.countries = this.loadedDataService.getCountries();
    this.clubs = this.loadedDataService.getClubs();
    this.route.queryParams.subscribe((params) => {
      if (params['club_id']) {
        this.filters.club_id = params['club_id'];
      } else {
        this.filters.club_id = '';
      }
    });
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

    this.isLoading = false;
  }

  handlePlayerSelected(player_id: string) {
    this.router.navigate(['/player', player_id]);
  }

  getPlayerData() {
    const position = this.filters.position != '' ? this.filters.position : undefined;
    const country_code = this.filters.country_code != '' ? this.filters.country_code : undefined;
    const club_id = this.filters.club_id != '' ? this.filters.club_id : undefined;

    this.playerservice
      .getPlayers(
        false,
        false,
        country_code,
        club_id,
        this.filters.age_min,
        this.filters.age_max,
        this.filters.height_min,
        this.filters.height_max,
        this.filters.weight_min,
        this.filters.weight_max,
        position,
        this.filters.market_value_max,
        this.filters.estimated_value_max,
        this.filters.salary_month_max,
        this.filters.talent_min
      )
      .subscribe((players: Player[]) => {
        this.players = players;
        this.isLoading = false;
        this.cd.detectChanges();
      });
  }

  searchPlayers() {
    this.isLoading = true;
    this.getPlayerData();
    this.toggleFilters();
  }

  limpiarFiltros() {
    this.filters = {};
    this.filters.position = '';
    this.filters.country_code = '';
    this.filters.club_id = '';
  }

  selectedClub(id: string) {
    this.filters.club_id = id;
  }

  getTeamByCode(code: string) {
    return this.clubs.find((club) => club.club_id === code)?.club_name || 'Unknown';
  }

  getLeagueByClubId(club_id: string) {
    const club = this.clubs.find((c) => c.club_id === club_id);
    return club
      ? this.leagues.find((l) => l.league_id === club.league_id)?.competition_name || 'Unknown'
      : 'Unknown';
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
}
