import { DeadBallStats } from "./dead-ball-stats";
import { GoalkeeperStats } from "./goalkeeper-stats";
import { MentalStats } from "./mental-stats";
import { PhysicalStats } from "./physisical-stats";
import { TechnicalStats } from "./technical-stats";

export interface FM24Data {
    physicalStats: PhysicalStats;
    technicalStats: TechnicalStats;
    deadBallStats: DeadBallStats;
    mentalStats: MentalStats;
    goalkeeperStats: GoalkeeperStats;
}