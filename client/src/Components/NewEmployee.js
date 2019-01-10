// @flow

import * as React from "react";
import { Component } from "react-simplified";
import { employeeService } from "../services";
import { userService } from "../services";
import createHashHistory from "history/createHashHistory";


export default class Register extends Component {
  user = [];

  message = " ";
  passworderror = " ";

    fylker = [];
    kommuner = [];

  state = {

    name: "Odd Ronny Grustak",
    tel: "24681012",
    email: "oddronny@gmail.com",
    district: "",
    province: "",
    password: "abcd1234",
    password2: "abcd1234"
  };


    componentDidMount() {
        userService
            .getDistricts()
            .then(response => {
                this.fylker = response;
                console.log("fylker: ", this.fylker);
            })

            .catch(
                (error: Error) =>
                (this.message = error.message)
            );
    }

    handleChangeFylke = event => {

        console.log("FYLKE VALGT: " + event.target.value)

        this.state.district = event.target.value;

        userService
            .getProvince(event.target.value)
            .then(response => {
                this.kommuner = response;
                console.log("kommuner: ", this.kommuner);
            })
            .catch(
                (error: Error) =>
                    (this.message = error.message)
            );

    }

    handleChangeKommune = event => {
        this.state.province = event.target.value;

    }

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

      this.state.province = event.target.value;


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
      <div className="NyAnsatt">
        <h1>Registrer ny ansatt</h1>

        <div className="form-group">
          Navn:{" "}
          <input
          className="form-control"
            type="text"
            name="name"
            defaultValue="Odd Ronny Grustak"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          Telefon:{" "}
          <input
          className="form-control"
            type="text"
            defaultValue="24681012"
            name="tel"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          Email:{" "}
          <input
          className="form-control"
            type="text"
            defaultValue="oddronny@gmail.com"
            name="email"
            onChange={this.handleChange}
          />
        </div>
          <div className="form-group">
              Velg fylke:{" "}
              <select className="form-control" name="fylke" id="fylke" onChange={this.handleChangeFylke}>
                  <option>>> Velg fylke</option>
                  {this.fylker.map(fylke => {
                      return (<option value={fylke.ID}>{fylke.navn}</option>)
                  })}
              </select>
          </div>
          <div className="form-group">
              Velg kommune:{" "}
              <select className="form-control" name="kommune" id="kommune" onChange={this.handleChangeKommune}>
                  <option>>>Velg kommune</option>
                  {this.kommuner.map(kommuner => {
                      return (<option value={kommuner.ID}>{kommuner.navn}</option>)
                  })}
              </select>
          </div>
          <div className="form-group">
          Passord:{" "}
          <input
          className="form-control"
            type="password"
            defaultValue="abcd1234"
            name="password"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          Gjenta Passord:{" "}
          <input
            className="form-control"
            type="password"
            defaultValue="abcd1234"
            name="password2"
            onChange={this.handleChange}
          />
        </div>
        <h3>{this.passworderror}</h3>

        <button type="button" onClick={this.save} className="btn btn-primary">
          Save
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
        tel: this.state.tel,
        email: this.state.email,
        district: this.state.district,
        province: this.state.province,
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
