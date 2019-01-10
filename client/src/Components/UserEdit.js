//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import { userService } from "../services";
import { Alert,Card, NavBar,ListGroup,Row, Column, Button, Form} from './widgets';

const history = createHashHistory();




export default class UserEdit extends Component <{ match: { params: { id: number } } }> {
  user = new Object();
  render(){
    let button;
    if(this.user.subscription==1){
      button = (
        <Button.Success onClick={this.subscribe}>Subscribe</Button.Success>
      )
    } else {
        button =( <Button.Danger onClick={this.unsubscribe}>Unsubscribe</Button.Danger>
      )
    }
    return (
      <>
      <div className="jumbotron">
        <div className="container text-center">
          <h5>Edit</h5>
        </div>
        </div>

        <div className="container text-center">
          <div class="container text-center">
            <form ref={e => (this.form = e)}>
          <Form.Input
            type="text"
            label="Navn"
            value={this.user.name}
            onChange={event => (this.user.name = event.target.value)}
            required
          />
          <Form.Input
            type="text"
            label="Address"
            value={this.user.address}
            onChange={event => (this.user.address = event.target.value)}
            required
          />
          <Form.Input
            type="text"
            label="Mobilnummer"
            value={this.user.tel}
            onChange={event => (this.user.tel = event.target.value)}
            required
          />
          <Form.Input
            type="text"
            label="Email"
            value={this.user.email}
            onChange={event => (this.user.email = event.target.value)}
            required
          />
          <Form.Input
            type="text"
            label="Postnummer"
            value={this.user.zipcode}
            onChange={event => (this.user.zipcode= event.target.value)}
            required
          />
          <br/>
          <br/>
          {button}<br/><br/>
          <Button.Success onClick={this.save}>Save</Button.Success>
          <Button.Light onClick={() => history.push('/')}>Cancel</Button.Light>
          </form>
          </div>
      </div>

      </>
    );
  }
  componentDidMount(){
    userService
      .getUserByID(this.props.match.params.id)
      .then(user => {
        this.user = user[0];
        this.forceUpdate();
      })
      .catch((error: Error) => Alert.danger(error.message));
  }

  subscribe(){
    console.log(this.user);
    const sub = {
      user_id: this.user.user_id,
      subscription: 0
    ;

    userService
      .updateSubscription(sub)
      .then(sub => {
        if(this.sub) history.push('/profile/'+this.user.user_id+'/edit')
      })
      .catch((error: Error) => Alert.danger(error.message));
  }

  unsubscribe(){
    const sub = {
      user_id: this.user.user_id,
      subscription: 1
    };

    userService
      .updateSubscription(sub)
      .then(sub => {
        if(this.sub) history.push('/profile/'+this.user.user_id+'/edit')
      })
      .catch((error: Error) => Alert.danger(error.message));
  }

  save(){
    if(this.user.name==""||this.user.name==null||this.user.name==" ")return alert("Vennligst oppgi navn");
    userService
      .updateOne(this.user)
      .then(user => {
        if(this.user) history.push('/profile/'+this.user.user_id)
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
}
