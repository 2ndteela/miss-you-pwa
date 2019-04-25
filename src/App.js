import React from 'react';
import './App.css';
import firebase from './firebase'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './comps/Login'
import Main from './comps/Main';

function App() {
  firebase.database()
  return (
    <div className="App">
      <Router>
        <div>
          <Route exact path='/' component={Login} />
          <Route path='/main' component={Main} />
        </div>
      </Router>
    </div>
  );
}

export default App;
