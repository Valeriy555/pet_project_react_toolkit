import {useDispatch} from "react-redux";
import {containerActions} from "../../../redux";

import css from './Conteiner.module.css'

const Container = ({cont}) => {
    const {_id, shipper, consignee, forwarder, goods, container, consignment, stage, user} = cont;

    const dispatch = useDispatch();

    const userName = user ? user.name : "No User";
    const stageName = stage ? stage.stage : "No Stage";


    return (
        <div>
            <div className={css.Content}>
                <p> {shipper}</p>
                <p> {consignee}</p>
                <p> {forwarder}</p>
                <p> {goods}</p>
                <p> {container}</p>
                <p> {consignment}</p>
                <p> {stageName}</p>
                <p> {userName}</p>

            </div>
            <div className={css.Btn}>
                <button onClick={() => dispatch(containerActions.setContainerForUpdate(cont))}>Update</button>
                <button onClick={() => dispatch(containerActions.deleteFromContainerSlice({_id}))}>Delete</button>

            </div>

            <hr/>
        </div>
    );
};

export {Container};