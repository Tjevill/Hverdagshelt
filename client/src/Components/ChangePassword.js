//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import { userService } from "../services";
import { Alert,Card, NavBar,ListGroup,Row, Column, Button, Form} from './widgets';

export default class ChangePassword extends Component <{id: number}> {
  user = new Object();

  render(){
    return(
      <>
      <Card title="Endre passord" class="container text-center">
        <div class="container text-center">
        <form ref={e => (this.form = e)}>
          <Form.Input
            type="password"
            label="Gammelt Passord"
            onChange={event => (this.user.passord = event.target.value)}
            required
          />
          <Form.Input
            type="password"
            label="Nytt Passord"
            onChange={event => (this.user.passord = event.target.value)}
            required
          />
          <Form.Input
            type="password"
            label="Gjenta NyttPassord"
            onChange={event => (this.user.passord = event.target.value)}
            required
          />
          <br/><br/>
          <Button.Success onClick={this.save}>Save</Button.Success>
          <Button.Light onClick={() => history.push('/')}>Cancel</Button.Light>
        </form>
        </div>
      </Card>
      </>
    );
  }

  subscribe(){
  }

  mounted(){

  }
}
