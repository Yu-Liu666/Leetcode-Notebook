import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const Problems=new Mongo.Collection("problems");
if(Meteor.isServer){
  Meteor.publish(null,function (){
    return Problems.find();
  });
}
