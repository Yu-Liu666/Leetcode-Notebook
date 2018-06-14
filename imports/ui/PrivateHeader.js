import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';

const PrivateHeader = (props)=>{
  return (
    <div className="header">
      <div className="header__content">
      <h1 className="header__title"> {props.title} </h1>
      <button className="button--link-text button" onClick={()=>{Accounts.logout();}}> Log Out </button>
      </div>
    </div>
  );
}
// export default class PrivateHeader extends React.Component{
//
//   logout(){
//     Accounts.logout();
//   }
//
//   render(){
//     return(
//       <div>
//         <h1> {this.props.title} </h1>
//         <button onClick={this.logout.bind(this)}> Log Out </button>
//       </div>
//     );
//   }
// }

PrivateHeader.propTypes={
  title:React.PropTypes.string.isRequired
};

export default PrivateHeader;
