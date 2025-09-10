import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PlayerAllData, PlayerPartialData } from '../../core/models/player/player';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { formatName, formatValueMoney } from '../../utils/utils';
import { tap, forkJoin } from 'rxjs';
import { Club } from '../../core/models/club/club';
import { Country } from '../../core/models/country/country';
import { League } from '../../core/models/league/league';
import { ClubsService } from '../../core/services/clubs.service';
import { CountriesService } from '../../core/services/countries.service';
import { LeaguesService } from '../../core/services/leagues.service';
import { LoadedDataService } from '../../core/services/loaded-data.service';
import { PlayerService } from '../../core/services/players.service';
import { CompareService } from '../../core/services/compare.service';

@Component({
  standalone: true,
  selector: 'app-compare',
  imports: [CommonModule, FormsModule],
  templateUrl: './compare.html',
  styleUrl: './compare.css',
})
export class Compare implements OnInit {
  selectedPlayerId1: string = '';
  selectedPlayerId2: string = '';
  playerFormateValue1: string = '';
  playerFormateValue2: string = '';
  playerFormateEstimated1: string = '';
  playerFormateEstimated2: string = '';
  playerFormateSalary1: string = '';
  playerFormateSalary2: string = '';
  playersPartial: PlayerPartialData[] = [];
  countries: Country[] = [];
  clubs: Club[] = [];
  leagues: League[] = [];
  players: PlayerAllData[] = [];
  isLoading: boolean = false;

  toggles = {
    showSelect: true,
    showGeneral: false,

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
    private compareservice: CompareService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.selectedPlayerId1 = '';
    this.selectedPlayerId2 = '';

    this.loadInitialData();
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
    if (
      this.selectedPlayerId1 != '' &&
      this.selectedPlayerId2 != '' &&
      this.selectedPlayerId1 != this.selectedPlayerId2
    ) {
      this.players = [];
      this.compareservice.getComparisons(this.selectedPlayerId1, this.selectedPlayerId2).subscribe({
        next: (data) => {
          this.players = data;

          console.log(this.players);

          this.playerFormateValue1 = formatValueMoney(this.players[0].player.market_value);
          this.playerFormateValue2 = formatValueMoney(this.players[1].player.market_value);
          this.playerFormateEstimated1 = formatValueMoney(this.players[0].player.estimated_value);
          this.playerFormateEstimated2 = formatValueMoney(this.players[1].player.estimated_value);
          this.playerFormateSalary1 = formatValueMoney(this.players[0].player.salary_month);
          this.playerFormateSalary2 = formatValueMoney(this.players[1].player.salary_month);

          this.toggles.showSelect = false;
          this.isLoading = false;
          this.cd.detectChanges();
        },
      });
    }
  }

  formatName(name: string): string {
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
}
