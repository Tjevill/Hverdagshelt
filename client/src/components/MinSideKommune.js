//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import {Loading} from "./widgets";
import {employeeService, userService , orgService , geoService, caseService} from "../services.js";

const history = createHashHistory();


let id = sessionStorage.getItem("userid");
let access = sessionStorage.getItem("access");

export default class MinSideKommune extends Component {

    user = new Object();
    organization = new Object();
    employee = new Object();
    commune = new Object();
    cases = new Object();
    loaded = false;

    render() {
        return (
            <div>
                {this.CommuneRender()}
            </div>
        );
    }


    componentDidMount() {

        console.log("MinSide mounted :-)");
        employeeService
            .getOne(id)
            .then(enemp => {
                this.employee = enemp[0];
                console.log(this.employee);
                geoService
                    .getCommuneName(this.employee.commune)
                    .then(comm => {
                        this.commune = comm[0].navn;
                        console.log("Kommune: " + this.commune);
                        caseService
                            .getFiveLatest(this.employee.commune)
                            .then(cas => {
                                this.cases = cas;
                                console.log(this.cases);
                                this.loaded = true;
                                this.forceUpdate();
                            })
                    })
                    .catch((error: Error) => console.log(error.message));
            })
            .catch((error: Error) => console.log(error.message));

    }//End componentDidMount()

    CommuneRender() {
        console.log("communeRender mounted");
            if(this.loaded) {
                return (


                        <div className="container">

                            <h1>Yo gangstah. Diz is yo page </h1>
                            <div className="row">
                                <div className="col-sm">
                                    <h5>Bruker:</h5>
                                    <ul className="list-group">
                                        <li className="list-group-item text-dark">Navnss: {this.employee.name}</li>
                                        <li className="list-group-item text-dark">Telefon: {this.employee.tel}</li>
                                        <li className="list-group-item text-dark">Epost: {this.employee.email}</li>
                                        <li className="list-group-item text-dark">Kommune: {this.commune}</li>
                                    </ul>
                                    <button
                                        className= "btn btn-secondary"
                                        onClick={ () => history.push("/admin/edit")}
                                    >Rediger profil</button>

                                </div>

                                <div className="col-sm">
                                    <h5>Siste 5 feil:</h5>

                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#id</th>
                                                <th scope="col">Overskrift</th>
                                                <th scope="col">Postkode</th>
                                                <th scope="col">Tidspunkt</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.cases.map( (ca, i) => (
                                            <tr key={i}>
                                                <th scope="row">
                                                    {ca.case_id}
                                                </th>
                                                <td>
                                                    {ca.headline}
                                                </td>
                                                <td>
                                                    {ca.zipcode}
                                                </td>
                                                <td>{ca.timestamp.substring(0,16).replace("T", " kl ")}</td>
                                            </tr>
                                        ))}

                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-sm">
                                    <h5>Siste 5 i logg: </h5>
                                </div>
                            </div>
                        </div>

                );
            }else{
                return(
                    <Loading/>
                );
            }
    }
}