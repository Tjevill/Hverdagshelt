//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import {Loading} from "./widgets";
import {orgService, statusService} from "../services.js";


const history = createHashHistory();


export default class MinSideBedrift extends Component {

    organization = new Object();
    orgCases = new Object();
    loaded = false;
    caseStatus = new Object();


    render(){

        if (this.loaded){

            return(
                <div>
                    { this.OrgRender() }
                </div>

            );//End return
        }else {
            return(
                <Loading/>
            );

        }

    }//End render()


    componentDidMount(): void {

        console.log("MinSideBedrift mounted :-)");
        orgService
            .getOrganizationByToken()
            .then( org => {
                this.organization = org[0];
                console.log(this.organization);
                orgService
                    .getAllCases(this.organization.org_id)
                        .then( ca => {
                            this.orgCases = ca;
                            console.log(this.orgCases);
                            statusService
                                .getAllStatuses()
                                    .then( st => {
                                        this.caseStatus = st;
                                        console.log(this.caseStatus);
                                        this.loaded = true;
                                        this.forceUpdate();
                                    });
                        })
            })
            .catch( (error: Error) => console.log(error.message));


    }//End componentDidMount()


    OrgRender(){

        return(

            <div className = "profile-page">
                <div className="profile-title">
                    <h2>Velkommen {this.organization.name}</h2>
                </div>


                    <div className = "profile-details">

                        <h4>Mine detaljer</h4>
                        <ul className="list-group">
                            <li className="list-group-item text-dark">Bedrift: {this.organization.name}</li>
                            <li className="list-group-item text-dark">Org. nr: {this.organization.organizationnumber}</li>
                            <li className="list-group-item text-dark">Telefon: {this.organization.tel}</li>
                            <li className="list-group-item text-dark">Epost: {this.organization.email}</li>
                        </ul>
                        <button
                            className= "btn btn-info"
                            onClick={ () => history.push("/bedrift/edit")}
                        >Rediger profil</button>
                    </div>

                    <div className = "profile-reports">
                        <h4>Fullførte saker</h4>

                        <table className="table">

                            <thead>
                            <tr>
                                <th scope="col">#ID</th>
                                <th scope="col">Overskrift</th>
                                <th scope="col">Postkode</th>
                                <th scope="col">Innmeldt</th>
                                <th scope="col">Status</th>
                            </tr>
                            </thead>

                            <tbody>

                            {this.orgCases.map( (ca, i) => (

                                <tr
                                    key={i}
                                    onClick={() => (window.location=('#/case/' + ca.case_id))}
                                >

                                    <th scope="row">
                                        {ca.case_id}
                                    </th>

                                    <td  className="clickable-link">
                                        {ca.headline}
                                    </td>

                                    <td>
                                        {ca.zipcode}
                                    </td>

                                    <td>
                                        {ca.timestamp.substring(0,16).replace("T", " kl ")}
                                    </td>

                                    <td>
                                        {this.caseStatus[ca.status_id - 1].description}
                                    </td>

                                </tr>
                            ))}

                            </tbody>

                        </table>
                    </div>


            </div>

        );

    }//End OrgRender()

}//End MinSideBedrift
