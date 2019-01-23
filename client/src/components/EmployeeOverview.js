//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import { employeeService, geoService } from "../services";
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
import {TableHeaderColumn} from "material-ui/Table";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const history = createHashHistory();

const style = {
  margin: 12
};

//<{ match: { params: { name: string, id: number } } }>
export default class EmployeeOverview extends Component {
  employees = [];
  employeesbackup = [];
  commune = "";
  superUser = "";

  //sessionStorage.getItem('superuser')

  search(event){
    console.log(event.target.value);
    this.employees = this.employeesbackup.filter(function(value){
        return value.name.indexOf(event.target.value)!=(-1);
    });
    this.forceUpdate();
  }

  render() {
    return (

      <div>
      {/*
      <h1> Liste over ansatte i din kommune: {this.commune} </h1> */}
        <div className="title">
            <div id="cat-page">
                <div className="row">
                    <div className="col-sm-3">&nbsp;</div>
                    <div className="col-sm-6">
                        <div className="group btmspace-50 headerlayout">
                            <div className="one_half first"><h3>Kategorier</h3></div>
                            <div className="one_half"><button type="button" className="btn btn-primary btn-lg largebutton" onClick={() => { history.push('/nyAnsatt/') }}>Legg til ny ansatt</button></div>
                        </div>
                        <table className="">
                            <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Navn</th>
                              <th scope="col">Tlf</th>
                              <th scope="col">Superbruker</th>
                              <th scope="col" colSpan="2">


                                      <input
                                          id="searchbar"
                                          type="text"
                                          onChange={event => this.search(event)}
                                      />


                                  {" "}
                              </th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.employees.map((employee, i) => (
                                  <tr key={i} className="PrivateUsersList-TableRow">
                                     <td className="employee_id">
                                      {employee.employee_id}
                                    </td>
                                         <td className="name">
                                       {employee.name}
                                        </td>
                                         <td className="tel">
                                        {employee.tel}
                                        </td>
                                        <td className="superuser">
                                         {employee.superuser}
                                        </td>
                                        <td className="edit">
                                      {this.addEditRowColumn(this.superUser, employee)}
                                    </td>
                                      <td><button type="button" className="btn btn-danger" onClick ={() => this.delete(employee.user_id)}>Slett</button></td>

                                  </tr>
                                ))}
                            </tbody>
                         </table>
                    </div>
                </div></div></div>
      </div>

    );
  }

    addEditRowColumn(id, employee) {
    if (id == 1) {
      return (
        <button type="button" className="btn btn-primary"

          onClick={() => {
           history.push('/admin/kommune/edit/'+ employee.employee_id);
          }}
        >Rediger</button>
      );
    } else {
      return "";
    }
  }

  componentDidMount() {
      this.superUser = sessionStorage.getItem("superuser");

    geoService
    .getCommuneName(sessionStorage.getItem('commune'))
    .then(commune => {
      this.commune = commune[0].navn;
      this.forceUpdate();
    });


    employeeService
      .getEmpCommune(sessionStorage.getItem('commune'))
      .then(employees => {
        this.employees = employees;
        this.employeesbackup = employees;
        this.forceUpdate();

      })
      .catch((error: Error) => Alert.danger(error.message));
  }



  super(value) {
    if (value === 1) {
        return "Super";
    } else {
        return "Normal"
    }
  }
}
