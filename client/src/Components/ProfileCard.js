//@flow

import * as React from "react";
import { Component } from "react-simplified";
import {userService} from "../services";

export default class ProfileCard extends Component {
    user = null;
    render() {
        return(
        <div className="card left card-background">
            <h1>User information</h1>
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Name:
                    <div>Megatron Megatronsen</div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Adress:
                    <div>Decepticonvegen 666</div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Telephone:
                    <div>94291456</div>
                 </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Email:
                  <div>optimussmellsbad@decepti.con</div>
                </li>
            </ul>
        </div>
        );
    }
}