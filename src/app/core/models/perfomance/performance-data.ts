import { DefensiveStats } from './defensive-stats';
import { DuelStats } from './duel-stats';
import { GoalkeepingStats } from './goalkeeping_stats';
import { PassingStats } from './passing-stats';
import { PossessionStats } from './possession-stats';
import { ShootingStats } from './shooting-stats';
import { ShotsGoalsCreationStats } from './shots-goals-creation-stats';

export interface PerformanceData {
  shooting_stats?: ShootingStats;
  possession_stats?: PossessionStats;
  passing_stats?: PassingStats;
  duel_stats?: DuelStats;
  shots_goals_creation_stats?: ShotsGoalsCreationStats;
  defensive_stats?: DefensiveStats;
  goalkeeping_stats?: GoalkeepingStats;
}
