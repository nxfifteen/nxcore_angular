export class ChallengePve {
  id: number;
  name: string;
  description: string;
  progression: string;
  to: number;
  target: number;
  targetHuman: string;
  criteria: string;
  depth: number;
  children: Array<ChallengePve>;
  reward: ChallengePveReward;
  participation: ChallengePveParticipation;
  isCollapsed: boolean;
}

export class ChallengePveReward {
  xp: number;
  badge: string;
}

export class ChallengePveParticipation {
  progress: number;
  startDateTime: string;
  finishDateTime: string;
}
