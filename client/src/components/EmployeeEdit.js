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
          .getAllCommunes()
          .then(communes => {
              console.log(communes);
              this.communes = communes;
              this.commune = communes[this.user.commune - 1].province;
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
                      event.target.value = event.target.value.toUpperCase();
                      this.changeCommune(event);
                      this.commune = event.target.value;
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
        if(commune.province.includes(event.target.value.toUpperCase())
        && !options.includes(commune.province)){
          options.push(commune.province);
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
    //console.log(communeField);
    communeField.value = commune;
    this.forceUpdate();
  }

  save(){
    let found = false
    let commune = {};
    console.log(this.communes);
    this.communes.map( commune => {
      if(commune.province === this.commune) {
        found = true;
        return;
      }
    })
    console.log(found);

  }

}
