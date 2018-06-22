import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import Clipboard from 'clipboard';
import moment from 'moment';
import Modal from "react-modal";
import Description from "./Description";
import Answer from "./Answer";
import Idea from "./Idea";

export default class LinksListItem extends React.Component{
  constructor(props){
    super(props);
    this.state={
      justCopied:false
    };
  }
  componentDidMount(){
    this.clipboard=new Clipboard(this.refs.copy);
    this.clipboard.on('success',()=>{this.setState({justCopied:true});
    setTimeout(()=>{this.setState({justCopied:false});},1000);
    }).on('error',()=>{
      alert("Error");
    })
  }

  // change(e){
  //   e.preventDefault();
  //   if(this.state.justCopied)
  //   {
  //
  //   }
  //   else {
  //     this.state.justCopied=true;
  //     this.refs.copy.value="Copied";
  //     setTimeout(function(){
  //       this.setState({justCopied:false});
  //       this.refs.copy.value="Copy";
  //     },1000);
  //   }
  // }
  componentWillUnmount(){
    this.clipboard.destroy();
  }

  renderStats(){
    let visitMessage= this.props.visitedCount === 1 ? "visit" : "visits";
    let visitedMessage = null;
    if(typeof this.props.lastVisitedAt === 'number')
    {
      visitedMessage=`(visited ${moment(this.props.lastVisitedAt).fromNow()})`;
    }
    return(
      <p className="item__message"> {this.props.visitedCount} {visitMessage} {visitedMessage}</p>
    );
  }

  render(){
    return(
      <div className="item">
        <h2>{this.props.link}</h2>
        <p className="item__message">{this.props.url}</p>
        {this.renderStats()}
        <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">
        Check
        </a>
        <Description link={this.props.link}/>
        <Idea _id={this.props._id}/>
        <Answer link={this.props.link}/>
        <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>{this.state.justCopied ? "Copied":"Copy"}</button>
        <button className="button button--pill" ref="hind" onClick={()=>{Meteor.call('links.setVisibility',this.props._id,!this.props.visible)}}>{this.props.visible ? "Solved":"Unhsolved"}</button>
      </div>
    );
  }
}
// <button className="button button--pill" ref="delete" onClick={()=>{Meteor.call('links.delete',this.props._id)}}>Delete</button>
LinksListItem.propTypes={
  _id:React.PropTypes.string.isRequired,
  url:React.PropTypes.string.isRequired,
  shortUrl:React.PropTypes.string.isRequired,
  visible:React.PropTypes.bool.isRequired,
  userId:React.PropTypes.string.isRequired,
  visitedCount:React.PropTypes.number.isRequired,
  lastVisitedAt:React.PropTypes.number,
  link:React.PropTypes.string.isRequired,
  idea:React.PropTypes.string.isRequired
}
