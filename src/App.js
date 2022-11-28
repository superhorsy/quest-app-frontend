import React from 'react';
//Styles
import "./App.scss";

import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components/AppRouter';

import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
