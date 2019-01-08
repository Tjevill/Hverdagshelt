//@flow

import * as React from "react";
import { Component } from "react-simplified";
import "../style.css";

export default class CaseListCard extends Component {
    render() {
        return(
            <div className="card right">
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

export default class ProfileCard extends Component {
    render() {
        return(
            <ul className="list-group">
                <li className="list-group-item">Cras justo odio</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Morbi leo risus</li>
                <li className="list-group-item">Porta ac consectetur ac</li>
                <li className="list-group-item">Vestibulum at eros</li>
            </ul>
        )
    }
}

export default class ProfileComponent {
    render() {
        return(

        )
    }
}