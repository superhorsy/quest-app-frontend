import React from 'react';
import {LoginPage, PassRecoveryPage, SignUpPage, StartPage} from "./pages";

//Styles
import "./App.scss";

import {TestComponent} from "./components/testComponent/testComponent";

function App() {
    return (
        <div className="App">
            {/*<StartPage/>*/}
            {/*<LoginPage/>*/}
            <SignUpPage/>
            {/*<PassRecoveryPage/>*/}
            {/*<TestComponent/>*/}
        </div>
    );
}

export default App;
