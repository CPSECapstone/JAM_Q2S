export interface QuarterClassData {
    id: string;
    displayName: string;
    units: string;
    desc: string;
    addl: string;
    gwrCourse: boolean;
    uscpCourse: boolean;
}

export interface ClassDisplayInformation {
    id: string;
    displayName: string;
    units: string;
    desc: string;
    addl: string;
    color: string;
    taken: boolean;
    uuid: string;
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

export interface TermData {
    tIndex: number;
    termName: string;
    termType: string;
    courses: FlowchartClass[];
    tUnits: string;
}

export interface ContextMenuData {
    classUUID: string,
    termId: string
}

export interface FlowchartMetaData {
    user: User;
    termData: string;
    catalogYear: string,
    concentration: string,
    favorite: boolean,
    id: number,
    main: boolean,
    major: string,
    name: string
}

export interface User {
    admit_type: string,
    catalog_year: string,
    concentration: string,
    email: string,
    first_name: string,
    last_name: string,
    major: string,
    minor: string,
    password: string,
    term_admitted: string,
    userId: number,
    user_name: string
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

export interface User {
    id: string;
    authToken?: string;
    user_name: string;
    first_name: string;
    last_name: string;
    email: string;
    term_admitted: string;
    admit_type: string;
    catalog_year: string;
    major: string;
    concentration: string;
    minor: string;
}