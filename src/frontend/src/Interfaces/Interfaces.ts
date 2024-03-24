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
    taken: boolean;
}

export interface ClassDBClass {
    classData: QuarterClassData,
    color: string
    taken: boolean;
}

export interface TermData {
    termName: string;
    classes: FlowchartClass[];
    totalUnits: number;
}

export interface ContextMenuData {
    classId: string,
    termId: string

}
