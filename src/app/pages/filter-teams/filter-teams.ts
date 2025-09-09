import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { League } from '../../core/models/league/league';
import { LoadedDataService } from '../../core/services/loaded-data.service';
import { Club } from '../../core/models/club/club';
import { ClubsService } from '../../core/services/clubs.service';
import { LeaguesService } from '../../core/services/leagues.service';
import { CardTeam } from '../../shared/components/card-team/card-team';
import { CommonModule } from '@angular/common';
import { get } from 'http';

@Component({
  selector: 'app-filter-teams',
  standalone: true,
  imports: [CommonModule, CardTeam],
  templateUrl: './filter-teams.html',
  styleUrl: './filter-teams.css',
})
export class FilterTeams {
  isLoading = true;
  league_name: string = '';
  leagues_id: number = 0;
  clubs: Club[] = [];
  leagues: League[] = [];
  colors = ['#0284c7', '#16a34a', '#ea580c', '#dc2626', '#9333ea'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clubsService: ClubsService,
    private leaguesService: LeaguesService,
    private loadedDataService: LoadedDataService
  ) {}

  ngOnInit() {
    this.clubs = this.loadedDataService.getClubs();
    if (this.clubs.length == 0) {
      this.clubsService.getClubs().subscribe((clubs: Club[]) => {
        this.clubs = clubs;
        this.loadedDataService.setClubs(clubs);
      });
    }

    this.leagues = this.loadedDataService.getLeagues();
    if (this.leagues.length == 0) {
      this.leaguesService.getLeagues().subscribe((leagues: League[]) => {
        this.leagues = leagues;
        this.loadedDataService.setLeagues(leagues);
      });
    }

    this.route.queryParams.subscribe((params) => {
      if (params['league_id']) {
        this.leagues_id = parseInt(params['league_id']);
        this.league_name = this.getLeagueName(this.leagues_id);
        this.clubs = this.clubs.filter((club) => club.league_id == this.leagues_id);
      }
    });

    this.isLoading = false;
  }

  handleClubSelected(id: String) {
    this.router.navigate(['/search'], { queryParams: { club_id: id } });
  }

  getLeagueName(league_id: number): string {
    const league = this.leagues.find((l) => l.league_id == league_id);
    return league ? league.competition_name : 'Desconocida';
  }
}
