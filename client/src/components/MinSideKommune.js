//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import {Loading} from "./widgets";
import {employeeService, geoService} from "../services.js";

const history = createHashHistory();


let empId = sessionStorage.getItem("userid");

export default class MinSideKommune extends Component {

    employee = new Object();
    commune = new Object();
    cases = new Object();
    loaded = false;

    render(){
        if(this.loaded) {
            return (
                <ul className="list-group">
                    <li className="list-group-item text-dark">Navn: {this.employee.name}</li>
                    <li className="list-group-item text-dark">Telefon: {this.employee.tel}</li>
                    <li className="list-group-item text-dark">Epost: {this.employee.email}</li>
                    <li className="list-group-item text-dark">Kommune: {this.commune}</li>
                </ul>
            );
        }else{
            return(
                <Loading/>
            );
        }
    }

    componentDidMount() {
        console.log("MinSideKommune mounted :-)");
        employeeService
            .getOne(empId)
            .then(enemp => {
                this.employee = enemp[0];
                console.log(this.employee);
                geoService
                    .getCommuneName(this.employee.commune)
                    .then(comm =>{
                        this.commune = comm[0].navn;
                        console.log("Kommune: "+this.commune);
                        this.loaded = true;
                        this.forceUpdate();
                    })
                    .catch( (error: Error ) => console.log(error.message));
            })
            .catch( (error: Error ) => console.log(error.message));

    }

}