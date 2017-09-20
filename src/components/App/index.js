import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Login from '../Login';
import Search from '../Search';

import './index.css';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Login}/>
      <Route exact path="/auth" component={Login}/>
      <Route path="/search" component={Search} />
    </div>
  </Router>
)
export default App