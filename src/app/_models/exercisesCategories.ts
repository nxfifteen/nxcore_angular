import {ContributionLicense} from './contributionLicense';

export class ExercisesCategories {
  id: number;
  name: string;
  exercises: number;
  sub: Array<ExercisesSummary>;
}

export class ExercisesSummary {
  id: number;
  name: string;
  description: string;
  license: ContributionLicense;
  category: Array<string>;
  equipment: string;
  muscles: ExercisesMusclesGroups;
  resources: Array<UploadedFile>;
}

export class UploadedFile {
  name: string;
  type: string;
  path: string;
}

export class ExercisesMusclesGroups {
  front: Array<ExercisesMuscles>;
  back: Array<ExercisesMuscles>;
  front_svg: string;
  back_svg: string;
}

export class ExercisesMuscles {
  id: number;
  name: string;
  isFront: boolean;
  isPrimary: boolean;
}

