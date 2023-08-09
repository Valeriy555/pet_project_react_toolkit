import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";


import {containerActions} from "../../../redux";
import {StageSelect, UserSelect} from "../../Selects";
import css from "./ContainerForm.module.css";


const ContainerForm = () => {

    const {register, handleSubmit, reset, formState: {errors, isValid}, setValue} = useForm({
        // resolver: joiResolver(userValidator),
        mode: 'onTouched',
    });

    const {containerForUpdate, error} = useSelector(state => state.containerReducer);
    const dispatch = useDispatch();

    const [selectedStage, setSelectedStage] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);


    useEffect(() => {

        if (containerForUpdate) {
            const {shipper, consignee, forwarder, goods, container, consignment, stage, user} = containerForUpdate;
            setValue('shipper', shipper)
            setValue('consignee', consignee)
            setValue('forwarder', forwarder)
            setValue('goods', goods)
            setValue('container', container)
            setValue('consignment', consignment)
            setSelectedStage(stage); // Установка выбранного этапа в состояние
            setSelectedUser(user); // Установка выбранного пользователя в состояние
        }
    }, [containerForUpdate, setValue]);

    const submit = async (data) => {
        try {
            if (containerForUpdate) {
                // Объединяем текущие данные контейнера с новыми данными, чтобы сохранить все необходимые поля
                const updatedContainer = {
                    ...containerForUpdate,
                    ...data,
                    stage: selectedStage,
                    user: selectedUser,
                };
                await dispatch(containerActions.updateInContainerSlice({
                    _id: containerForUpdate._id,
                    container: updatedContainer,
                }));
            } else {
                await dispatch(containerActions.createInContainerSlice({
                    container: {...data, stage: selectedStage, user: selectedUser}
                }));
                reset();
                setSelectedUser(null); // Сброс выбранного пользователя
                setSelectedStage(null); // Сброс выбранного этапа
            }
            reset();
            await dispatch(containerActions.getAllFromContainerSlice());
        } catch (e) {
            // setFormError(e.response.data)
        }
    };

    const clearForm = () => {
        dispatch(containerActions.setContainerForUpdate(null));
        reset();
        setSelectedUser(null);
        setSelectedStage(null);
    }

    return (
        <div className={css.FormWrap}>

            <form onSubmit={handleSubmit(submit)}>

                <input type="text" placeholder={'shipper'} {...register('shipper')} className={css.input}/>
                <input type="text" placeholder={'consignee'} {...register('consignee')} className={css.input}/>
                <input type="text" placeholder={'forwarder'} {...register('forwarder')} className={css.input}/>
                <input type="text" placeholder={'goods'} {...register('goods')} className={css.input}/>
                <input type="text" placeholder={'container'} {...register('container')} className={css.input}/>
                <input type="text" placeholder={'consignment'} {...register('consignment')} className={css.input}/>
                <StageSelect
                    selectedStage={selectedStage} setSelectedStage={setSelectedStage}
                    register={register}
                    setValue={setValue}/> {/* Передача состояния и функции установки выбранного этапа */}
                <UserSelect
                    selectedUser={selectedUser} setSelectedUser={setSelectedUser}
                    register={register}
                    setValue={setValue}/> {/* Передача состояния и функции установки выбранного пользователя */}

                <button className={css.Btn}>
                    {containerForUpdate ? 'Update changes' : 'Create'}
                </button>


                {containerForUpdate && <button onClick={clearForm}>clear form</button>}

                {error && (
                    <div>
                        Status: {error.status} Error: {error.message}

                    </div>
                )}


                <div className={css.errorForm}>

                    {errors.shipper && <span>{errors.shipper.message}</span>}
                    {errors.consignee && <span>{errors.consignee.message}</span>}
                    {errors.forwarder && <span>{errors.forwarder.message}</span>}
                    {errors.goods && <span>{errors.goods.message}</span>}
                    {errors.container && <span>{errors.container.message}</span>}
                    {errors.consignment && <span>{errors.consignment.message}</span>}
                    {errors.stage && <span>{errors.stage.message}</span>}
                    {errors.user && <span>{errors.user.message}</span>}

                </div>

            </form>

        </div>
    );
};

export {ContainerForm};