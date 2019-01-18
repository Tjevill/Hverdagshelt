//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import { employeeService } from "../services";
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
const history = createHashHistory();

//<{ match: { params: { name: string, id: number } } }>
export default class EmployeeOverview extends Component {
  employees = [];
  commune = "";

  //sessionStorage.getItem('superuser')

  render() {
    return (
      <div>
      <h1> Liste over ansatte i din kommune: {sessionStorage.getItem('commune')} </h1>
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
                
              <tr key={i}>
                <th  scope="row">{e.employee_id}</th>
                <td onClick={()=>history.push('/admin/kommune/1') } >{e.name}</td>
                <td> {e.tel}</td>
                <td> {e.email}</td>
                <td> {this.super(e.superuser) }</td>

                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  componentDidMount() {
    employeeService
      .getEmpCommune(sessionStorage.getItem('commune'))
      .then(employees => {
        this.employees = employees;
        
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
