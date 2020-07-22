import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form'
// import { BrowserRouter, Route, Link } from 'react-router-dom'
// import People from './components/People'


function App() {
 
  return (
    <div className="App">
      <Form />
      {/* <BrowserRouter>
      <header>
      <Link to='/Peoplels'>people</Link>
      </header>
      <Route exact path='/people' component={People}/>
      </BrowserRouter> */}
    </div>
  );
}

export default App;

