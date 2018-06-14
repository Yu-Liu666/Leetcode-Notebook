import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import './../startup/simple-schema-configuration';

export const Links=new Mongo.Collection("links");

if(Meteor.isServer){
  Meteor.publish('linksPub',function (){
    return Links.find({userId:this.userId});
  });
}

Meteor.methods({
  'links.insert'(url,link){
    if(!this.userId)
      throw new Meteor.Error("not-authorized");

      // new SimpleSchema({
      //   url:{
      //     type:String,
      //     label:"Your Link",
      //     regEx: SimpleSchema.RegEx.Url
      //   }
      // }).validate({url});
      var array=link.toLowerCase().split(" ");
      var newUrl="";
      for(var i=0;i<array.length;i++)
         newUrl+=array[i]+"-";
      newUrl=newUrl.substring(0,newUrl.length-1);
      url="https://leetcode.com/problems/"+newUrl+"/description/";

    Links.insert({
      _id:shortid.generate(),
      link,
      url,
      idea:" ",
      visible:true,
      userId:this.userId,
      visitedCount:0,
      lastVisitedAt:null
    });
  },

  'links.setVisibility'(_id, visible){
    if(!this.userId)
      throw new Meteor.Error("not-authorized");
   new SimpleSchema({
     _id:{
       type:String,
       min:1
     },
     visible:{
       type:Boolean
     }
   }).validate({_id,visible});
   Links.update({
     _id,
     userId:this.userId
   },{$set:{visible}});
 },

 'links.trackVisit'(_id){
     new SimpleSchema({
       _id:{
         type:String,
         min:1
       }
     }).validate({_id});
     Links.update({_id},{$set:{lastVisitedAt:new Date().getTime()},$inc:{visitedCount:1}});
 }
});
