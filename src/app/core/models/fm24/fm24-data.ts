import { DeadBallStats } from './dead-ball-stats';
import { GoalkeeperStats } from './goalkeeper-stats';
import { MentalStats } from './mental-stats';
import { PhysicalStats } from './physisical-stats';
import { TechnicalStats } from './technical-stats';

export interface FM24Data {
  physical_stats?: PhysicalStats;
  technical_stats?: TechnicalStats;
  dead_ball_stats?: DeadBallStats;
  mental_stats?: MentalStats;
  goalkeeper_stats?: GoalkeeperStats;
}
