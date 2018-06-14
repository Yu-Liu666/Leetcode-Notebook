import React from 'react';
import {browserHistory} from 'react-router';
import {Accounts} from 'meteor/accounts-base';
import {Links} from '../api/links';
import LinksList from './LinksList';
import {Meteor} from 'meteor/meteor';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import ShowLinkControl from './ShowLinkControl';

export default ()=>{
  return (
    <div>
      <PrivateHeader title="Leetcode Notebook"/>
      <div className="page-content">
        <ShowLinkControl />
        <AddLink/>
        <LinksList/>
      </div>
    </div>
  );
}
// export default class Link extends React.Component{
//     // logout(){
//     //   Accounts.logout();
//     // }
//     //
//     // onSubmit(e){
//     //   e.preventDefault();
//     //   const url=this.refs.url.value.trim();
//     //   if(url)
//     //   { // Links.insert({url,userId:Meteor.userId()});
//     //     Meteor.call('links.insert',url);
//     //   }
//     //   this.refs.url.value="";
//     // }
//
//     render(){
//       return (
//         <div>
//
//           <PrivateHeader title="Link Page"/>
//           <LinksList/>
//           <AddLink/>
//
//         </div>
//       );
//     }
// }
