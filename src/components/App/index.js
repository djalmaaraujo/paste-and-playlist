import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Login from '../Login';
import Search from '../Search';
import AddToPlaylist from '../AddToPlaylist';

import './index.css';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Login}/>
      <Route exact path="/auth" component={Login}/>
      <Route path="/search" component={Search} />
      <Route path="/add_to_playlist" component={AddToPlaylist} />
    </div>
  </Router>
)

export default App