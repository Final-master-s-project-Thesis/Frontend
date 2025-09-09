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

export function formatName(name: string): string {
  const splits = name.split(' ');
  let final_name = '';
  for (const sp of splits) {
    final_name += sp.charAt(0).toUpperCase() + sp.slice(1) + ' ';
  }
  return final_name.trim();
}

export function formatValueMoney(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M €`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K €`;
  } else {
    return `${value} €`;
  }
}

export interface Filters {
  reduced_data?: boolean;
  all_data?: boolean;
  country_code?: string;
  club_id?: string;
  age_min?: number;
  age_max?: number;
  height_min?: number;
  height_max?: number;
  weight_min?: number;
  weight_max?: number;
  position?: string;
  market_value_max?: number;
  estimated_value_max?: number;
  salary_month_max?: number;
  talent_min?: number;
  limit?: number;
}
