//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import { employeeService, geoService, orgService } from "../services";
import { BrowserRouter, Route } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import {
  Alert,
  Card,
  NavBar,
  ListGroup,
  Row,
  Column,
  Button,
  Form,
  Loading
} from "./widgets";
// import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from "material-ui/Table";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import SearchBar from "material-ui-search-bar";
import { TableHeaderColumn } from "material-ui/Table";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const history = createHashHistory();

const style = {
  margin: 12
};

//<{ match: { params: { name: string, id: number } } }>
export default class AdminEmployee extends Component {
  employees = [];
  employeesbackup = [];
  commune = "";
  superUser = "";
  loading = true;

  //sessionStorage.getItem('superuser')

  search(event) {
    console.log(event.target.value);
    this.employees = this.employeesbackup.filter(function(value) {
      return (
        value.name.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1
      );
    });
    this.forceUpdate();
  }

  delete(employeeid, employee) {
    if (
      window.confirm(
        "Er du sikker på at du ønsker å slette følgende ansatt? : " +
          employee.name
      )
    ) {
      employeeService
        .deleteEmp(employeeid)
        .then(response => {
          console.log(response, "Slettet kommuneansatt");
          window.location.reload();
        })
        .catch(err => {
          console.log(err, "Error ved sletting");
        });
    }
  }

  render() {
    if (!this.loading) {
      return (
        <div>
          <div className="title">
            <div id="cat-page">
              <div className="row">
                <div className="col-md-3" />
                <div className="col-md-6">
                  <div className="group btmspace-50 headerlayout">
                    <div className="one_half first">
                      <h3>Ansatte</h3>
                    </div>
                    <div className="one_half">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg largebutton"
                        onClick={() => {
                          history.push("/admin/kommune/nyansatt");
                        }}
                      >
                        Legg til ny ansatt
                      </button>
                    </div>
                  </div>
                  <table className="">
                    <thead>
                      <tr>
                        <th scope="col">Navn</th>
                        <th scope="col">Tlf</th>
                        <th scope="col">Superbruker</th>
                        <th scope="col" colSpan="2">
                          <input
                            className="search-employee"
                            id="searchbar"
                            placeholder="Søk Navn.."
                            type="text"
                            onChange={event => this.search(event)}
                          />{" "}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.employees.map((employee, i) => (
                        <tr key={i} className="PrivateUsersList-TableRow">
                          <td className="name">{employee.name}</td>
                          <td className="tel">{employee.tel}</td>
                          <td className="superuser">{employee.superuser}</td>
                          <td className="edit">
                            {this.addEditRowColumn(this.superUser, employee)}
                          </td>
                          <td>
                            {this.addDeleteRowColumn(
                              employee.superuser,
                              employee
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="col-md-3" />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }

  addEditRowColumn(id, employee) {
    if (id == 1) {
      return (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            history.push("/admin/kommune/edit/" + employee.employee_id);
          }}
        >
          Rediger
        </button>
      );
    } else {
      return "";
    }
  }

  addDeleteRowColumn(superUser, employee) {
    if (superUser !== 1 && this.superUser == 1) {
      return (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => this.delete(employee.employee_id, employee)}
        >
          Slett
        </button>
      );
    } else {
      return "";
    }
  }

  componentDidMount() {
    this.superUser = sessionStorage.getItem("superuser");

    geoService
      .getCommuneName(sessionStorage.getItem("commune"))
      .then(commune => {
        this.commune = commune[0].navn;
        this.forceUpdate();
      });

    employeeService
      .getEmpCommune(sessionStorage.getItem("commune"))
      .then(employees => {
        this.employees = employees;
        this.employeesbackup = employees;
        this.forceUpdate();
      })
      .catch((error: Error) => Alert.danger(error.message));

    this.loading = false;;
  }

  super(value) {
    if (value === 1) {
      return "Super";
    } else {
      return "Normal";
    }
  }
}
