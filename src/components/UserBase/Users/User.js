import {useDispatch} from "react-redux";
import {userActions} from "../../../redux";
import css from './User.module.css'

const User = ({user, index}) => {
    const {_id, name, email, age} = user;

    const dispatch = useDispatch()

    return (
        <div className={css.Inspector}>
            <p>{index + 1}) name: {name}</p>
            <p>age: {age}</p>
            <p>email: {email}</p>


            <div className={css.Btn}>
                <button onClick={() => dispatch(userActions.setUserForUpdate(user))}>Update</button>
                <button onClick={() => dispatch(userActions.deleteFromUserSlice({_id}))}>Delete</button>

            </div>
        </div>


    );
};

export {User};