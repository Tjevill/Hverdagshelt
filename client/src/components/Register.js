  // @flow

import * as React from "react";
import { Component } from "react-simplified";
import { userService } from "../services";
import createHashHistory from "history/createHashHistory";

export default class Register extends Component {
  user = [];
  emails = [];

  message = " ";
  passworderror = " ";



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

        <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">

      <div className="Registrer">
        <h1>Registrer deg</h1>

        <div className="form-group">
          Navn:{" "}
          <input
          className="form-control"
            type="text"
            name="name"
            defaultValue=""
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          Adresse:{" "}
          <input
          className="form-control"
            type="text"
            defaultValue=""
            name="address"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          Postnummer:{" "}
          <input
            className="form-control"
            type="text"
            defaultValue=""
            name="zipcode"
            maxLength="4"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          Telefon:{" "}
          <input
          className="form-control"
            type="text"
            defaultValue=""
            name="tel"
          maxLength="8"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          Email:{" "}
          <input
          className="form-control"
            type="email"
            defaultValue=""
            name="email"
          value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          Passord:{" "}
          <input
          className="form-control"
            type="password"
            defaultValue=""
            name="password"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          Gjenta Passord:{" "}
          <input
            className="form-control"
            type="password"
            defaultValue=""
            name="password2"
            onChange={this.handleChange}
          />
        </div>
        <h3>{this.passworderror}</h3>
        <div className="form-group">
        <label htmlFor="subscription">Vil du motta informasjon om events?</label>
        <input
          className="form-control"
          name="subscription"
          type="checkbox"
          checked={this.state.subscription}
          onChange={this.handleChange} />{" "}

        </div>
        <button type="button" onClick={this.save} className="btn btn-primary">
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
            })
  }


  save() {
    if (!this.user) {
      console.log("Returning null!");
      this.message = "Error";
      return null;
    }

    this.state.email = this.state.email.toLowerCase();

        if (this.emails.includes(this.state.email)) {
            this.message = "En bruker har allerede registrert seg med denne mailen";
            return null
        } else {
            this.message = '';
            return null;
        }


        if(this.hasNumber(this.state.name)) {
          this.message = "Navn kan ikke inneholde tall";
            return null;
        } else if (this.state.name == '') {
          this.message = "Navn kan ikke være tomt";
            return null;
        } else {
          this.message = '';
        }
        if(this.state.address == '') {
          this.message = "Adresse kan ikke være tomt";
          return null;
        } else {
          this.message = '';
        }
        if (!this.onlyNumber(this.state.zipcode)) {
          this.message = "Postnummer kan bare bestå av tall";
          return null;
        } else if (!(this.state.zipcode.length == 4)) {
          this.message = "Postnummer må være nøyaktig 4 tall";
            return null;
        } else {
          this.message = '';
        }

        if(!this.onlyNumber(this.state.tel)) {
          this.message = "Telefonnummer kan bare bestå av tall";
          return null;
        } else if (!(this.state.tel.length == 8)) {
          this.message = "Telefonnummer må være nøyaktig 8 tall";
          return null;
        } else {
          this.message = '';
        }

        if(!this.isEmail(this.state.email)) {
          this.message = "Oppgi en gyldig email";
          return null;
        } else {
          this.message = '';
        }

        if (this.state.password != this.state.password2) {
          this.message = "Passordene matcher ikke";
          return null;
        } else {
          this.message = "";
        }

        let pass = this.state.password;
        let passlength = pass.length
        let minlength = 8;

        if (passlength < minlength) {
          this.message = "Passordet er for kort";
          return null;
        } else {
          this.message = "";
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
