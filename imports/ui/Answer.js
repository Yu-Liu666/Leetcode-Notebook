import React from 'react';
import Modal from 'react-modal';
import {Problems} from './../api/problems';
import {Links} from './../api/links';

export default class Answer extends React.Component{

  constructor(props){
    super(props);
    this.state={
      isOpen:false,
      answer:""
    };
  }
  set(){
    this.setState({isOpen:false});
  }
  getPath(){
    console.log(this.props.link);
    console.log(Problems.findOne({name:this.props.link}));
    this.setState({isOpen:true});
    this.setState({answer:Problems.findOne({name:this.props.link}).ans});
  }
  render(){
    return(
    <div className="boxed-view__display">
      <button onClick={()=>{this.getPath()}} className="button button--pill"> Answer </button>
      <Modal isOpen={this.state.isOpen}
            contentLabel="Answer of Problem"
            onRequestClose={this.set.bind(this)}
            className="boxed-view__box--display boxed-view__box "
            overlayClassName="boxed-view boxed-view--modal">
        <h1>Solutions</h1>
        <img src={this.state.answer}/>
        <button type="button" className="button button--secondary" onClick={this.set.bind(this)}>Close</button>
      </Modal>
    </div>
  );
  }
}
Answer.propTypes={
  link:React.PropTypes.string.isRequired
}
