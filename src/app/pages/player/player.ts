import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Club } from '../../core/models/club/club';
import { Country } from '../../core/models/country/country';
import { League } from '../../core/models/league/league';
import { PlayerPartialData, PlayerAllData } from '../../core/models/player/player';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClubsService } from '../../core/services/clubs.service';
import { CountriesService } from '../../core/services/countries.service';
import { LeaguesService } from '../../core/services/leagues.service';
import { LoadedDataService } from '../../core/services/loaded-data.service';
import { PlayerService } from '../../core/services/players.service';
import { tap, forkJoin } from 'rxjs';
import { formatName, formatValueMoney } from '../../utils/utils';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-player',
  imports: [CommonModule, FormsModule],
  templateUrl: './player.html',
  styleUrls: ['./player.css'],
})
export class Player implements OnInit {
  selectedPlayerId: string = '';
  playerFormateValue: string = '';
  playerFormateEstimated: string = '';
  playerFormateSalary: string = '';

  countries: Country[] = [];
  clubs: Club[] = [];
  leagues: League[] = [];
  player?: PlayerAllData;
  isLoading: boolean = false;
  error: boolean = false;

  toggles = {
    showSelect: true,
    showGeneral: true,

    showGoalkeeperFM: false,
    showPhysicalFM: false,
    showMentalFM: false,
    showTechnicalFM: false,
    showDeadBallFM: false,

    showDefensive: false,
    showDuel: false,
    showGoalkeeping: false,
    showPassing: false,
    showPossession: false,
    showShooting: false,
    showCreationActions: false,
  };

  constructor(
    private clubservice: ClubsService,
    private leagueservice: LeaguesService,
    private countryservice: CountriesService,
    private playerservice: PlayerService,
    private loadedDataService: LoadedDataService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadInitialData();

    this.route.paramMap.subscribe((params) => {
      const playerId = params.get('id');
      if (playerId) {
        this.selectedPlayerId = playerId;
      }
    });

    this.loadPlayersData(this.selectedPlayerId);
  }

  formatName(name: string | undefined): string {
    if (name == undefined) return 'NA';

    return formatName(name);
  }

  getLeagueName(club_id: string | undefined): string {
    if (club_id == null) return 'NA';

    const club = this.clubs.find((c) => String(c.club_id) === String(club_id));
    if (!club) return 'NA';

    const league = this.leagues.find((l) => String(l.league_id) === String(club.league_id));
    return league ? league.competition_name : 'NA';
  }

  getClubName(club_id: string | undefined): string {
    const club = this.clubs.find((c) => c.club_id === club_id);
    return club ? club.club_name : 'NA';
  }

  toggle(key: keyof typeof this.toggles): void {
    this.toggles[key] = !this.toggles[key];
  }

  private loadInitialData() {
    this.isLoading = true;

    const countries = this.loadedDataService.getCountries();
    const clubs = this.loadedDataService.getClubs();
    const leagues = this.loadedDataService.getLeagues();

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

  private loadPlayersData(player_id: string) {
    this.isLoading = true;

    this.playerservice.getPlayerAllData(player_id).subscribe({
      next: (data) => {
        this.player = data;
        console.log(this.player);

        this.playerFormateValue = formatValueMoney(this.player.player.market_value);
        this.playerFormateEstimated = formatValueMoney(this.player.player.estimated_value);
        this.playerFormateSalary = formatValueMoney(this.player.player.salary_month);

        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error loading player data:', error);
        this.isLoading = false;
        this.error = true;
        this.cd.detectChanges();
      },
    });
  }
}
