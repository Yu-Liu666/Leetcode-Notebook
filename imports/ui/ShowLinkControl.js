import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Tracker} from 'meteor/tracker';

export default class ShowLinkControl extends React.Component{

  componentDidMount(){
    this.linksTracker=Tracker.autorun(()=>{
        const showLinks=Session.get("showLinks");
        this.setState({showLinks});
    });
  }
  componentWillUnmount(){
    this.linksTracker.stop();
  }

  constructor(props)
  {
    super(props);
    this.state={
      showLinks:true
    }
  }
  render(){
    return(
      <div>
        <label className="checkbox">
          <input className="checkbox__box" type="checkbox" checked={!this.state.showLinks} onChange={(e)=>{Session.set('showLinks',!e.target.checked);}}/>
          Show Solved Problems
        </label>
      </div>
    );
  }
}
