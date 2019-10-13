export class ActivityLog {
  id: number;
  tracker: string;
  partOfDay: string;
  exerciseType: string;
  exerciseTag: string;
  date: string;
  dateFormatted: string;
  started: string;
  finished: string;
  duration: number;
  stepsTotal: number;
  steps: number;
  altitudeMax: number;
  altitudeMin: number;
  calorie: number;
  distance: number;
  speedMax: number;
  speedMean: number;
  heartRateMax: number;
  heartRateMin: number;
  heartRateMean: number;
}

export class ActivityLogNav {
  nextMonth: string;
  thisMonth: string;
  prevMonth: string;
}
