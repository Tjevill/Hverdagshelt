//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import { employeeService } from "../services";
import { Alert, Card, NavBar, ListGroup, Row, Column, Button, Form, Loading} from './widgets';

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

  userid = -1;
  name = "";
  tel = 0;

  render(){
    if(this.loaded){
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
              className={"form-control " + this.Nameinputtype}
              type="text"
              name="name"
              defaultValue={""}
              onChange={event => (this.user.name = event.target.value)}
            />
          </div>
          <div className="form-group">
            Mobil:{" "}
            <input
            className={"form-control " + this.AddressInputClass}
              type="text"
              defaultValue={""}
              name="address"
              onChange={event => (this.user.address = event.target.value, console.log(this.user.address))}
            />
          </div>
          <div className="form-group">
            Epost:{" "}
            <input
            className={"form-control"}
              type="text"
              defaultValue = {""}
              maxLength ="4"
              name="zipcode"
              onChange={this.changeZip}
            />
          </div>
          <div className="form-group">
            Kommune:{" "}
            <input
            className={"form-control " + this.inputstatus}
              type="text"
              name="tel"
              defaultValue={""}
              maxLength ="8"
              onChange={this.changeVal}
            />
            <div className="invalid-feedback">Ugydig telefon</div>
          </div>
          <div className="form-group">
            Fylke:{" "}
            <input
              className={"form-control"}
              id="validationServer03"
              type="email"
              defaultValue={""}
              name="email"
              onChange={event => (this.user.email = event.target.value)}
            />
            <div className="invalid-feedback">Ugydig Email</div>
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
      </>
      );
    } else {
      return (
        <Loading />
      )
    }
  }


  componentDidMount(){
    this.userid = sessionStorage.getItem("userid");
    console.log("id: " + this.userid);
    this.loaded = true;
    employeeService
      .getOne(this.userid)
      .then(user => {
        console.log(user);
        this.forceUpdate();
        this.loaded = true;
      })
      .catch((error: Error) => Alert.danger(error.message));
  }

  save(){

  }

}
