// @flow

import * as React from "react";
import { Component } from "react-simplified";
import { employeeService } from "../services";
import { userService } from "../services";
import createHashHistory from "history/createHashHistory";


export default class AdminNyBedrift extends Component {
  organization = [];

  message = " ";
  passworderror = " ";

    categories = [];
    conns = [];
    category_ids = [];

  state = {
    organizationnumber: "713210329",
    name: "24681012",
      tel: "24681012",
    email: "kaare@propan.no",
    password: "abcd1234",
    password2: "abcd1234"

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
                for (i=0; i < response.length; i++) {
                    this.conns.push({"catid": response[i].category_id, "checked": false});
                }
                console.log("kategorier: ", this.categories);
                console.log("frsh conns: ", this.conns);
            })

            .catch(
                (error: Error) =>
                    (this.message = error.message)
            );
    }

    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        this.setState((state, props) => ({
            [name]: value
        }));

        console.log(this.state);
    };



    handleAllChecked = (event) => {
        let i;
        for (i=0; i < this.conns.length; i++) {
            if (this.conns[i].catid == event.target.value) {
                this.conns[i].checked = event.target.checked;
            }
        }


        console.log(event.target.value + " " + event.target.checked);
        console.log("conns: ", this.conns)
    }




  render() {
    if (!this.organization) return null;



    return (
        <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
      <div className="NyAnsatt">
        <h1>Registrer ny bedrift</h1>

          <div className="form-group">
              Organisasjonsnummer:{" "}
              <input
                  className="form-control"
                  type="text"
                  name="organizationnumber"
                  defaultValue="713210329"
                  onChange={this.handleChange}
              />
          </div>
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
            defaultValue="kaare@propan.no"
            name="email"
            onChange={this.handleChange}
          />
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

              <div className="form-group">

                  {this.categories.map(cat => {
                      return (



                  <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" id="inlineCheckbox" value={cat.category_id} onClick={this.handleAllChecked} />
                          <label className="form-check-label" htmlFor="inlineCheckbox1">{cat.description}</label>
                  </div>
                      )
                  })}
              </div>


        <h3>{this.passworderror}</h3>
          <p>&nbsp;</p>
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
    if (!this.organization) {
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



    const orgdata = {
        organizationnumber: this.state.organizationnumber,
        name: this.state.name,
        tel: this.state.tel,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2

    };

        let i;
      for (i=0; i < this.conns.length; i++) {
          if (this.conns[i].checked) {
              this.category_ids.push({catid: this.conns[i].catid});
          }
      }



        if (this.password != this.password2) {
          this.message = "Passwords do not match.";
        }

        console.log("this organization: ", orgdata);
        console.log("these connections: ", this.category_ids)


      employeeService
          .addOrganization(orgdata)
          .then(response => {
              console.log("insertID: ", response.insertId);
              console.log("this.category_ids: ", this.category_ids)
              employeeService
                  .addOrgCat(this.category_ids, response.insertId)
                  .then(response => {
                      console.log("2nd response: ", response);
                  })
                  .catch(
                      (error: Error) =>
                          (this.message = error.message)
                  );

          })
          .catch(
              (error: Error) =>

                  (this.message = error.message)
          );



  }
}
