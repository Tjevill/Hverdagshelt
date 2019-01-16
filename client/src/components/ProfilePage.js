// @flow
/* eslint eqeqeq: "off" */
import * as React from "react";
import { Component } from "react-simplified";
import CaseListCard from "./CaseListCard";
import ProfileCard from "./ProfileCard";
import {caseService, userService} from "../services";
import CasePreview from "./CasePreview";
import { Loading } from "./widgets";

export default class ProfilePage extends Component {
	render () {
		return (

			<div>
				<ProfileCardTest id = {sessionStorage.getItem("userid")} />
				<CaseListCardTest id = {sessionStorage.getItem("userid")} />
			</div>


		);
	}
}


export class ProfileCardTest extends Component <{ id: number }> {

	user = [];

	render () {
		return (
			<div className = "card left">
				<h5>Din brukerinformasjon</h5>
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
		userService.getUserByID(this.props.id)
			.then(response => {
				this.user = response[0];
				//console.log(this.user.name)
			})
			.catch((error: Error) => console.log(error.message));
	}
}

export class CaseListCardTest extends Component <{ id: number }> {

	loaded = false;
	cases = [];

	render () {
		if(this.loaded){
			return (
				<div className = "profCard right ">
					<h5>Dine registrerte saker</h5>
					{this.cases.length != 0 ?
						<ul className = "list-group">
							{this.cases.map(x => (
								<CasePreview key = {x.case_id} title = {x.headline} status = {x.status_id} id = {x.case_id} />
							))}
						</ul>
						:
						<h6>Ingen saker registrert</h6>
					}
				</div>
			);
		} else {
			return (
				<Loading />
			);
		}
	}

	componentDidMount () {
		//console.log("CaseListCard mounted");
		// let cap = 50;
		caseService.getCaseOnUser(this.props.id)
			.then((cases => {
				this.cases = cases.filter(e => e.status_id != 7);
				this.loaded = true;
			}))
			.catch((error: Error) => console.log(error.message));
	}

}
