import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,browserHistory} from 'react-router';
import {Tracker} from 'meteor/tracker';
import {routes,onAuthChange} from './../imports/routes/routes';
import {Links} from '../imports/api/links';
import {Session} from 'meteor/session';

Tracker.autorun(()=>{
  const isAuthenticated=!! Meteor.userId();
  console.log(isAuthenticated);
  onAuthChange(isAuthenticated);
});

Tracker.autorun(()=>{
    const links=Links.find().fetch();
    console.log(links);
});
Meteor.startup(() => {
  // code to run on server at startup
  Session.set('showLinks',true);
  ReactDOM.render(routes, document.getElementById("app"));
});
