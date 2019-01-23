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
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import SearchBar from "material-ui-search-bar";

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
    console.log(event);
    this.employees = this.employeesbackup.filter(function(value){
        return value.name.indexOf(event)!=(-1);
    });
    this.forceUpdate();
  }

  render() {
    return (

      <div>
      {/*
      <h1> Liste over ansatte i din kommune: {this.commune} </h1> */}
        <div className="title">
     <link rel="stylesheet" href="PrivateUsersList.css" />

      <h1 className="logo">
  <span className="word1">Kommune</span>
  <span className="word2">Ansatt</span>
</h1>
</div>

        <a href={"#/nyAnsatt/"} className="btn btn-primary">
          Legg til ny ansatt
        </a>
       <MuiThemeProvider>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Ansatt_ID</TableHeaderColumn>
              <TableHeaderColumn>Navn</TableHeaderColumn>
              <TableHeaderColumn>Tlf</TableHeaderColumn>
              <TableHeaderColumn>Superbruker</TableHeaderColumn>
              <TableHeaderColumn />
               <TableHeaderColumn>


                {" "}
                <SearchBar
                  onChange={event => this.search(event)}
                  style={{
                    margin: "0 auto",

                    maxWidth: 900
                  }}
                />
              </TableHeaderColumn>


            </TableRow>
          </TableHeader>
          <TableBody>
            {this.employees.map((employee, i) => (
              <TableRow key={i} className="PrivateUsersList-TableRow">
                 <TableRowColumn className="employee_id">
                  {employee.employee_id}
                </TableRowColumn>
                     <TableRowColumn className="name">
                   {employee.name}
                    </TableRowColumn>
                     <TableRowColumn className="tel">
                    {employee.tel}
                    </TableRowColumn>
                    <TableRowColumn className="superuser">
                     {employee.superuser}
                    </TableRowColumn>
                    <TableRowColumn className="edit">
                  {this.addEditRowColumn(this.superUser, employee)}

                </TableRowColumn>
                   <TableRowColumn/>


              </TableRow>
            ))}
          </TableBody>
        </Table>
      </MuiThemeProvider>
         </div>

          /*
      <h1> Liste over ansatte i din kommune: {this.commune} </h1>
        <a href={"#/nyAnsatt/"} className="btn btn-primary">
          Legg til ny ansatt
        </a>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">tel</th>
              <th scope="col">email</th>
              <th scope="col">super?</th>
            </tr>
          </thead>
          <tbody>
            {this.employees.map((e, i) => (

              <tr key={i} onClick={()=>history.push('/admin/kommune/edit/'+ e.employee_id)}>
                <th  scope="row">{e.employee_id}</th>
                <td   >{e.name}</td>
                <td> {e.tel}</td>
                <td> {e.email}</td>
                <td> {this.super(e.superuser) }</td>


              </tr>
            ))}
          </tbody>
        </table>
        */




    );
  }

    addEditRowColumn(id, employee) {
    if (id == 1) {
      return (
        <RaisedButton
          label="rediger"
          primary={true}
          style={style}
          onClick={() => {
           history.push('/admin/kommune/edit/'+ employee.employee_id);
          }}
        />
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
