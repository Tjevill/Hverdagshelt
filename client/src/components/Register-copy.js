// @flow

import * as React from "react";
import { Component } from "react-simplified";
import { userService } from "../services";
import createHashHistory from "history/createHashHistory";

export default class Register extends Component {
  user = [];

    message = "Hm. ";
    passworderror = " ";

    name = "Testdata";
    address = "Testadresse";
    zipcode = "1234";
    tel = "12345678";
    email = "aklsj@asdka.com";
    username = "oyvind";
    password = "blahblah";
    password2 = "blashblah";
    subscription = true;


  render() {
    if (!this.user) return null;

    return (
      <div className="Registrer">
        <h1>Registrer deg</h1>

        <div className="form-group">
          Navn:{" "}
          <input
          className="form-control"
            type="text"
            name="name"
            defaultValue=""
            onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                   (this.article.name= event.target.value)
                 }
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
        <label for="subscription">Vil du motta informasjon om events?</label>
        <input
          className="form-control"
          name="subscription"
          type="checkbox"
          checked={this.subscription}
          onChange={this.handleChange} />{" "}

        </div>
        <button type="button" onClick={this.save} className="btn btn-primary">
          Save
        </button>
        <h1>{this.message}</h1>
      </div>
    );
  }




  save() {
    if (!this.user) {
      console.log("Returning null!");
      this.message = "Error";
      return null;
    }


    const brukerdata = {
      name: this.name,
      address: this.address,
      zipcode: this.zipcode,
      tel: this.tel,
      email: this.email,
      username: this.username,
      password: this.password,
      password2: this.password2,
      subscription: this.subscription
    };


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
