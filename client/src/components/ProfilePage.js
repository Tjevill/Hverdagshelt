// @flow
/* eslint eqeqeq: "off" */
import * as React from "react";
import { Component } from "react-simplified";
import {caseService, userService} from "../services";
import CasePreview from "./CasePreview";
import { Loading } from "./widgets";

let loaded1 = 1;
let loaded2 = 1;

export default class ProfilePage extends Component {
	render () {
        if(loaded1 == 1 && loaded2 == 1){
		return (

			<div>
				<ProfileCard />
				<CaseListCard />
			</div>
		);
        } else {
            return (
                <Loading />
            );
        }
	}
}


export class ProfileCard extends Component <{ id: number }> {
	loaded1 = 0;
	user = [];

	render () {
		return (
			<div className="container profilecard-container">
				<h2 className="display-4">Din brukerinformasjon</h2>
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
		);
	}

	componentDidMount () {
		userService.getUserByToken(this.props.id)
			.then(response => {
				this.user = response[0];
                loaded1 = 1;
				//console.log(this.user.name)
			})
			.catch((error: Error) => console.log(error.message));
	}
}

export class CaseListCard extends Component <{ id: number }> {
	loaded2 = 0;
	cases = [];

	render () {
			return (
                <div className="container caselist-container">
                    <h2 className="display-4">Saker</h2>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Tittel</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        {this.cases.map(x  => (
                            <CasePreview  key={x.case_id} title={x.headline} status={x.status_id} id={x.case_id}/>
                        ))}
                    </table>
                    <br/><br/>
                </div>
			);
	}

	componentDidMount () {
		// let cap = 50;
		caseService.getCaseOnUser(this.props.id)
			.then((cases => {
				this.cases = cases.filter(e => e.status_id != 7);
				loaded2 = 1;
			}))
			.catch((error: Error) => console.log(error.message));
	}

}
