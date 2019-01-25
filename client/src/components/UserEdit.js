//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import { userService } from "../services";
import { Alert, Card, NavBar, ListGroup, Row, Column, Button, Form, Loading} from './widgets';

const history = createHashHistory();

function isEmail(str){
var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
return reg.test(str);
}


export default class UserEdit extends Component {

  loaded = false;
  userid = -1;
  user = new Object();
  bilde = "./resources/hverdagshelt.png";
  _tel = "";
  Emailinputtype = "";
  Nameinputtype = "";
  AddressInputClass = "";
  inputstatus ="";
  ZipcodeInputClass="";
  _zip = "";
  state = {
    telinfo: "",
    zipinfo: "",
    mailinfo: "",
    tel: "",
    zip: "",
  };


  changeVal = event =>{
      this.user.tel = event.target.value;
      var tel = event.target.value;
      if(isNaN(tel)){
          tel = this._tel;
          this.setState({"telinfo":"Kun skriv inn nummer"});
          setTimeout(function(){
             this.setState({"telinfo":""});
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
          this.setState({"zipinfo":"Kun skriv inn nummer"});
          setTimeout(function(){
             this.setState({"zipinfo":""});
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
        <button type="button" onClick={() => this.subscribe(this.user)} className="btn btn-success w-100 mb-2">
          Motta oppdateringer på e-post
        </button>
      );
      this.user_id = this.user.user_id;
    } else {
      button = (
        <button type="button" onClick={() => this.unsubscribe(this.user)} className="btn btn-danger w-100 mb-2">
          Slutt å motta oppdateringer på e-post
        </button>
      );
      this.user_id = this.user.user_id;
    }

    if(this.loaded){
    return (
        <div className="row">
            <div className="col-md-2"/>
            <div className="col-md-8">
                <div id="user-edit-page">
                    <div id="main-form" className="col">
                        <h2>Rediger din profil</h2>
                        <div className="form-group">
                            Navn:{" "}
                            <input className={"form-control " + this.Nameinputtype} type="text" name="name" defaultValue={this.user.name} onChange={event => (this.user.name = event.target.value)}/>
                            <div className="invalid-feedback">Ugydig Navn</div>
                        </div>
                        <div className="form-group">
                            Adresse:{" "}
                            <input className={"form-control " + this.AddressInputClass} type="text" defaultValue={this.user.address} name="address" onChange={event => (this.user.address = event.target.value, console.log(this.user.address))}/>
                            <div className="invalid-feedback">Ugydig Adresse</div>
                        </div>
                        <div className="form-group">Postnummer:{" "}
                        <input className={"form-control " + this.ZipcodeInputClass} type="text" defaultValue = {this.state.zip} maxLength ="4" name="zipcode" onChange={this.changeZip}/>
                            <div className="invalid-feedback">Ugydig Postnummer</div>
                            <p color="red">{this.state.zipinfo} </p>
                        </div>
                        <div className="form-group">Telefon:{" "}
                        <input className={"form-control " + this.inputstatus} type="text" name="tel" defaultValue={this.state.tel} maxLength ="8" onChange={this.changeVal}/>
                            <div className="invalid-feedback">Ugydig telefon</div>
                            <div className="text-muted">{this.state.telinfo} </div>
                        </div>
                        <div className="form-group">Email:{" "}
                        <input className={"form-control " + this.Emailinputtype} id="validationServer03" type="email" defaultValue={this.user.email} name="email" onChange={event => (this.user.email = event.target.value)}/>
                            <div className="invalid-feedback">Ugydig Email</div>
                        </div>
                        {button}
                        <Button.Success onClick={() => this.save(this.user,this.state)}>Save</Button.Success>
                        <button type="button" className="btn btn-info" onClick={() => history.push('/profile/'+this.user.user_id)}>Cancel</button>
                    </div>
                    <div id="main-image" className="col min-side-rediger-bilde-div">
                        <img className="min-side-rediger-bilde" src={ require('./resources/hverdagshelt.png') } alt="hverdagshelt"/>
                    </div>
                </div>
            </div>
            <div className="col-md-2"/>
        </div>

    );
    } else {
      return (
        <Loading />
      )
    }
  }


    componentDidMount(){
    // this.userid = sessionStorage.getItem("userid");
        userService
            .getUserByToken()
                .then(user => {
                    console.log("User info: " , user);
                    this.user = user[0];
                    this.state.tel = this.user.tel;
                    this.state.zip = this.user.zipcode;
                    this.loaded = true;
                    this.forceUpdate();
                })
                .catch((error: Error) => console.log(error.message));
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
      .catch((error: Error) => console.log(error.message));
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
      .catch((error: Error) => console.log(error.message));
  }

  save(user){
    console.log("this.user" ,user);
    if(user.name==""){
      this.Nameinputtype = "is-invalid";
      this.bilde ="https://visualpharm.com/assets/747/Cancel-595b40b75ba036ed117d57c5.svg";
      this.forceUpdate();
    }else if(!isEmail(this.user.email)){
      this.state.mailinfo = "Ugyldig e-post";
      this.Emailinputtype = "is-invalid";
      this.bilde ="https://visualpharm.com/assets/747/Cancel-595b40b75ba036ed117d57c5.svg";
      this.forceUpdate();
      console.log("Ugyldig e-post");
    }else if(user.address==""){
      this.AddressInputClass = "is-invalid";
      this.bilde ="https://visualpharm.com/assets/747/Cancel-595b40b75ba036ed117d57c5.svg";
      this.forceUpdate();
    }else if(user.zipcode.length<4){
      this.ZipcodeInputClass = "is-invalid";
      this.bilde ="https://visualpharm.com/assets/747/Cancel-595b40b75ba036ed117d57c5.svg";
      this.forceUpdate();
    }else if(user.tel.length<8){
      this.inputstatus = "is-invalid";
      this.bilde ="https://visualpharm.com/assets/747/Cancel-595b40b75ba036ed117d57c5.svg";
      this.forceUpdate();
    }else{
    userService
      .updateMyUserInfo(user)
      .then(()=>{
          console.log("happy");
          this.bilde ="https://visualpharm.com/assets/191/Checked%20User%20Male-595b40b75ba036ed117d6ed4.svg";
          this.Emailinputtype = "is-valid";
          this.inputstatus = "is-valid";
          this.Nameinputtype = "is-valid";
          this.AddressInputClass = "is-valid";
          this.ZipcodeInputClass = "is-valid";
          history.push("/user");
          setTimeout(function(){window.location.reload()}.bind(this),2000);
        })
      .catch((error: Error) => {
        console.log(error.message);
        this.bilde ="https://visualpharm.com/assets/747/Cancel-595b40b75ba036ed117d57c5.svg";
        this.forceUpdate();
      })
    }
  }
}
