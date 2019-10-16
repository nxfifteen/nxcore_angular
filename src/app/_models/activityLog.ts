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
  durationTotal: number;
  stepsTotal: number;
  steps: number;
  altitudeMax: number;
  altitudeMin: number;
  altitudeGain: number;
  calorie: number;
  calorieTotal: number;
  distance: number;
  distanceTotal: number;
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

export class ActivityLocationData {
  start_time: string;
  latitude: number;
  longitude: number;
}
