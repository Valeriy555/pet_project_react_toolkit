import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {setupStore} from "./redux";
import {Provider} from "react-redux";
import reportWebVitals from './reportWebVitals';

import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
const store = setupStore();

root.render(
    <Provider store={store}>
        <BrowserRouter>

            <App />

        </BrowserRouter>
    </Provider>
);


reportWebVitals();