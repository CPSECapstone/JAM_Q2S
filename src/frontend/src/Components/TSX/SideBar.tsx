import React, { useState, ChangeEvent, useEffect } from 'react';
import SideBarItem from "./SideBarItem";
import '../CSS/SideBar.css';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { IconButton, Stack, Tooltip } from "@mui/material";

function SideBarTab () : JSX.Element {
    const [flowcharts, setFlowcharts] = useState({
        all_flowcharts: [
            {
                id: BigInt(1231),
                name: 'All Flowcharts 12344',
            },
            {
                id: BigInt(1232),
                name: 'All Flowcharts 2',
            },
            {
                id: BigInt(1233),
                name: 'All Flowcharts 3 Extra LongExtraLongExtra Long Name',
            },
        ],
        favorite_flowcharts: [
            {
                id: BigInt(121),
                name: 'Favorite 12',
            },
            {
                id: BigInt(122),
                name: 'Favorite 23',
            },
        ],
        main_flowchart: [
            {
                id: BigInt(11),
                name: 'Main Flowchart',
            },
        ],
    });

    useEffect(() => {
        console.log('New state:', flowcharts);
    }, [flowcharts]);

    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleStarClick = (id: bigint) => {
        setFlowcharts(prevFlowcharts => {
            const allFlowchartToRemoveIndex = prevFlowcharts.all_flowcharts.findIndex(flowchart => flowchart.id === id);
            const favoriteFlowchartToRemoveIndex = prevFlowcharts.favorite_flowcharts.findIndex(flowchart => flowchart.id === id);
            let updatedAllFlowcharts = [...prevFlowcharts.all_flowcharts];
            let updatedFavoriteFlowcharts = [...prevFlowcharts.favorite_flowcharts];
            let updatedMainFlowchart = prevFlowcharts.main_flowchart;

            if (allFlowchartToRemoveIndex !== -1) {
                updatedAllFlowcharts = [...prevFlowcharts.all_flowcharts, ...prevFlowcharts.main_flowchart];
                updatedMainFlowchart = [prevFlowcharts.all_flowcharts[allFlowchartToRemoveIndex]];
                updatedAllFlowcharts.splice(allFlowchartToRemoveIndex, 1);
            } else if (favoriteFlowchartToRemoveIndex !== -1) {
                updatedAllFlowcharts = [...prevFlowcharts.all_flowcharts, ...prevFlowcharts.main_flowchart];
                updatedMainFlowchart = [prevFlowcharts.favorite_flowcharts[favoriteFlowchartToRemoveIndex]];
                updatedFavoriteFlowcharts.splice(favoriteFlowchartToRemoveIndex, 1);
            }

            return {
                ...prevFlowcharts,
                all_flowcharts: updatedAllFlowcharts,
                favorite_flowcharts: updatedFavoriteFlowcharts,
                main_flowchart: updatedMainFlowchart,
            };
        });
    };


    const handleFavoriteClick = (id: bigint) => {
        setFlowcharts(prevFlowcharts => {
            const flowchartToMove = prevFlowcharts.all_flowcharts.find(flowchart => flowchart.id === id);
            const flowchartToMove2 = prevFlowcharts.favorite_flowcharts.find(flowchart => flowchart.id === id);

            if (flowchartToMove) {
                const updatedAllFlowcharts = prevFlowcharts.all_flowcharts.filter(flowchart => flowchart.id !== id);
                const updatedFavoriteFlowcharts = [...prevFlowcharts.favorite_flowcharts, flowchartToMove];

                return {
                    ...prevFlowcharts,
                    all_flowcharts: updatedAllFlowcharts,
                    favorite_flowcharts: updatedFavoriteFlowcharts,
                };
            }
            else if (flowchartToMove2) {
                const updatedFavFlowcharts = prevFlowcharts.favorite_flowcharts.filter(flowchart => flowchart.id !== id);
                const updatedAllFlowcharts = [...prevFlowcharts.all_flowcharts, flowchartToMove2];

                return {
                    ...prevFlowcharts,
                    all_flowcharts: updatedAllFlowcharts,
                    favorite_flowcharts: updatedFavFlowcharts,
                };
            }

            return prevFlowcharts;
        });
    };

    const handleAddClick = () => {
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    const handleSubmitForm = (inputValue: string) => {
        if (inputValue.trim() !== '') {
            const newFlowchart = {
                id: BigInt(Date.now()),
                name: inputValue.trim(),
            };

            // Create a new array with the new flowchart added
            const updatedFlowcharts = [...flowcharts.all_flowcharts, newFlowchart];

            // Update the state with the new array
            setFlowcharts(prevFlowcharts => ({
                ...prevFlowcharts,
                all_flowcharts: updatedFlowcharts,
            }));

            handleCloseForm();
        }
    };

    return (
        <div className="sideBar">
            <div className="sideBarItems">
                <div className="sideBarGroup">
                    <span className="sideBarTitle"> MAIN FLOWCHART </span>
                    <AllFlowcharts flowcharts={flowcharts.main_flowchart} group={"main"} onFavoriteClick={handleFavoriteClick} onStarClick={handleStarClick} />

                </div>
                <div className="sideBarGroup">
                    <span className="sideBarTitle"> FAVORITES </span>
                    <AllFlowcharts flowcharts={flowcharts.favorite_flowcharts} group={"favorite"} onFavoriteClick={handleFavoriteClick} onStarClick={handleStarClick} />
                </div>
                <div className="sideBarGroup">
                    <Stack direction="row" justifyContent="flex-end"
                           alignItems="center" spacing={0}>
                        <span className="sideBarTitle"> ALL FLOWCHARTS </span>
                        <Tooltip title="Create a new Flow" placement="right" arrow>
                            <IconButton aria-label="favorite flowchart" size="small"
                                        onClick={handleAddClick}>
                                <AddBoxOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <AllFlowcharts flowcharts={flowcharts.all_flowcharts} group={"all"} onFavoriteClick={handleFavoriteClick} onStarClick={handleStarClick} />
                </div>
                <NewFlowForm isOpen={isFormOpen} onClose={handleCloseForm} onSubmit={handleSubmitForm} />
            </div>
        </div>
    );
}
export interface flowchartProps {
    flowcharts: { id: bigint; name: string }[];
    group: string;
    onFavoriteClick: (id: bigint) => void;
    onStarClick: (id: bigint) => void;
}
function AllFlowcharts(props: flowchartProps): JSX.Element  {
    const sideBarItems = props.flowcharts.map(({id, name}) => {
        return(
            <SideBarItem id={id} name={name} group={props.group} onFavoriteClick={props.onFavoriteClick} onStarClick={props.onStarClick}/>
        );
    });
    return <>{sideBarItems}</>;
}

interface NewFlowFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (inputValue: string) => void;
}

function NewFlowForm({ isOpen, onClose, onSubmit }: NewFlowFormProps) {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(inputValue);
        setInputValue('');
    };

    return (
        <div className={`custom-popup ${isOpen ? 'open' : 'closed'}`}>
            <div className="custom-popup-content">
                <IconButton aria-label="close-btn" size="small"
                            onClick={onClose}>
                    <IndeterminateCheckBoxOutlinedIcon/>
                </IconButton>
                <text className="popup-text">ENTER NEW FLOW NAME</text>
                <input type="text" value={inputValue} onChange={handleChange} />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default SideBarTab;
