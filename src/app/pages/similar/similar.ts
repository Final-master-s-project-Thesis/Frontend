import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlayerInfo } from '../../shared/components/player-info/player-info';
import { League } from '../../core/models/league/league';
import { Club } from '../../core/models/club/club';
import { Country } from '../../core/models/country/country';
import { Filters, formatName, uniquePositions } from '../../utils/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubsService } from '../../core/services/clubs.service';
import { CountriesService } from '../../core/services/countries.service';
import { LeaguesService } from '../../core/services/leagues.service';
import { LoadedDataService } from '../../core/services/loaded-data.service';
import { PlayerService } from '../../core/services/players.service';
import { Player, PlayerPartialData } from '../../core/models/player/player';
import { tap, forkJoin } from 'rxjs';

@Component({
  selector: 'app-similar',
  standalone: true,
  imports: [CommonModule, FormsModule, PlayerInfo],
  templateUrl: './similar.html',
  styleUrls: ['./similar.css'],
})
export class Similar implements OnInit {
  isLoading = false;
  players: Player[] = [];
  playersPartial: PlayerPartialData[] = [];
  countries: Country[] = [];
  clubs: Club[] = [];
  leagues: League[] = [];
  positions: string[] = [];
  showFilters: boolean = true;
  selectedPlayerId: string = '';

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
    this.loadInitialData();

    this.filters.position = '';
    this.filters.country_code = '';
    this.filters.limit = 100;
    this.positions = uniquePositions;
  }

  private loadInitialData() {
    this.isLoading = true;

    const countries = this.loadedDataService.getCountries();
    const clubs = this.loadedDataService.getClubs();
    const leagues = this.loadedDataService.getLeagues();
    const playersPartial = this.loadedDataService.getPlayersPartial();

    const observables = [];

    if (countries.length === 0) {
      observables.push(
        this.countryservice.getCountries().pipe(
          tap((countries: Country[]) => {
            this.countries = countries;
            this.loadedDataService.setCountries(countries);
          })
        )
      );
    } else {
      this.countries = countries;
    }

    if (clubs.length === 0) {
      observables.push(
        this.clubservice.getClubs().pipe(
          tap((clubs: Club[]) => {
            this.clubs = clubs;
            this.loadedDataService.setClubs(clubs);
          })
        )
      );
    } else {
      this.clubs = clubs;
    }

    if (leagues.length === 0) {
      observables.push(
        this.leagueservice.getLeagues().pipe(
          tap((leagues: League[]) => {
            this.leagues = leagues;
            this.loadedDataService.setLeagues(leagues);
          })
        )
      );
    } else {
      this.leagues = leagues;
    }

    if (playersPartial.length === 0) {
      observables.push(
        this.playerservice.getPlayers(true, false).pipe(
          tap((players: PlayerPartialData[]) => {
            this.playersPartial = players;
            this.playersPartial.sort((a, b) => a.name.localeCompare(b.name));
            this.loadedDataService.setPlayersPartial(players);
          })
        )
      );
    } else {
      this.playersPartial = playersPartial;
      this.playersPartial.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (observables.length > 0) {
      forkJoin(observables).subscribe({
        complete: () => {
          this.isLoading = false;
          this.cd.detectChanges();
        },
      });
    } else {
      this.isLoading = false;
      this.cd.detectChanges();
    }
  }

  searchPlayers() {
    this.isLoading = true;
    this.getSimilarPlayers();
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

  formatName(name: string): string {
    return formatName(name);
  }

  handlePlayerSelected(player_id: string) {
    console.log('ID del jugador:', player_id);
    this.router.navigate(['/player', player_id]);
  }

  getSimilarPlayers() {
    const position = this.filters.position != '' ? this.filters.position : undefined;
    const country_code = this.filters.country_code != '' ? this.filters.country_code : undefined;
    const club_id = this.filters.club_id != '' ? this.filters.club_id : undefined;

    const market_value_max = this.filters.market_value_max
      ? this.filters.market_value_max * 1000000
      : undefined;
    const estimated_value_max = this.filters.estimated_value_max
      ? this.filters.estimated_value_max * 1000000
      : undefined;

    this.playerservice
      .getPlayerSimilar(
        this.selectedPlayerId,
        country_code,
        club_id,
        this.filters.age_min,
        this.filters.age_max,
        this.filters.height_min,
        this.filters.height_max,
        this.filters.weight_min,
        this.filters.weight_max,
        position,
        market_value_max,
        estimated_value_max,
        this.filters.salary_month_max,
        this.filters.talent_min
      )
      .subscribe((players: Player[]) => {
        this.players = players;
        this.isLoading = false;
        this.cd.detectChanges();
        this.isLoading = false;
      });
  }
}
