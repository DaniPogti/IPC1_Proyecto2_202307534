import './App.css';
import React from 'react'
import { Fragment } from 'react';
import Router from './Components/Router/router';

function App() {
  return (
    // Importamos el enrutador el cual se encarga de manejar las rutas
    <Fragment>
      <Router />
    </Fragment>
  );
}

export default App;
