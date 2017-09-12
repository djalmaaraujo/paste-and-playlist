import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Login from '../Login';
import Paste from '../Paste';
import Results from '../Results';

import './index.css';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Login}/>
      <Route exact path="/auth" component={Login}/>
      <Route path="/paste" component={Paste}/>
      <Route path="/results" component={Results} />
    </div>
  </Router>
)
export default App