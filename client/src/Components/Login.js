// @flow

import * as React from "react";
import { Component } from "react-simplified";
import { userService } from "../services";

export default class Login extends Component {
  login = [];
  message = "";

  state = {
    username: "",
    password: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });

    console.log(this.state);
  };

  render() {
    if (!this.login) return null;

    return (
      <form>
        <h1>Logg inn</h1>

        <div className="formitem">
          Brukernavn:{" "}
          <input
            type="text"
            name="username"
            defaultValue=""
            onChange={this.handleChange}
          />
        </div>
        <div className="formitem">
          Passord:{" "}
          <input
            type="password"
            defaultValue=""
            name="password"
            onChange={this.handleChange}
          />
        </div>

        <button type="button" onClick={this.save}>
          Login
        </button>
        <h1>{this.message}</h1>
      </form>
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
