import React from 'react';
import './App.css';
import routes from './routes';
import Nav from './Components/Nav'

function App() {
  return (
    <div className='App'>
      <Nav className='nav'>
        { routes }
      </Nav>
    </div>
  )
};

export default App;
