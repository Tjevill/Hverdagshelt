//@flow

import * as React from "react";
import { Component } from "react-simplified";
import {userService} from "../services";

export default class ProfileCard extends Component <{ id: number }> {
    user = [];
    render() {
        return(
        <div className="card left card-background">
            <h1>User information</h1>
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Name:
                    <div> {this.user.name} </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Adress:
                    <div> { this.user.address } </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Telephone:
                    <div> { this.user.tel } </div>
                 </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Email:
                  <div> { this.user.email } </div>
                </li>
            </ul>
        </div>
        );
    }
    componentDidMount() {
        userService.getUserByID(this.props.id)
            .then(response => {
              this.user = response[0];
              //console.log(this.user.name)
            })
            .catch((error: Error) => console.log(error.message));
    }
}
