import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {stageActions} from "../../redux";
import css from "../СontainerBase/ContainerForm/ContainerForm.module.css";


const StageSelect =({ setSelectedStage }) => {
    const dispatch = useDispatch(); // отправляет в стор данные
    const {stages} = useSelector(state => state.stageReducer); // достает из стора


    useEffect(() => {
        dispatch(stageActions.getAllFromStageSlice())
    }, [dispatch]);

    const handleStageChange = (e) => {
        const selectedStageId = e.target.value;
        setSelectedStage(selectedStageId);

    };

    return (
        <select className={css.select} onChange={handleStageChange} >
            {stages.map((stage) => (
                <option key={stage._id} value={stage._id}>
                    {stage.stage}
                </option>
            ))}
        </select>
    );
};

export {StageSelect};