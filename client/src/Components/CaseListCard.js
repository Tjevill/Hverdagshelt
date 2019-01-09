//@flow

import * as React from "react";
import { Component } from "react-simplified";
import "../style.css";

export default class CaseListCard extends Component {
    render() {
        return(
            <div className="card right card-background">
                <h1>Your cases</h1>
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Destroyed lamp
                            <span className="badge badge-success">Approved</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Grafitti on Baker street
                        <span className="badge badge-primary">Pending</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Aliens has invaded my house
                        <span className="badge badge-danger">Denied</span>
                    </li>
                </ul>
            </div>
        );
    }
}