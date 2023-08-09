import {Link, Route, Routes} from "react-router-dom";
import {UsersPage} from "./components/UserBase";
import {ContainersPage} from "./components/СontainerBase";

import css from "./App.module.css";


function App() {
    return (
        <div>

            <div className={css.WrapApp}>
                <div className={css.link}>

                    <li><Link to={'/users'}>users page</Link></li>
                    <li><Link to={'/containers'}>containers page</Link></li>

                </div>

                <Routes>

                    <Route path={'users'} element={<UsersPage/>}/>
                    <Route path={'containers'} element={<ContainersPage/>}/>

                </Routes>
            </div>

        </div>
    );
}

export default App;
