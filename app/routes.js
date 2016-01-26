import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/app';

// NavBar
import Login from './components/navbar/login';
import Signup from './components/navbar/signup';

// Home Page
import Home from './components/home';

// Explore Page
import Explore from './components/explore/explore';

import PhotographerHome from './components/photographerHome'

import PhotographerProfile from './components/profile/profile'
import QuoteRequest from './components/profile/quoteRequest'

import PhotographerAccount from './components/photographer/account-info'
import UserAccount from './components/user/account'

import Apply from './components/photographer/apply'

//Authentication for Routing
import requireAuth from './utils/requireAuth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path='login' component={Login}/>
    <Route path='signup' component={Signup}/>
    <Route path='home' component={Explore} onEnter={requireAuth}/>
    <Route path='photographers' component={PhotographerHome} />
    <Route path='photographers/profile/:id' component={PhotographerProfile} />
    <Route path='apply' component={Apply}/>
    <Route path='request' component={QuoteRequest}/>
    <Route path='photographers/account/:id' component={PhotographerAccount}/>
    <Route path='users/:id' component={UserAccount}/>
  </Route>
);