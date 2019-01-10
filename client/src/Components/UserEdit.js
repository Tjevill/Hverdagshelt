//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import { Alert,Card, NavBar,ListGroup,Row, Column, Button, Form} from './widgets';

export default class UserEdit extends Component {
  user = null;
  x =1 ;
  render(){
    let button;
    if(this.x==2){
      button = (
        <Button.Success onClick={this.subscribe}>Subscribe</Button.Success>
      )
    } else {
        button =( <Button.Danger onClick={this.unsubscribe}>Unsubscribe</Button.Danger>
      )
    }
    return (
      <>
      <Card title="Edit" class="container text-center">
      <div class="container text-center">
        <form ref={e => (this.form = e)}>
          <Form.Input
            type="text"
            label="Navn"
            //value={this.user.name}
            onChange={event => (this.user.name = event.target.value)}
            required
          />
          <Form.Input
            type="text"
            label="Address"
            //value={this.user.address}
            onChange={event => (this.user.address = event.target.value)}
            required
          />
          <Form.Input
            type="text"
            label="Mobilnummer"
            //value={this.user.mobilnummer}
            onChange={event => (this.user.tel = event.target.value)}
            required
          />
          <Form.Input
            type="text"
            label="Email"
            //value={this.user.email}
            onChange={event => (this.user.email = event.target.value)}
            required
          />
          <Form.Input
            type="text"
            label="Postnummer"
            //value={this.user.email}
            onChange={event => (this.user.zipcode= event.target.value)}
            required
          />
          <Form.Input
            type="text"
            label="Passord"
            //value={this.user.email}
            onChange={event => (this.user.password = event.target.value)}
            required
          />
          <Form.Input
            type="text"
            label="GjentaPassord"
            //value={this.user.email}
            onChange={event => (this.user.password = event.target.value)}
            required
          />
          {button}<br/><br/>
          <Button.Success onClick={this.save}>Save</Button.Success>
          <Button.Light onClick={() => history.push('/')}>Cancel</Button.Light>
          </form>
          </div>
        </Card>
      </>
    );
  }
  mounted(){

  }

  subscribe(){
  }

  unsubscribe(){
  }

  save(){
    if(this.user.name==""||this.user.name==null||this.user.name==" ")return alert("Vennligst oppgi navn");
  }
}
