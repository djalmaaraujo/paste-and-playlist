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

const PUBLIC_URL = process.env.PUBLIC_URL;

const App = () => (
  <Router>
    <div>
      <Route exact path={`${PUBLIC_URL}/`} component={Login}/>
      <Route exact path={`${PUBLIC_URL}/auth`} component={Login}/>
      <Route path={`${PUBLIC_URL}/search`} component={Search} />
      <Route path={`${PUBLIC_URL}/add-to-playlist`} component={AddToPlaylist} />
      <Route path={`${PUBLIC_URL}/create-new-playlist`} component={CreateNewPlaylist} />
    </div>
  </Router>
)

export default App