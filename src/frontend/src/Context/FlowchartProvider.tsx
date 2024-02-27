import React, {ReactNode, useState } from 'react';
import { TermData } from '../Interfaces/Interfaces';
import { exampleTermData } from '../JSON/TermData';




interface ContextProps {
  readonly flowchart: TermData[] | null;
  readonly setFlowchart: (flowchart: TermData[]) => void;
}

export const FlowchartContext = React.createContext<ContextProps>({
  flowchart: null,
  setFlowchart: () => null
})
export const FlowchartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [flowchart, setFlowchart] = useState<TermData[] | null>(exampleTermData)

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
