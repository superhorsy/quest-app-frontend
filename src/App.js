import React from 'react';
import {LoginPage, PassRecoveryPage, SignUpPage} from "./pages";

import {TestComponent} from "./components/testComponent/testComponent";

function App() {
    return (
        <div className="App">
            <LoginPage/>
            <SignUpPage/>
            <PassRecoveryPage/>
            {/*<TestComponent/>*/}
        </div>
    );
}

export default App;
