//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import { geoService, orgService } from "../services";
import { Alert, Card, ListGroup, Row, Column, Button, Form, Loading} from './widgets';

const history = createHashHistory();

function isEmail(str){
  let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return reg.test(str);
}

class Employee{
  name: string;
  tel: string;
  email: string;
  commune: string;
  county: string;
}

export default class OrgEdit extends Component {

  loaded = false;

  bilde = "https://img.icons8.com/android/1600/user.png";
  user = {};
  commune = "";
  communes = [];
  communeOptions = [];

  componentDidMount(){
   // this.userid = sessionStorage.getItem("userid");
    orgService
      .getOrganizationByToken()
      .then(user => {
        console.log("User info: " , user);
        console.log(user[0]);
        this.user = user[0];
        console.log("id: " + this.user.org_id);
        this.loaded = true;
        this.forceUpdate();
      })
      .catch((error: Error) => console.log(error.message));
  }

  /*<div className="jumbotron">
    <div className="container text-center">
      <h4>Edit</h4>
      </div>
  </div>*/

  render(){
    if(this.loaded){
      return (
          <div className="row">
              <div className="col-md-2"/>
              <div className="col-md-8">
                  <div id="user-edit-page">
                      <div id="main-form" className="col">
                          <h2>Rediger din profil</h2>
                          <div className="form-group">Organisasjonsnummer:
                              <input id="org-edit-number" className="form-control" type="number" defaultValue = {this.user.organizationnumber} name="organizationnumber" onChange={event => (this.user.organizationnumber = event.target.value)}/>
                          </div>
                          <div className="form-group">Navn:
                              <input id="org-edit-name" className="form-control" type="text" name="name" defaultValue={this.user.name} onChange={event => (this.user.name = event.target.value)}/></div>
                          <div className="form-group">Mobil:
                              <input id="org-edit-tel" className="form-control" type="number" defaultValue={this.user.tel} name="tel" onChange={event => (this.user.tel = event.target.value)}/>
                          </div>
                          <div className="form-group">Epost:
                              <input id="org-edit-email" className="form-control" type="email" defaultValue = {this.user.email} name="zipcode" onChange={event => (this.user.email = event.target.value)}/>
                          </div>
                          <Button.Success onClick={() => this.save()}>Lagre</Button.Success>
                          <Button.Light onClick={() => history.push('/admin/'+this.user.user_id)}>Avbryt</Button.Light>
                      </div>

                      <div className="col min-side-rediger-bilde-div">
                          <img className="min-side-rediger-bilde" src={ require('./resources/bedriftsansatt.png') } alt="kommuneansatt" />
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

  async save(){
    console.log("info:",this.user);
    //validForm keeps track of whether the data is valid to be used for updating the database
    let validForm = true;

    //Client side form checks
    if(this.user.organizationnumber == ""){
      validForm = false;
      document.getElementById("org-edit-number").style.borderColor = "red";
      console.error("Invalid org.number");
    }
    if(this.user.name.trim().length === 0){
      validForm = false;
      document.getElementById("org-edit-name").style.borderColor = "red";
      console.error("Invalid name");
    }
    if(this.user.tel == ""){
      validForm = false;
      document.getElementById("org-edit-tel").style.borderColor = "red";
      console.error("Invalid tel");
    }

    if(!isEmail(this.user.email)){
      validForm = false;
      document.getElementById("org-edit-email").style.borderColor = "red";
      console.error("Invalid email");
    }

    if(!validForm){
      this.bilde ="https://visualpharm.com/assets/747/Cancel-595b40b75ba036ed117d57c5.svg";
      document.getElementById("employee-edit-image").src = this.bilde;
      return;
    }

    orgService
      .updateOrgByToken(this.user)
      .then(response =>{
          console.log(response);
          window.location.reload();
      })
      .catch((error: Error) => (console.log(error.message)));

  }

}
