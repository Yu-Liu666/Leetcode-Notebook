import React from 'react';
import Modal from 'react-modal';
import {Problems} from './../api/problems';
import {Links} from './../api/links';
import {Meteor} from 'meteor/meteor';

export default class Description extends React.Component{

  constructor(props){
    super(props);
    this.state={
      isOpen:false,
      question:""
    };
  }
  set(){
    this.setState({isOpen:false});
  }
  getPath(){
    // console.log(this.props.link);
    // console.log(Links.findOne({link:this.props.link}));
    // console.log(Problems.find().fetch());
    // console.log(Problems.findOne({name:this.props.link}));

    this.setState({isOpen:true});

  //  if (Meteor.isClient) {
  //  Meteor.subscribe("problemsPub");
    console.log(Problems.find().fetch());
    const question=Problems.findOne({name:this.props.link}).problem;
    console.log(question);
    this.setState({question});
  //  }
    //this.setState({question:Problems.findOne({name:this.props.link}).problem});
  }
  render(){
    return(
    <div className="boxed-view__display">
      <button onClick={()=>{this.getPath()}} className="button button--pill"> Description </button>
      <Modal isOpen={this.state.isOpen}
            contentLabel="Description of Problem"
            onRequestClose={this.set.bind(this)}
            className="boxed-view__box--display2 boxed-view__box"
            overlayClassName="boxed-view boxed-view--modal">
        <h1>Problem Description</h1>
        <img src={this.state.question}/>
        <br/>
        <button type="button" className="button button--secondary" onClick={this.set.bind(this)}>Close</button>
      </Modal>
    </div>
  );
  }





}
Description.propTypes={
  link:React.PropTypes.string.isRequired
}
