import React from 'react';
import {Route} from 'react-router';
import App from './components/app';

// NavBar
import Login from './components/navbar/login';
import Signup from './components/navbar/signup';

// Home Page
import Home from './components/home';

// Explore Page
import Explore from './components/user/explore';

import PhotographerProfile from './components/photographer/profile'

import Apply from './components/photographer/apply'

//Authentication for Routing
import requireAuth from './utils/requireAuth';

export default (
  <Route component={App}>
    <Route path='/' component={Home}/>
    <Route path='/login' component={Login}/>
    <Route path='/signup' component={Signup}/>
    <Route path='/home' component={Explore} onEnter={requireAuth}/>
    <Route path='/photographers/:id' component={PhotographerProfile} onEnter={requireAuth}/>
    <Route path='/apply' component={Apply}/>
  </Route>
);