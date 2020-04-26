import {TeamUser} from './team-user';

export class Team {
  id: number;
  name: string;
  coach: TeamUser;
  teamAvgScore: number;
}
