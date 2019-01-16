import * as React from "react";
import { Component } from "react-simplified";
import { eventService } from "../services.js";

//hver gang det dukke opp en ny artikkel opprettes det en boks

export default class userHome extends Component {
	events = [];

	render() {
		return (
			<div>


			</div>
		);
	}

	componentDidMount() {
		eventService //Endre til event senere
			.getAllEvents()
			.then(sak => (this.events = sak))
			.catch((error: Error) => console.log(error.message));
	}

	getMonth(month) {
		let rMonth = ""; // BYTTE UT MED SWITCH
		if (month == "01") {
			rMonth = "JAN";
		}
		if (month == "02") {
			rMonth = "FEB";
		}
		if (month == "03") {
			rMonth = "MARS";
		}
		if (month == "04") {
			rMonth = "APR";
		}

		if (month == "05") {
			rMonth = "MAI";
		}

		if (month == "06") {
			rMonth = "JUNI";
		}

		if (month == "07") {
			rMonth = "JULI";
		}

		if (month == "08") {
			rMonth = "AUG";
		}

		if (month == "09") {
			rMonth = "SEPT";
		}

		if (month == "10") {
			rMonth = "OKT";
		}

		if (month == "11") {
			rMonth = "NOV";
		}

		if (month == "12") {
			rMonth = "DES";
		}
		return rMonth;
	}
}
