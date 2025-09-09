import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaguesService } from '../../core/services/leagues.service';
import { LoadedDataService } from '../../core/services/loaded-data.service';
import { League } from '../../core/models/league/league';
import { CommonModule } from '@angular/common';
import { CardTeam } from '../../shared/components/card-team/card-team';

@Component({
  selector: 'app-filter-leagues',
  standalone: true,
  imports: [CommonModule, CardTeam],
  templateUrl: './filter-leagues.html',
  styleUrls: ['./filter-leagues.css'],
})
export class FilterLeagues implements OnInit {
  isLoading = true;
  leagues: League[] = [];
  colors = ['#0284c7', '#16a34a', '#ea580c', '#dc2626', '#9333ea'];

  constructor(
    private router: Router,
    private leaguesService: LeaguesService,
    private loadedDataService: LoadedDataService
  ) {}

  ngOnInit() {
    this.leagues = this.loadedDataService.getLeagues();

    if (this.leagues.length == 0) {
      this.leaguesService.getLeagues().subscribe((leagues: League[]) => {
        this.leagues = leagues;
        this.loadedDataService.setLeagues(leagues);
      });
    }

    this.isLoading = false;
  }

  handleLeagueSelected(id: String) {
    this.router.navigate(['/filter-clubs'], { queryParams: { league_id: id } });
  }
}
