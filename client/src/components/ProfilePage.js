// @flow
/* eslint eqeqeq: "off" */
import * as React from 'react';
import { Component } from "react-simplified";
import {caseService, userService} from "../services";
import CasePreview from "./CasePreview";
import { Loading } from "./widgets";

let loaded1 = 1;
let loaded2 = 1;

export default class ProfilePage extends Component {
    user = [];
    cases = [];
    loaded1 = 0;
    loaded2 = 0;

    componentDidMount () {
        userService.getUserByToken()
            .then(response => {
                this.user = response[0];
                loaded1 = 1;
                console.log(this.user.name)

                // let cap = 50;
                caseService.getCaseOnUser(this.user.user_id)
                    .then((cases => {
                        this.cases = cases.filter(e => e.status_id != 7);
                        loaded2 = 1;
                    }))
                    .catch((error: Error) => console.log(error.message));

            })
            .catch((error: Error) => console.log(error.message));
    }

    render () {
        if(loaded1 == 1 && loaded2 == 1){
		return (

			<div id="profile-page-user" className="profile-page">

                <div className="profile-title">
                    <h2>Velkommen {this.user.name}!</h2>
                </div>
                <div className="profile-details">
                    <h4>Mine detaljer</h4>
                    <ul className = "list-group">
                        <li className = "list-group-item d-flex justify-content-between align-items-center">
                            Navn:
                            <div> {this.user.name} </div>
                        </li>
                        <li className = "list-group-item d-flex justify-content-between align-items-center">
                            Addresse:
                            <div> {this.user.address} </div>
                        </li>
                        <li className = "list-group-item d-flex justify-content-between align-items-center">
                            Mobilnummer:
                            <div> {this.user.tel} </div>
                        </li>
                        <li className = "list-group-item d-flex justify-content-between align-items-center">
                            Epost:
                            <div> {this.user.email} </div>
                        </li>
                    </ul>
                </div>


                <div className="profile-reports">
                    <h4>Mine saker</h4>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Tittel</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        {this.cases.map(x  => (
                            <CasePreview  key={x.case_id} title={x.headline} status={x.status_id} id={x.case_id}/>
                        ))}
                    </table>
                    <br/><br/>
                </div>
			</div>
		);
        } else {
            return (
                <Loading />
            );
        }
	}
}
