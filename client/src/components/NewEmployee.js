// @flow

import * as React from "react";
import { Component } from "react-simplified";
import { employeeService } from "../services";
import { userService } from "../services";
import createHashHistory from "history/createHashHistory";

const history = createHashHistory();

function isEmail(str) {
  var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return reg.test(str);
}

export default class NewEmployee extends Component {
  user = [];
  _value = " ";

  message = " ";
  passworderror = " ";
  telinfo = " ";

  communes = [];
  counties = [];

  state = {
    name: "",
    tel: "",
    email: "",
    county: "",
    commune: "",
    password: "",
    password2: ""
  };

  messagewarn = {
    password1: "",
    password2: "",
    commune: "",
    email: "",
    tel: "",
    name: ""
  };

  validstatus = {
    password1: "",
    password2: "",
    email: "",
    commune: "",
    tel: "",
    name: ""
  };

  componentDidMount() {
    userService
      .getDistricts()
      .then(response => {
        this.counties = response;
        console.log("fylker: ", this.counties);
      })

      .catch((error: Error) => (this.message = error.message));
  }

  handleChangeFylke = event => {
    console.log("FYLKE VALGT: " + event.target.value);

    this.state.county = event.target.value;

    userService
      .getProvince(event.target.value)
      .then(response => {
        this.communes = response;
        console.log("kommuner: ", this.communes);
      })
      .catch((error: Error) => (this.message = error.message));
  };

  handleChangeKommune = event => {
    console.log("Commune : " + event.target.value);
    this.state.commune = event.target.value;
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState((state, props) => ({
      [name]: value
    }));

    //     console.log(this.state);
  };

  changeNr = event => {
    const target = event.target;
    var value = target.value;
    const name = target.name;
    if (isNaN(value)) {
      value = this._value;
      this.messagewarn.tel = "kun skriv inn nummer";
      this.validstatus.tel = "is-invalid";
      setTimeout(
        function() {
          this.messagewarn.tel = "";
          this.validstatus.tel = "";
          document.getElementById("tel").value = this._value;
        }.bind(this),
        500
      );
    } else {
      this._value = value;
    }
    this.setState({ tel: value });
  };

  render() {
    if (!this.user) return null;

    return (
      <div className="row">
        <div className="col-sm-4" />
        <div className="col-sm-4">
          <div className="NyAnsatt">
            <h1>Registrer ny ansatt</h1>

            <div className="form-group">
              Navn:{" "}
              <input
                className={"form-control " + this.validstatus.name}
                type="text"
                name="name"
                defaultValue=""
                onChange={this.handleChange}
              />
              <div className="invalid-feedback">{this.messagewarn.name}</div>
            </div>
            <div className="form-group">
              Telefon:{" "}
              <input
                className={"form-control " + this.validstatus.tel}
                type="text"
                defaultValue=""
                maxLength="8"
                id="tel"
                name="tel"
                onChange={this.changeNr}
              />
              <div className="invalid-feedback">{this.messagewarn.tel}</div>
              <p>{this.telinfo}</p>
            </div>
            <div className="form-group">
              Email:{" "}
              <input
                className={"form-control " + this.validstatus.email}
                type="text"
                defaultValue=""
                name="email"
                onChange={this.handleChange}
              />
              <div className="invalid-feedback">{this.messagewarn.email}</div>
            </div>
            <div className="form-group">
              Velg fylke:{" "}
              <select
                className="form-control"
                name="county"
                id="county"
                onChange={this.handleChangeFylke}
              >
                <option>>> Velg fylke</option>
                {this.counties.map(fylke => {
                  return <option value={fylke.ID}>{fylke.navn}</option>;
                })}
              </select>
            </div>
            <div className="form-group">
              Velg kommune:{" "}
              <select
                className={"form-control " + this.validstatus.commune}
                name="commune"
                id="commune"
                onChange={this.handleChangeKommune}
              >
                <option>>>Velg kommune</option>
                {this.communes.map(kommuner => {
                  return <option value={kommuner.ID}>{kommuner.navn}</option>;
                })}
              </select>
              <div className="invalid-feedback">{this.messagewarn.commune}</div>
            </div>
            <div className="form-group">
              Passord:{" "}
              <input
                className={"form-control " + this.validstatus.password1}
                type="password"
                defaultValue=""
                name="password"
                onChange={this.handleChange}
              />
              <div className="invalid-feedback">
                {this.messagewarn.password1}
              </div>
            </div>
            <div className="form-group">
              Gjenta Passord:{" "}
              <input
                className={"form-control " + this.validstatus.password2}
                type="password"
                defaultValue=""
                name="password2"
                onChange={this.handleChange}
              />
              <div className="invalid-feedback">
                {this.messagewarn.password2}
              </div>
            </div>
            <h3>{this.passworderror}</h3>

            <button
              type="button"
              onClick={this.save}
              className="btn btn-primary"
            >
              Lagre
            </button>
            <button
              type="button"
              onClick={()=>history.push("/admin/kommune/")}
              className="btn btn-secondary"
            >
              Avbryt
            </button>
            <h1>{this.message}</h1>
          </div>
        </div>
        <div className="col-sm-4" />
      </div>
    );
  }

  save() {
    let pass = this.state.password;
    let passlength = pass.length;
    let minlength = 8;
    let name = this.state.name;
    let tel = this.state.tel;
    let email = this.state.email;
    this.validstatus.name = " ";
    this.validstatus.tel = " ";
    this.validstatus.email = " ";
    this.validstatus.password1 = "";
    this.validstatus.password2 = "";
    this.messagewarn.commune = " ";
    this.validstatus.commune = " ";

    if (!this.user) {
      console.log("Returning null!");
      this.message = "Error";
      return null;
    }

    if (name == "") {
      this.messagewarn.name = "Feltet kan ikke være null";
      this.validstatus.name = "is-invalid";
      return null;
    }
    if (tel == "") {
      this.messagewarn.tel = "Feltet kan ikke være null";
      this.validstatus.tel = "is-invalid";
      return null;
    }

    if (email == "") {
      this.messagewarn.email = "Feltet kan ikke være null";
      this.validstatus.email = "is-invalid";
      return null;
    }

    if (!isEmail(email)) {
      this.messagewarn.email = "Ugydig email";
      this.validstatus.email = "is-invalid";
      return null;
    }

    if (this.state.commune == "") {
      this.messagewarn.commune = " må valge et kommune";
      this.validstatus.commune = "is-invalid";
    }

    if (this.state.password != this.state.password2) {
      this.messagewarn.password1 = "Passordene matcher ikke.";
      this.messagewarn.password2 = "Passordene matcher ikke.";
      this.validstatus.password1 = "is-invalid";
      this.validstatus.password2 = "is-invalid";
      return null;
    } else {
      this.passworderror = "";
    }

    if (passlength < minlength) {
      this.messagewarn.password1 = "Passordet er for kort";
      this.validstatus.password1 = "is-invalid";
      return null;
    } else {
      this.passworderror = "";
    }

    const brukerdata = {
      name: this.state.name,
      tel: this.state.tel,
      email: this.state.email,
      county: this.state.county,
      commune: this.state.commune,
      password: this.state.password,
      password2: this.state.password2
    };

    if (this.password != this.password2) {
      this.message = "Passwords do not match.";
    }

    //   this.message = "Artikkel lagt inn!";
    console.log("this user: ", brukerdata);
    employeeService
      .addEmployee(brukerdata)
      .then(response => {
        history.push("/admin/kommune");
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
