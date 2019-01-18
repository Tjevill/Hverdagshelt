
//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import { geoService, employeeService } from "../services";
import { Alert, Card, ListGroup, Row, Column, Button, Form, Loading} from './widgets';

const history = createHashHistory();


export default class AdminEditEmployee extends Component {


render(){
      return (

        <div>
        <h1> Denne siden er på vent til Erling er ferdig med EmployeeEdit.js</h1>
        </div>
      );
    }
}