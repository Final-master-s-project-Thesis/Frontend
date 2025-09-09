import { Club } from '../core/models/club/club';
import { League } from '../core/models/league/league';

export function getLeagueName(league_id: number, leagues: League[]): string {
  const league = leagues.find((l) => l.league_id == league_id);
  return league ? league.competition_name : 'Desconocido';
}

export function getClubName(club_id: string, clubs: Club[]): string {
  const club = clubs.find((c) => c.club_id == club_id);
  return club ? club.club_name : 'Desconocido';
}
