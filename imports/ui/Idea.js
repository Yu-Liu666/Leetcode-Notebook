import React from 'react';
import Modal from 'react-modal';
import {Links} from '../api/links';
export default class Idea extends React.Component{

  constructor(props){
    super(props);
    this.state={
      isOpen:false
    };
  }
  set(){
    this.setState({isOpen:false});
  }
  get(){
    const link=Links.findOne({_id:this.props._id});
    return link.idea;
  }

  setText(e){
    e.preventDefault();
    Links.update({_id:this.props._id},{$set:{idea:this.refs.content.value}});
  }
  render(){
    return(
    <div className="boxed-view__display">
      <button onClick={()=>this.setState({isOpen:true})} className="button button--pill"> Note </button>
      <Modal isOpen={this.state.isOpen}
            contentLabel="Thinking about the problem"
            onRequestClose={this.set.bind(this)}
            className="boxed-view__box--display boxed-view__box "
            overlayClassName="boxed-view boxed-view--modal">
        <h1>Your Note</h1>
        <textarea ref="content" className="boxed-view__display boxed-view__textarea" rows="30" cols="100" name="comment" form="usrform">
          {this.get()}
        </textarea>
        <br/>
        <button type="button" className="button button--secondary button--note--slight" onClick={this.setText.bind(this)}>Save</button>
        <button type="button" className="button button--secondary" onClick={this.set.bind(this)}>Close</button>
      </Modal>
    </div>
  );
  }
}

Idea.propTypes={
  _id:React.PropTypes.string.isRequired
}
