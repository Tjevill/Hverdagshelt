// @flow

import * as React from "react";
import { Component } from "react-simplified";
import { categoryService, employeeService, orgService } from "../services";
import { userService } from "../services";
import createHashHistory from "history/createHashHistory";

const history = createHashHistory();

function isEmail(str) {
  var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return reg.test(str);
}

export default class AdminNyBedrift extends Component {
  organization = [];

  message = " ";
  passworderror = " ";

  messagewarn = {
    password1: "",
    password2: "",
    email: "",
    tel: "",
    name: "",
    orgnr: ""
  };

  validstatus = {
    password1: "",
    password2: "",
    email: "",
    tel: "",
    name: "",
    orgnr: ""
  };

  _value = "";
  info = {
    org: "",
    tel: ""
  };

  categories = [];
  conns = [];
  category_ids = [];

  state = {
    organizationnumber: "",
    name: "",
    tel: "",
    email: "",
    password: "",
    password2: ""
  };

  componentDidMount() {
    employeeService
      .getCategories()
      .then(response => {
        console.log("category_id", response.category_id);
        this.categories = response;
        //this.conns = Array.from({length: 5}, (response => response);
        // this.conns.category_id = response.category_id;
        let i;
        for (i = 0; i < response.length; i++) {
          this.conns.push({ catid: response[i].category_id, checked: false });
        }
        console.log("kategorier: ", this.categories);
        console.log("frsh conns: ", this.conns);
      })

      .catch((error: Error) => (this.message = error.message));
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState((state, props) => ({
      [name]: value
    }));

    console.log(this.state);
  };

  handleAllChecked = event => {
    let i;
    for (i = 0; i < this.conns.length; i++) {
      if (this.conns[i].catid == event.target.value) {
        this.conns[i].checked = event.target.checked;
      }
    }
    console.log(event.target.value + " " + event.target.checked);
    console.log("conns: ", this.conns);
  };

  changeNr = event => {
    const target = event.target;
    var value = target.value;
    const name = target.name;

    if (name == "organizationnumber") {
      console.log("org timeee");
      if (isNaN(value)) {
        value = this._value;
        this.messagewarn.orgnr = "kun skriv inn nummer";
        this.validstatus.orgnr = "is-invalid";
        setTimeout(
          function() {
            this.messagewarn.orgnr = "";
            this.validstatus.orgnr = "";
            document.getElementById("organizationnumber").value = this._value;
          }.bind(this),
          500
        );
      } else {
        this._value = value;
      }
      this.setState({ organizationnumber: value });
    } else if (name == "tel") {
      console.log("tel timeee");
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
    }
  };

  render() {
    if (!this.organization) return null;

    return (
      <div className="row">
        <div className="col-sm-4" />
        <div className="col-sm-4">
          <div className="NyAnsatt">
            <h2>Registrer ny bedrift</h2>
            <div className="form-group">
              Organisasjonsnummer:{" "}
              <input
                className={"form-control " + this.validstatus.orgnr}
                id="organizationnumber"
                type="text"
                name="organizationnumber"
                defaultValue=""
                maxLength="9"
                onChange={this.changeNr}
              />
              <div className="invalid-feedback">{this.messagewarn.orgnr}</div>
            </div>
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
                id="tel"
                name="tel"
                maxLength="8"
                onChange={this.changeNr}
              />
              <div className="invalid-feedback">{this.messagewarn.tel}</div>
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

            <div className="form-group">
              {this.categories.map(cat => {
                return (
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox"
                      value={cat.category_id}
                      onClick={this.handleAllChecked}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      {cat.description}
                    </label>
                  </div>
                );
              })}
            </div>

            <h3>{this.passworderror}</h3>
            <p>&nbsp;</p>
            <button
              type="button"
              onClick={this.save}
              className="btn btn-primary"
            >
              Save
            </button>
            <h4>{this.message}</h4>
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
    let email = this.state.email;
    let organizationnumber = this.state.organizationnumber;
    let name = this.state.name;
    let tel = this.state.tel;
    this.validstatus.orgnr = " ";
    this.validstatus.name = " ";
    this.validstatus.tel = " ";
    this.validstatus.email = " ";
    this.validstatus.password1 = "";
    this.validstatus.password2 = "";

    if (!this.organization) {
      console.log("Returning null!");
      this.message = "Error";
      return null;
    }
    if (organizationnumber == "") {
      this.messagewarn.orgnr = "Feltet kan ikke være null";
      this.validstatus.orgnr = "is-invalid";
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



    const orgdata = {
      organizationnumber: this.state.organizationnumber,
      name: this.state.name,
      tel: this.state.tel,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    let i;
    for (i = 0; i < this.conns.length; i++) {
      if (this.conns[i].checked) {
        this.category_ids.push({ catid: this.conns[i].catid });
      }
    }

    console.log("this organization: ", orgdata);
    console.log("these connections: ", this.category_ids);

    orgService
      .addOrganization(orgdata)
      .then(response => {
        console.log("insertID: ", response.insertId);
        console.log("this.category_ids: ", this.category_ids);
        this.validstatus.password1 = "invalid";
        this.validstatus.password2 = "invalid";
        categoryService
          .addOrgCat(this.category_ids, response.insertId)
          .then(response => {
            console.log("2nd response: ", response);
          })
          .catch((error: Error) => (this.message = error.message));
        this.message = "Vellyket!";
        history.push("/admin/bedrift/oversikt/1");
      })
      .catch((error: Error) => (this.message = error.message));
  }
}
