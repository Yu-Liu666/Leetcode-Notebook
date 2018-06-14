import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import Modal from "react-modal";

export default class AddLink extends React.Component{

  constructor(props)
  {
    super(props);
    this.state={
      url:"",
      isOpen:false,
      error:""
    };
  }

  onChange(e){
    this.setState({url:e.target.value.trim()});
  }
  onSubmit(e){
    e.preventDefault();
    // const url=this.refs.url.value.trim();
    const url=this.state.url.trim();
    const link=this.state.url.trim();
    // if(url)
    // { // Links.insert({url,userId:Meteor.userId()});
      Meteor.call('links.insert',url,link,(err,res)=>{
        if(!err)
        {
          this.setState({url:""});
          this.setState({isOpen:false});
          this.setState({error:""});
        }
        else {
          this.setState({error:err.reason});
        }
      });
    // }
  }

  set(){
    this.setState({isOpen:false});
    this.setState({url:""});
    this.setState({error:""});
  }

   //在input中去掉value={this.state.url}
  render(){
    return(
      <div>
        <button className="button" onClick={()=>this.setState({isOpen:true})}>Add Problem</button>
        <Modal isOpen={this.state.isOpen}
              contentLabel="Add Problem"
              onAfterOpen={()=>this.refs.url.focus()}
              onRequestClose={this.set.bind(this)}
              className="boxed-view__box"
              overlayClassName="boxed-view boxed-view--modal">
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p>:undefined}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input type="text" ref="url" placeholder="Full name of problem" onChange={this.onChange.bind(this)}/>
            <button className="button">Add Link</button>
          </form>
          <button type="button" className="button button--secondary" onClick={this.set.bind(this)}>Cancel</button>
        </Modal>
      </div>
    );
  }
}
