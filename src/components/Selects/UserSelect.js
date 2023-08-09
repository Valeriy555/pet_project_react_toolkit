import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {userActions} from "../../redux";
import css from "../СontainerBase/ContainerForm/ContainerForm.module.css";


const UserSelect =({  setSelectedUser }) => {
    const dispatch = useDispatch(); // отправляет в стор данные
    const {users} = useSelector(state => state.userReducer); // достает из стора


    useEffect(() => {
        dispatch(userActions.getAllFromUserSlice())
    }, [dispatch]);

    const handleUserChange = (e) => {
        const selectedUserId = e.target.value;
        setSelectedUser(selectedUserId);
    };

    return (
        <select className={css.select} onChange={handleUserChange} >
            {users.map((user) => (
                <option key={user._id} value={user._id}>
                    {user.name}
                </option>
            ))}
        </select>
    );
};

export {UserSelect};