import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {containerActions} from "../../../redux";
import {Container} from "./Container";

import css from "./Conteiners.module.css";

const Containers = () => {

    const dispatch = useDispatch();
    const {containers} = useSelector(state => state.containerReducer);

    useEffect(() => {
        dispatch(containerActions.getAllFromContainerSlice())
    }, [dispatch])


    return (
        <div>

            <div className={css.ContainersWrap}>

                <div className={css.Header}>

                    <p> shipper</p>
                    <p> consignee</p>
                    <p> forwarder</p>
                    <p> goods</p>
                    <p> container</p>
                    <p> consignment</p>
                    <p> inspection stage</p>
                    <p> inspection inspector</p>

                </div>

                <div className={css.Containers}>
                    {containers.map((cont) =>
                        <Container key={cont._id} cont={cont}/>)}
                </div>
            </div>
        </div>
    );
};

export {Containers};