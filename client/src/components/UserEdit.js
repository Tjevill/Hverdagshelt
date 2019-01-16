//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import { userService } from "../services";
import { Alert,Card, NavBar,ListGroup,Row, Column, Button, Form} from './widgets';

const history = createHashHistory();




export default class UserEdit extends Component {
  userid = -1;
  user = new Object();
  bilde = "https://img.icons8.com/android/1600/user.png";
  _tel = "";
  _zip = "";
  state = {
    info: "",
    tel: "",
    zip: ""
  };

  changeVal = event =>{
      this.user.tel = event.target.value;
      var tel = event.target.value;
      if(isNaN(tel)){
          tel = this._tel;
          this.setState({"info":"Kun skriv inn nummer"});
          setTimeout(function(){
             this.setState({"info":""});
          }.bind(this),1000);
      }else{
          this._tel=tel;
      }
      this.setState({"tel":tel});
  }

  changeZip = event =>{
      this.user.zipcode = event.target.value;
      var zip = event.target.value;
      if(isNaN(zip)){
          zip = this._zip;
          this.setState({"info":"Kun skriv inn nummer"});
          setTimeout(function(){
             this.setState({"info":""});
          }.bind(this),1000);
      }else{
          this._zip=zip;
      }
      this.setState({"zip":zip});
  }

  render(){
    let button;
    if(this.user.subscription==1){
      button = (
        <button type="button" onClick={() => this.subscribe(this.user)} className="btn btn-danger">
          Subscribe
        </button>
      );
      this.user_id = this.user.user_id;
    } else {
      button = (
        <button type="button" onClick={() => this.unsubscribe(this.user)} className="btn btn-success">
          Unsubscribe
        </button>
      );
      this.user_id = this.user.user_id;
    }

    return (
      <>
      <div className="jumbotron">
        <div className="container text-center">
          <h4>Edit</h4>
        </div>
      </div>


        <div className="container text-center">
          <div className="row">
            <div className="col">
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
            defaultValue={this.state.zip}
            value = {this.state.zip}
            maxlength ="4"
            name="zipcode"
            onChange={this.changeZip}
          />
          <p color="red">{this.state.info} </p>
        </div>
        <div className="form-group">
          Telefon:{" "}
          <input
          className="form-control"
            type="text"
            defaultValue={this.state.tel}
            name="tel"
            value={this.state.tel}
            maxlength ="8"
            onChange={this.changeVal}
          />
            <p color="red">{this.state.info} </p>
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
          <div className="col">
          <br/><br/><br/><br/>
            <img src={this.bilde} width="200"/>
          </div>
        </div>
      </div>
    </>
    );
  }


  componentDidMount(){
    this.userid = sessionStorage.getItem("userid");
    userService
      .getUserByID(this.userid)
      .then(user => {
        this.user = user[0];
        this.state.tel = this.user.tel;
        this.state.zip = this.user.zipcode;
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
      return console.log("null name");
    }
    userService
      .updateOne(user)
      .then(()=>{
          console.log("happy");
          this.bilde ="https://visualpharm.com/assets/191/Checked%20User%20Male-595b40b75ba036ed117d6ed4.svg";
          this.forceUpdate();
        })
      .catch((error: Error) => {
        Alert.danger(error.message);
        this.bilde ="https://visualpharm.com/assets/747/Cancel-595b40b75ba036ed117d57c5.svg";
        this.forceUpdate();
      })
    }
}
