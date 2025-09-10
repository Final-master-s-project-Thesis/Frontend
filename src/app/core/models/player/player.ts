import { FM24Data } from '../fm24/fm24-data';
import { PerformanceData } from '../perfomance/performance-data';

export interface Player {
  player_id: string;
  name: string;
  club_id: string;
  type_player: number;
  country_code: string;
  age: number;
  position: string;
  height: number;
  weight: number;
  talent: number;
  market_value: number;
  estimated_value: number;
  salary_month: number;
}

export interface PlayerAllData {
  player: Player;
  fm24_data?: FM24Data;
  performance_data?: PerformanceData;
}

export interface PlayerPartialData {
  player_id: string;
  name: string;
  age: number;
  club_name: string;
  country_name: string;
}
