// @flow

import * as React from "react";
import { Component } from "react-simplified";
import { userService } from "../services";
import createHashHistory from "history/createHashHistory";

export default class Register extends Component {
  user = [];

  message = " ";
  passworderror = " ";



  state = {
    name: "",
    address: "",
    zipcode: "",
    tel: "",
    email: "",
    username: "",
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
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          Email:{" "}
          <input
          className="form-control"
            type="text"
            defaultValue=""
            name="email"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          Brukernavn:{" "}
          <input
          className="form-control"
            type="text"
            defaultValue=""
            name="username"
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
        <h1>{this.message}</h1>
      </div>

        </div>
      <div className="col-sm-4"></div>
      </div>

    );
  }




  save() {
    if (!this.user) {
      console.log("Returning null!");
      this.message = "Error";
      return null;
    }


        if (this.state.password != this.state.password2) {
          this.passworderror = "Passordene matcher ikke.";
          return null;
        } else {
          this.passworderror = "";
        }

        let pass = this.state.password;
        let passlength = pass.length
        let minlength = 8;

        if (passlength < minlength) {
          this.passworderror = "Passordet er for kort";
          return null;
        } else {
          this.passworderror = "";
        }



    const brukerdata = {
      name: this.state.name,
      address: this.state.address,
      zipcode: this.state.zipcode,
      tel: this.state.tel,
      email: this.state.email,
      username: this.state.username,
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

    // history.push("/admin/legginn");
  }
}
