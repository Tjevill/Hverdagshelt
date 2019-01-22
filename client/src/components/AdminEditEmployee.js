
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

        <div className="AdminEditEmployee-body">
         <link rel="stylesheet" href="editUsers.css" />
        <h1> hei</h1>
        </div>
      );
    }
}