import React from 'react';
import './App.css';
import firebase from './firebase'

function App() {
  firebase.database()
  return (
    <div className="App">
      <h1> Service test </h1>
    </div>
  );
}

export default App;
