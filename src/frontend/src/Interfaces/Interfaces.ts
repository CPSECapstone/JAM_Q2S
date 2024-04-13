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
    color: string;
    customDesc?: string;
    customDisplayName?: string;
    customId?: string;
    customUnits?: string;
    id: string | null;
    taken: boolean;
    uuid: string;
}

export interface ClassDBClass {
    classData: QuarterClassData;
    color: string;
    taken: boolean;
    uuid: string;
}

export interface TermData {
    tIndex: number;
    courses: FlowchartClass[];
    tUnits: string;
}

export interface ContextMenuData {
    classUUID: string,
    termId: string
}

export interface FlowchartResponse {
    id: number;
    major: string;
    catalog: string;
    termData: string;
    concentration: string;
    favorite: boolean;
    main: boolean;
}

export interface FlowchartData {
    hash: string;
    id: string;
    importedId: string | null;
    lastUpdatedUTC: string;
    name: string;
    notes: string;
    ownerId: string;
    programId: string[];
    publishedId: string | null;
    startYear: string;
    termData: TermData[];
    unitTotal: string;
    version: string;
}