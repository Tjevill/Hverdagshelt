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
        <button type="button" onClick={() => this.subscribe(this.user)} className="btn btn-primary">
          Subscribe
        </button>
      );
      this.user_id = this.user.user_id;
    } else {
      button = (
        <button type="button" onClick={() => this.unsubscribe(this.user)} className="btn btn-primary">
          Unsubscribe
        </button>
      );
      this.user_id = this.user.user_id;
    }

    return (
      <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container text-center">
          <h1 class="display-4">Edit</h1>
        </div>
      </div>


        <div class="container text-center">
          <div class="row">
            <div class="col">
         <div className="form-group">
          Navn:{" "}
          <input
          className="form-control"
            type="text"
            name="name"
            defaultValue={this.user.name}
            onChange={event => (this.user.name = event.target.value)}
          />
        </div>
        <div className="form-group">
          Adresse:{" "}
          <input
          className="form-control"
            type="text"
            defaultValue={this.user.address}
            name="address"
            onChange={event => (this.user.address = event.target.value)}
          />
        </div>
        <div className="form-group">
          Postnummer:{" "}
          <input
          className="form-control"
            type="text"
            defaultValue={this.user.zipcode}
            name="zipcode"
            onChange={event => (this.user.zipcode = event.target.value)}
          />
        </div>
        <div className="form-group">
          Telefon:{" "}
          <input
          className="form-control"
            type="text"
            defaultValue={this.user.tel}
            name="tel"
            onChange={event => (this.user.tel = event.target.value)}
          />
        </div>
        <div className="form-group">
          Email:{" "}
          <input
          className="form-control"
            type="text"
            defaultValue={this.user.email}
            name="email"
            onChange={event => (this.user.email = event.target.value)}
          />
          </div>
          <br/>
          <br/>
          {button}
          <br/>
          <br/>
          <Button.Success onClick={() => this.save(this.user)}>Save</Button.Success>
          <Button.Light onClick={() => history.push('/profile/'+this.user.user_id)}>Cancel</Button.Light>
          </div>
          <div class="col">
          <br/><br/><br/><br/>
            <img src="https://img.icons8.com/android/1600/user.png" width="200"/>
          </div>
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

  subscribe(user){
    //console.log("this.user.name:" + user.name);
    if(!user){
      console.log("Returning null!");
      this.message = "Error";
      return null;
    }
    const sub = {
      user_id: user.user_id,
      subscription: 0
    };
    userService
      .updateSubscription(sub)
      .then(sub => {
        console.log("Subscription now"+{sub});
        if(user) window.location.reload();
      })
      .catch((error: Error) => Alert.danger(error.message));
  }

  unsubscribe(user){
    const sub = {
      user_id: user.user_id,
      subscription: 1
    };

    userService
      .updateSubscription(sub)
      .then(sub => {
        console.log("Subscription now"+{sub});
        if(user) window.location.reload();
      })
      .catch((error: Error) => Alert.danger(error.message));
  }

  save(user){
    console.log("this.user.name:" + user.name);
    if(user.name==""||user.name==null||user.name==" "){
      return alert("Vennligst oppgi navn");
    }
    userService
      .updateOne(user)
      .then(()=> console.log("happy")
        //history.push('/profile/'+user.user_id)
        )
      .catch((error: Error) => Alert.danger(error.message));
  }
}
