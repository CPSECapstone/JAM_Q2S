export interface QuarterClassData {
  id: string;
  displayName: string;
  units: string;
  desc: string;
  addl: string;
  gwrCourse: boolean;
  uscpCourse: boolean;
}

export interface EmbeddedSemesterClassData {
  id: string;
  displayName: string;
  units: string;
}

export interface FlowchartClass {
  id: string;
  color: string;
}

export interface ClassDBClass {
  classData: QuarterClassData,
  color: string
}

export interface TermData {
  termName: string;
  classes: FlowchartClass[];
  totalUnits: number;
}

export interface flowchartProps {
  flowcharts: { id: bigint; name: string }[];
  group: string;
  onFavoriteClick: (id: bigint) => void;
  onStarClick: (id: bigint) => void;
}

export interface SideBarItemProps {
  id: bigint;
  name: string;
  group: string;
  onFavoriteClick: (id: bigint) => void;
  onStarClick: (id: bigint) => void;
}