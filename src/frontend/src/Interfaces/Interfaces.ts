export interface QuarterClassData {
  id: string;
  displayName: string;
  units: string;
  desc: string;
  addl: string;
  gwrCourse: boolean;
  uscpCourse: boolean;
}

export interface TermData {
  termName: string;
  classes: string[];
}