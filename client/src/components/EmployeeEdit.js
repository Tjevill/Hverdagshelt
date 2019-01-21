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
                    id="commune-input"
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
                <img src={this.bilde} width="200"/>
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
    let communeField = document.getElementById("commune-input");
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
    for(let i = 0; i < this.communes.length; i++){
      if(this.communes[i].navn === this.commune){
        found = true;
        commune = this.communes[i].ID;
        county = this.communes[i].fylke_id;
        break;
      }
    }

    //Checks if commune and county exists in database and sets the values of to the user
    console.log(found, commune);
    if(found && commune != -1){
      this.user.commune = commune;
      this.user.county = county
      console.log(this.user);
    } else {
      validForm = false;
      console.error("Invalid commune");
    }

    //Client side form checks
    if(this.user.name.trim().length === 0){
      validForm = false;
      console.error("Invalid name");
    }
    if(this.user.tel == ""){
      validForm = false;
      console.error("Invalid tel");
    }
    console.log(this.user.email);
    if(!isEmail(this.user.email)){
      validForm = false;
      console.error("Invalid email");
    }

    if(!validForm){
      return;
    }

    employeeService.updateEmpData(this.user);
    window.location.reload();

  }

}
