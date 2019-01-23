//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import {Loading} from "./widgets";
import {employeeService, geoService, caseService} from "../services.js";

const history = createHashHistory();


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
            .getEmployeeByToken()
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

                            <h1>Velkommen {this.employee.name}</h1>
                            <div className="row">
                                <div className="col-sm">
                                    <h5>Bruker:</h5>
                                    <ul className="list-group">
                                        <li className="list-group-item text-dark">Navn: {this.employee.name}</li>
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
                                                <th scope="col">#ID</th>
                                                <th scope="col">Overskrift</th>
                                                <th scope="col">Postkode</th>
                                                <th scope="col">Tidspunkt</th>
                                                <th scope="col">Valg</th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {this.cases.map( (ca, i) => (

                                                <tr
                                                    key={i}
                                                    onClick={ () => window.alert("Skal redirecte til redigere-event siden. Id: "+ca.case_id+". Fikses på linje 101 i MinSideKommune.js") }
                                                >

                                                    <th scope="row">
                                                        {ca.case_id}
                                                    </th>

                                                    <td>
                                                        {ca.headline}
                                                    </td>

                                                    <td>
                                                        {ca.zipcode}
                                                    </td>

                                                    <td>
                                                        {ca.timestamp.substring(0,16).replace("T", " kl ")}
                                                    </td>

                                                    <td>
                                                        <select className="form-control" id="sel1">
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                        </select>
                                                    </td>

                                                </tr>
                                            ))}

                                        </tbody>

                                    </table>
                                </div>
                                <div className = "col-sm">

                                    <h5>Forhåndsvisning av valgt sak</h5>

                                </div>
                            </div>

                            <div>
                                <p>
                                    <a
                                        className = "text-dark"
                                        href = "https://gitlab.stud.idi.ntnu.no/SUV19_T5/hverdagshelt_t5/wikis/home"
                                        target = "_blank"
                                    >
                                        Lenke til WIKI-siden
                                    </a>
                                </p>
                            </div>
                        </div>



                );
            }else{
                return(
                    <Loading/>
                );
            }
    }

    previewCase(case_id){

        return(

            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </table>

        )
    }
}