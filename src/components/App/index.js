import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Login from '../Login';
import Search from '../Search';
import AddToPlaylist from '../AddToPlaylist';
import CreateNewPlaylist from '../CreateNewPlaylist';

import './index.css';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Login}/>
      <Route exact path="/auth" component={Login}/>
      <Route path="/search" component={Search} />
      <Route path="/add-to-playlist" component={AddToPlaylist} />
      <Route path="/create-new-playlist" component={CreateNewPlaylist} />
    </div>
  </Router>
)

export default App