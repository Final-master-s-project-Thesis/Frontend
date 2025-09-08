import { DefensiveStats } from "./defensive-stats";
import { DuelStats } from "./duel-stats";
import { GoalkeepingStats } from "./goalkeeping_stats";
import { PassingStats } from "./passing-stats";
import { PossessionStats } from "./possession-stats";
import { ShootingStats } from "./shooting-stats";
import { ShotsGoalsCreationStats } from "./shots-goals-creation-stats";

export interface PerformanceData {
    shootingStats?: ShootingStats;
    possessionStats?: PossessionStats;
    passingStats?: PassingStats;
    duelStats?: DuelStats;
    shotsGoalsCreationStats?: ShotsGoalsCreationStats;
    defensiveStats?: DefensiveStats;
    goalkeepingStats?: GoalkeepingStats;
}