//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import {Loading} from "./widgets";
import {employeeService, userService , orgService , geoService} from "../services.js";

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

    render(){
        if(access == "kommune"){
            return(
                <div>
                    {this.CommuneRender()}
                </div>
            )
        }else if(access == "user"){
            return (
                <div>
                    {this.UserRender()}
                </div>
            )
        }else if(access == "bedrift"){
            return (
                <div>
                    <p>heissss</p>
                </div>
            )
        }

    }

    componentDidMount() {

        console.log("MinSide mounted :-)");

        if (access == "kommune") {
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
                            this.loaded = true;
                            this.forceUpdate();
                        })
                        .catch((error: Error) => console.log(error.message));
                })
                .catch((error: Error) => console.log(error.message));
        }else if(access == "user"){
            userService
                .getUserByID(id)
                .then(enuser =>{
                    this.user = enuser[0];
                    console.log(this.user);
                    console.log(this.user.user_id);
                    userService
                        .getUsersProviceFromUserID(this.user.user_id)
                        .then( comm => {
                            this.commune = comm[0].province;
                            console.log("Kommune: "+this.commune);
                            this.loaded = true;
                            this.forceUpdate();
                        })
                        .catch((error: Error) => console.log(error.message));
                })
                .catch((error: Error) => console.log(error.message));
        }else if(access == "bedrift"){
            orgService
                .getOrgByID(id)
                .then(enorg => {
                    this.organization = enorg[0];
                    console.log(this.organization);

                })
        }
    }//End componentDidMount()

    CommuneRender() {
        console.log("communeRender mounted");
            if(this.loaded) {
                return (

                    <div className = "container">
                        <h1>Din profil</h1>
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
                );
            }else{
                return(
                    <Loading/>
                );
            }
    }

    UserRender(){

        if(this.loaded){
            return(
                <div className = "container">
                    <h1>Din profil</h1>
                    <ul className="list-group">
                        <li className="list-group-item text-dark">Navn: {this.user.name}</li>
                        <li className="list-group-item text-dark">Telefon: {this.user.tel}</li>
                        <li className="list-group-item text-dark">Epost: {this.user.email}</li>
                        <li className="list-group-item text-dark">Kommune: {this.commune}</li>
                    </ul>
                    <button
                        className= "btn btn-secondary"
                        onClick={ () => history.push("/admin/edit")}
                    >Rediger profil</button>
                </div>
            )
        }
    }
}