import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {containerReducer, stageReducer, userReducer} from "./slices";

const rootReducer = combineReducers({
    userReducer,
    containerReducer,
    stageReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer
});

export {
    setupStore
}