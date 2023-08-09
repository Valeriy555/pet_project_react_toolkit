import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {userActions} from "../../../redux";
import css from "./UserForm.module.css";

const UserForm = () => {
    const {register, handleSubmit, reset, formState: {errors, isValid}, setValue} = useForm({
        // resolver: joiResolver(userValidator),
        mode: 'onTouched',
    });

    const {userForUpdate, error} = useSelector(state => state.userReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        if (userForUpdate) {
            const {name, age, email, password} = userForUpdate;
            setValue('name', name)
            setValue('age', age)
            setValue('email', email)
            setValue('password', password)
        }
    }, [userForUpdate, setValue])

    const submit = async (data) => {
        try {
            if (userForUpdate) {
                await dispatch(userActions.updateInUserSlice({_id: userForUpdate._id, user: data}))
            } else {
                await dispatch(userActions.createInUserSlice({user: data}))
                reset();
            }
            reset();
        } catch (e) {
            // setFormError(e.response.data)
        }
    };

    const clearForm = () => {
           dispatch(userActions.setUserForUpdate(false));
        reset();
    }
    const navigate = useNavigate()

    return (
        <div className={css.FormWrap}>

            <form onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder={'name'} {...register('name')} className={css.input}/>
                <input type="text" placeholder={'age'} {...register('age', {valueAsNumber: true})}
                       className={css.input}/>
                <input type="text" placeholder={'email'} {...register('email')} className={css.input}/>
                <input type="text" placeholder={'password'} {...register('password')} className={css.input}/>

                <button className={css.Btn}>{userForUpdate ? 'Update changes' : 'Create'}</button>
                {
                    !!userForUpdate && <button onClick={clearForm}>clear form</button>
                }

                <button
                    onClick={() => navigate(`/`)}>
                    Click to back to Start Page
                </button>
                {error && (
                    <div>
                        Status: {error.status} Error: {error.message}

                    </div>
                )}
                <div className={css.errorForm}>
                    {errors.name && <span>{errors.name.message}</span>}
                    {errors.age && <span>{errors.age.message}</span>}
                    {errors.email && <span>{errors.email.message}</span>}
                    {/*{errors.password && <span>{errors.password.message}</span>}*/}
                </div>

            </form>

        </div>
    );
};

export {UserForm};