// @flow

import * as React from "react";
import { Component } from "react-simplified";
import { userService } from "../src/services";

export default class Login extends Component {
  login = [];
  message = "";

  response = "";

  state = {
    username: "",
    password: ""
  };


  /*

    function refreshToken() {
        const myHeaders = new Headers();

        myHeaders.append('x-access-token', sessionStorage.getItem('storedtoken'));
        myHeaders.append('Content-Type', 'application/json; charset=utf-8');

        let url = 'http://localhost:8080/refreshtoken';
        let fetchData = {
            method: 'POST',
            headers: myHeaders
        }

        fetch(url, fetchData)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let mytoken = myJson.jwt;
                sessionStorage.setItem('storedtoken', mytoken);
                if (mytoken != undefined) {
                    console.log("Refreshtoken: Token refreshed!");
                    return true;
                }
                else {
                    console.log("Refreshtoken: Mangler token. Kan ikke refreshe");
                    return false;
                }
            });
    }


w
*/

    handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });

    console.log(this.state);
  };

  render() {
    if (!this.login) return null;

    return (

        <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">


            <form>
        <h1>Logg inn</h1>

        <div className="form-group">
          Brukernavn:{" "}
          <input
              className="form-control"
            type="text"
            name="username"
            defaultValue=""
            onChange={this.handleChange}
          />
        </div>
        <div className="formitem">
          Passord:{" "}
          <input
              className="form-control"
            type="password"
            defaultValue=""
            name="password"
            onChange={this.handleChange}
          />
        </div>

        <button type="button" onClick={this.save} className="btn btn-primary">
          Login
        </button>
        <h4>{this.message}</h4>
      </form>

                <button type="button" className="login100-form-btn" onClick={this.refreshToken}>Refresh token</button>
        </div>
      <div className="col-sm-4"></div>
      </div>
    );
  }

  save() {
    if (!this.login) {
      return null;
    }

    const login = {
      username: this.state.username,
      password: this.state.password
    };

    console.log(" ------ ");
    this.message = "Login successful";
    console.log("this login: ", login);
    userService
      .login(login)
      .then(response => {
        this.message = response.reply;
        sessionStorage.setItem("storedtoken", response.jwt);
        console.log("storedtoken: " + sessionStorage.getItem("storedtoken"));
      })
      .catch((error: Error) => {
        if (error.message.includes("401"))
          this.message = "Feil brukernavn eller passord.";
      });
  }
}
