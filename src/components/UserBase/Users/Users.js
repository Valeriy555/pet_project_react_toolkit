import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {userActions} from "../../../redux";
import {User} from "./User";

import css from "./Users.module.css";

const Users = () => {
    const dispatch = useDispatch(); // отправляет в стор данные
    const {users, error, loading} = useSelector(state => state.userReducer); // достает из стора

    useEffect(() => {
        dispatch(userActions.getAllFromUserSlice())
    }, [dispatch])


    return (
        <div className={css.InspectorsWrap}>

            {loading && <h1 >loading..........................</h1>}
            {/*{error && <h1 >Error!!!!!!!!!!!!!!!!!</h1>}*/}
            {users.map((user, index) =>
                <User key={user._id} user={user} index={index}/>)}
        </div>
    );
};

export {Users};