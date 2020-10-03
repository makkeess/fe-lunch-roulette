import React from 'react';
import { Button } from 'react-bootstrap';
//import logo from './logo.svg';
import './App.css';

import Pie from './Pie'

//import Button from 'react-bootstrap/Button';


const startRotation = () => {
  // POST DATA
};

function App() {
  return (
    <div className = "pieContainer">
      <Pie/>
      <Button>Slumpa dagens lunch</Button>
    </div> 
     

      
  );
}

export default App;
