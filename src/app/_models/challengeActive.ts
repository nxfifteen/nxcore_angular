export class ChallengeActive {
  opponent: string;
  opponentAvatar: string;
  criteria: string;
  target: number;
  startDate: string;
  endDate: string;
  progressDate: number;
  duration: number;
  outcome: string;
  userDetail: ChallengeActiveUser;
  opponentDetail: ChallengeActiveUser;
}

export class ChallengeActiveUser {
  sum: string;
  completion: string;
  outcomeType: string;
  lastPulled: string;
}
