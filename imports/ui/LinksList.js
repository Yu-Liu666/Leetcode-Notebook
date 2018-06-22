import React from 'react';
import {Links} from '../api/links';
import {Tracker} from 'meteor/tracker';
import {Meteor} from 'meteor/meteor';
import LinksListItem from './LinksListItem';
import {Session} from 'meteor/session';
import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      links:[]
    };
  }

  renderLinksItems(){
    console.log(this.state.links.length);
    if(this.state.links.length==0)
    {
      console.log("Update");
      return (
        <div className="item">
          <p className="item__status-message">No Problems Found</p>
        </div>
      );
    }
    console.log("Unupdate");
    const links=this.state.links;
    console.log(links);
    return links.map((link)=>{
      let shortUrl=Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;
    });
  }

  render(){
    return(
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksItems()}
        </FlipMove>
      </div>
    );
  }

  componentDidMount(){
    this.linksTracker=Tracker.autorun(()=>{
        Meteor.subscribe('linksPub');
        const links=Links.find({visible:Session.get("showLinks")}).fetch();
        console.log(links);
        this.setState({links});
    });
  }

  componentWillUnmount(){
    this.linksTracker.stop();
  }



}
