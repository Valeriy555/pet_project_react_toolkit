import React from 'react';
import {UserForm} from "../UserForm/UserForm";
import {Users} from "../Users/Users";

import css from "./UsersPage.module.css";

const UsersPage = () => {

    return (
        <div className={css.InspectorsPage}>
            <UserForm/>

            <Users/>

        </div>
    );
};

export {UsersPage};
