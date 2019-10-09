export class ChallengeActive {
  id: number;
  opponent: string;
  opponentAvatar: string;
  user: string;
  userAvatar: string;
  criteria: string;
  target: number;
  startDate: string;
  endDate: string;
  progressDate: number;
  duration: number;
  timeElasped: number;
  timeLeft: number;
  outcome: string;
  userDetail: ChallengeActiveUser;
  opponentDetail: ChallengeActiveUser;
  pacesetterDetail: ChallengeActiveUser;
}

export class ChallengeActiveUser {
  sum: string;
  raw: number;
  diff: string;
  diffRaw: number;
  direction: string;
  completion: string;
  outcomeType: string;
  lastPulled: string;
  progress: number;
  details: Array<DateValue>;
}

export class DateValue {
  date: string;
  value: number;
}
