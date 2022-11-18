import React from 'react';
import {LoginPage, SignUpPage} from "./pages";

import {TestComponent} from "./components/testComponent/testComponent";

function App() {
    return (
        <div className="App">
            <LoginPage/>
            <SignUpPage/>
            {/*<TestComponent/>*/}
        </div>
    );
}

export default App;
