import React, {ReactNode, useState} from 'react';
import {FlowchartData} from '../Interfaces/Interfaces';


interface ContextProps {
    readonly flowchart: FlowchartData | null;
    readonly setFlowchart: (flowchart: FlowchartData) => void;
}

export const FlowchartContext = React.createContext<ContextProps>({
    flowchart: null,
    setFlowchart: () => null
})
export const FlowchartProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [flowchart, setFlowchart] = useState<FlowchartData | null>(null)

    const value = {
        flowchart,
        setFlowchart,
    };
    return (
        <FlowchartContext.Provider value={value}>
            {children}
        </FlowchartContext.Provider>
    );
};
