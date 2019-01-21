//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import { geoService, employeeService } from "../services";
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

export default class EmployeeEdit extends Component {

  loaded = false;

  bilde = "https://img.icons8.com/android/1600/user.png";
  user = {};
  commune = "";
  communes = [];
  communeOptions = [];

  componentDidMount(){
    this.userid = sessionStorage.getItem("userid");
    console.log("id: " + this.userid);
    employeeService
      .getOne(this.userid)
      .then(user => {
        console.log(user[0]);
        this.user = user[0];
        geoService
          .getCommunesKommune()
          .then(communes => {
              this.communes = communes;
              for(let i = 0; i < communes.length; i++){
                if(communes[i].ID == this.user.commune){
                  this.commune = communes[i].navn;
                  break;
                }
              }
              //this.commune = communes[this.user.commune - 1].province;
              this.loaded = true;
              this.forceUpdate();
          })
          .catch((error: Error) => Alert.danger(error.message));
      })
      .catch((error: Error) => Alert.danger(error.message));
  }

  /*<div className="jumbotron">
    <div className="container text-center">
      <h4>Edit</h4>
      </div>
  </div>*/

  render(){
    if(this.loaded){
      return (
        <div id="employee-edit-page">
          <div className="container text-center">
            <div className="row">
              <div className="col">
                <div className="form-group">
                  Navn:{" "}
                  <input
                    id="emp-edit-name"
                    className={"form-control"}
                    type="text"
                    name="name"
                    defaultValue={this.user.name}
                    onChange={event => (this.user.name = event.target.value)}
                  />
                </div>
                <div className="form-group">
                  Mobil:{" "}
                  <input
                    id="emp-edit-tel"
                    className={"form-control"}
                    type="number"
                    defaultValue={this.user.tel}
                    name="tel"
                    onChange={event => {
                      if(event.target.value.length > 8) {
                        event.target.value = (event.target.value-(event.target.value%10))/10;
                      }
                      this.user.tel = event.target.value;
                    }}
                  />
                </div>
                <div className="form-group">
                  Epost:{" "}
                  <input
                    id="emp-edit-email"
                    className={"form-control"}
                    type="email"
                    defaultValue = {this.user.email}
                    name="zipcode"
                    onChange={event => (this.user.email = event.target.value)}
                  />
                </div>
                <div className="form-group">
                  Kommune:{""}
                  <input
                    id="emp-edit-commune"
                    className={"form-control"}
                    type="text"
                    defaultValue = {this.commune}
                    name="zipcode"
                    onChange={event => {
                      this.commune = event.target.value;
                      this.changeCommune(event);
                    }}
                  />
                </div>

                <div className="card" style={{minWidth: "19rem", width: "100%"}}>
                  <ul className="list-group list-group-flush" style={{marginBottom: "0", width: "100%"}}>
                    {
                      this.communeOptions.map(
                        commune => (
                          <li key={commune} className="list-group-item commune-option" onClick={(event) => this.confirmCommune(event, commune)}>{commune}</li>
                        )
                      )
                    }
                  </ul>
                </div>

                <Button.Success onClick={() => this.save()}>Lagre</Button.Success>
                <Button.Light onClick={() => history.push('/admin/'+this.user.user_id)}>Avbryt</Button.Light>
              </div>
              <div className="col">
                <br/><br/><br/><br/>
                <img id="employee-edit-image" src={this.bilde} width="200"/>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <Loading />
      )
    }
  }

  changeCommune(event){
    if(event.target.value === ""){
      this.communeOptions = [];
      this.forceUpdate();
      return;
    }
    let options = []
    this.communes.map(
      commune => {
        if(commune.navn.toUpperCase().includes(event.target.value.toUpperCase())
        && !options.includes(commune.navn)){
          options.push(commune.navn);
        }
      }
    );
    //console.log(options);
    this.communeOptions = options.sort().slice(0, 3);
    //console.log(this.communeOptions);
    this.forceUpdate();
  }

  confirmCommune(event, commune){
    this.commune = commune;
    this.communeOptions = [];
    let communeField = document.getElementById("emp-edit-commune");
    communeField.value = commune;
    this.forceUpdate();
  }

  async save(){

    //validForm keeps track of whether the data is valid to be used for updating the database
    let validForm = true;
    let found = false
    let commune = -1;
    let county = -1;

    //Sets user commune and county based on commune name from input
    //console.log(this.communes);
    for(let i = 0; i < this.communes.length; i++){
      if(this.communes[i].navn === this.commune){
        found = true;
        commune = this.communes[i].ID;
        county = this.communes[i].fylke_id;
        break;
      }
    }

    //Checks if commune and county exists in database and sets the values of to the user
    //console.log(found, commune);
    if(found && commune != -1){
      this.user.commune = commune;
      this.user.county = county
    } else {
      validForm = false;
      document.getElementById("emp-edit-commune").style.borderColor = "red";
      console.error("Invalid commune");
    }

    //Client side form checks
    if(this.user.name.trim().length === 0){
      validForm = false;
      document.getElementById("emp-edit-name").style.borderColor = "red";
      console.error("Invalid name");
    }
    if(this.user.tel == ""){
      validForm = false;
      document.getElementById("emp-edit-tel").style.borderColor = "red";
      console.error("Invalid tel");
    }

    if(!isEmail(this.user.email)){
      validForm = false;
      document.getElementById("emp-edit-email").style.borderColor = "red";
      console.error("Invalid email");
    }

    if(!validForm){
      this.bilde ="https://visualpharm.com/assets/747/Cancel-595b40b75ba036ed117d57c5.svg";
      document.getElementById("employee-edit-image").src = this.bilde;
      return;
    }

    employeeService.updateEmpData(this.user);
    window.location.reload();

  }

}
