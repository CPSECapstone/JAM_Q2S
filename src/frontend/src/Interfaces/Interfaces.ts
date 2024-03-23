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

export interface ContextMenuData {
    classId: ClassDBClass | null,
    termId: string

}
