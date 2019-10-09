export class AwardBadge {
  id: number;
  name: string;
  image: string;
  text: string;
  textLong: string;
  xp: number;
  awards: Array<AwardBadgeRecord>;
}

export class AwardBadgeRecord {
  date: string;
  awarded: number;
}
