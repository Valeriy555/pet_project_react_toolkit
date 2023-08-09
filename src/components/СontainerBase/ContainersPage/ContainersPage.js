import React from 'react';
import {ContainerForm} from "../ContainerForm/ContainerForm";
import {Containers} from "../Conteiners/Containers";

import css from "./ContainersPage.module.css";

const ContainersPage = () => {
    return (
        <div className={css.ContainersPage }>

            <ContainerForm/>

            <Containers/>

        </div>
    );
};

export {ContainersPage};