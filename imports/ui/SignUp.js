import React from 'react';
import {Link} from 'react-router';
import {Accounts} from 'meteor/accounts-base';

export default class SignUp extends React.Component{
    constructor(props){
      super(props);
      this.state={
        error:''
      };
    }

    onSubmit(e){
      e.preventDefault();
      let email=this.refs.email.value.trim();
      let password=this.refs.password.value.trim();
      if(password.length<9)
        return this.setState({error:"Your password should be longer than 9"});
      Accounts.createUser({email,password},(err)=>{
        if(err)
        {
        this.setState({error:err.reason});
        }
      else {
        this.setState({error:""});
      }
      });
    }

    render(){
      return (
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h1> Sign Up </h1>
            <p> This is SignUp </p>
            {this.state.error ? <p>{this.state.error}</p> : undefined}
            <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
              <input type="email" ref="email" name="email" placeholder="email" />
              <input type="password" ref="password" name="password" placeholder="password" />
              <button className="button"> Sign Up </button>
            </form>
            <Link to="/">
              Sign In
            </Link>
          </div>
        </div>
      );
    }
}
