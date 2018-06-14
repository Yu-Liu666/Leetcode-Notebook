import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from './../ui/SignUp';
import Link from './../ui/Link';
import NotFound from './../ui/NotFound';
import LogIn from './../ui/LogIn';
import {Router,Route,browserHistory} from 'react-router';
import {Tracker} from 'meteor/tracker';
import {Accounts} from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';

const unauthenticatedPages=['/','/signup'];
const authenticatedPages=['/link'];
const onEnterPublicPages=()=>{
  if(Meteor.userId())
    browserHistory.replace('/link');
};
const onEnterPrivatePages=()=>{
  if(!Meteor.userId())
    browserHistory.replace('/');
};

export const routes=(
  <Router history={browserHistory}>
    <Route path="/" component={LogIn} onEnter={onEnterPublicPages}/>
    <Route path="/signup" component={SignUp} onEnter={onEnterPublicPages}/>
    <Route path="/link" component={Link} onEnter={onEnterPrivatePages}/>
    <Route path="*" component={NotFound} />
  </Router>
);

export const onAuthChange=(isAuthenticated)=>{
  const pathname=browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage=unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage=authenticatedPages.includes(pathname);
  if(isAuthenticated && isUnauthenticatedPage)
    {browserHistory.replace('/link');}
  else if(!isAuthenticated && isAuthenticatedPage)
    {browserHistory.replace('/');}
};
