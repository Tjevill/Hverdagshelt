  // @flow

import * as React from "react";
import { Component } from "react-simplified";
import {employeeService, userService, orgService} from "../services";
import createHashHistory from "history/createHashHistory";

export default class Register extends Component {
  user = [];
  emails = [];
  orgEmails = [];
  stateEmails = [];

  message = " ";
  passworderror = " ";
  nameValid = '';
  addressValid = '';
  zipValid = '';
  telValid = '';
  emailValid = '';
  passwordValid = '';
  matchValid = '';



  state = {
    name: "",
    address: "",
    zipcode: "",
    tel: "",
    email: "",
    password: "",
    password2: "",
    subscription: true
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;


    this.setState((state, props) => ({
        [name]: value
    }));

//     console.log(this.state);
  };

    hasNumber(myString) {
        return /\d/.test(myString);
    }

    onlyNumber(myString) {
      return /^\d+$/.test(myString);
    }

    isEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }



  render() {
    if (!this.user) return null;

    return (

        <div id="register-page" className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">

      <div className="Registrer">
        <h1>Registrer deg</h1>

        <div className="form-group">
          Navn:{" "}
          <input
          className={"form-control " + this.nameValid}
            type="text"
            name="name"
            defaultValue=""
            onChange={this.handleChange}
          />
            <div className="invalid-feedback">Ugyldig navn</div>
        </div>
        <div className="form-group">
          Adresse:{" "}
          <input
              className={"form-control " + this.addressValid}
            type="text"
            defaultValue=""
            name="address"
            onChange={this.handleChange}
          />
            <div className="invalid-feedback">Ugyldig adresse</div>
        </div>
        <div className="form-group">
          Postnummer:{" "}
          <input
              className={"form-control " + this.zipValid}
            type="text"
            defaultValue=""
            name="zipcode"
            maxLength="4"
            onChange={this.handleChange}
          />
            <div className="invalid-feedback">Ugyldig postnummer</div>
        </div>
        <div className="form-group">
          Telefon:{" "}
          <input
              className={"form-control " + this.telValid}
            type="text"
            defaultValue=""
            name="tel"
          maxLength="8"
            onChange={this.handleChange}
          />
            <div className="invalid-feedback">Ugyldig telefonnummer</div>
        </div>
        <div className="form-group">
          Email:{" "}
          <input
              className={"form-control " + this.emailValid}
            type="email"
            defaultValue=""
            name="email"
          value={this.state.email}
            onChange={this.handleChange}
          />
            <div className="invalid-feedback">Ugyldig email, eller så har noen allerede registrert seg med denne emailen</div>
        </div>
        <div className="form-group">
          Passord:{" "}
          <input
              className={"form-control " + this.passwordValid}
            type="password"
            defaultValue=""
            name="password"
            onChange={this.handleChange}
          /><div className="invalid-feedback">Passord må bestå av minst 8 tegn</div>

        </div>
        <div className="form-group">
          Gjenta Passord:{" "}
          <input
              className={"form-control " + this.matchValid}
            type="password"
            defaultValue=""
            name="password2"
            onChange={this.handleChange}
          />
            <div className="invalid-feedback">Passordene må matche</div>
        </div>
        <h3>{this.passworderror}</h3>
        <div className="form-group">
        <label htmlFor="subscription">Vil du motta informasjon om events på mail?</label>
        <input
          className="form-control"
          name="subscription"
          type="checkbox"
          checked={this.state.subscription}
          onChange={this.handleChange} />{" "}

        </div>
        <button id="save" type="button" onClick={this.save} className="btn btn-primary">
          Lagre og send
        </button>
        <h1 className="abcd">{this.message}</h1>
      </div>

        </div>
      <div className="col-sm-4"></div>
      </div>

    );
  }


  componentDidMount() {
        userService.getAllUsers()
            .then(response => {
                response.map(item => {
                this.emails.push(item.email);
            });
            console.log(this.emails);
            });
        orgService.getAllOrg()
            .then(response => {
                response.map(item => {
                this.orgEmails.push(item.email);
              })
                console.log(this.orgEmails);
          });
        employeeService.getAll()
            .then(response => {
                response.map(item => {
                    this.stateEmails.push(item.email);
                })
                console.log(this.stateEmails);
            })
  }


  save() {
    if (!this.user) {
      console.log("Returning null!");
      this.message = "Error";
      return null;
    }

    this.state.email = this.state.email.toLowerCase();




        if(this.hasNumber(this.state.name)) {
          this.nameValid = "is-invalid";
            return null;
        } else if (this.state.name == '') {
          this.nameValid = "is-invalid";
            return null;
        } else {
          this.nameValid = '';
        }
        if(this.state.address == '') {
          this.addressValid = "is-invalid";
          return null;
        } else {
          this.addressValid = '';
        }
        if (!this.onlyNumber(this.state.zipcode)) {
          this.zipValid = "is-invalid";
          return null;
        } else if (!(this.state.zipcode.length == 4)) {
          this.zipValid = "is-invalid";
            return null;
        } else {
          this.zipValid = '';
        }

        if(!this.onlyNumber(this.state.tel)) {
          this.telValid = "is-invalid";
          return null;
        } else if (!(this.state.tel.length == 8)) {
          this.telValid = "is-invalid";
          return null;
        } else {
          this.telValid = '';
        }

        if(!this.isEmail(this.state.email)) {
          this.emailValid = "is-invalid";
          return null;
        } else {
          this.emailValid = '';
        }

          if (this.emails.includes(this.state.email)
              || this.orgEmails.includes(this.state.email)
              || this.stateEmails.includes(this.state.email)) {
              this.emailValid = "is-invalid";
              return null;
          } else {
              this.emailValid = '';
          }

          if (this.state.password.length < 8) {
              this.passwordValid = "is-invalid";
              return null;
          } else {
              this.passwordValid = "";
          }

        if (this.state.password != this.state.password2) {
          this.matchValid = "is-invalid";
          return null;
        } else {
          this.matchValid = "";
        }





    const brukerdata = {
      name: this.state.name,
      address: this.state.address,
      zipcode: this.state.zipcode,
      tel: this.state.tel,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      subscription: this.state.subscription
    };

        if (this.password != this.password2) {
          this.message = "Passwords do not match.";
        }


    //   this.message = "Artikkel lagt inn!";
    console.log("this user: ", brukerdata);
    userService
      .addUser(brukerdata)
      .then(response => {
        // history.push("/artikler/" + response.insertId);
        console.log("hmm: ", response);
      })
      .catch(
        (error: Error) =>
          //console.log("Error message: " + error.message)
          (this.message = error.message)
      );

      window.location = "#login";
  }
}
