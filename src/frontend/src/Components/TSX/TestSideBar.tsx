import React, {useContext, useState} from "react";
import {FlowchartData} from "../../Interfaces/Interfaces";
import {FlowchartContext} from "../../Context/FlowchartProvider";
import TestSideBarItem from "./TestSideBarItem";

interface TestSideBarProps {
    AllFlowcharts: FlowchartData[];
    setLoading: (loading: boolean) => void;
}

export const TestSideBar = ({AllFlowcharts, setLoading} : TestSideBarProps) => {
    const { setFlowchart } = useContext(FlowchartContext);
    const [selected, setSelected] = useState<string | null>(null)
    let handleClick = (flowchart: FlowchartData) => {
        if(!selected || selected !== flowchart.name){
            setLoading(true);
            setFlowchart(flowchart);
            setSelected(flowchart.name)
        }
    }

    return (
        <div>
            {AllFlowcharts.map((current: FlowchartData) => (
                <div onClick={() => handleClick(current)} key={current.name}>
                    <TestSideBarItem name={current.name} selected={selected === current.name}/>
                </div>
            ))}
        </div>
    )
}
