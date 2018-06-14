import { Meteor } from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';
import './../startup/simple-schema-configuration';

Accounts.validateNewUser((user)=>{
const email=user.emails[0].address;

new SimpleSchema({
  email:{
    type:String,
    regEx:SimpleSchema.RegEx.Email
  }
}).validate({email});

return true;
});
