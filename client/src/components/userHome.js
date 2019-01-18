import * as React from "react";
import { Component } from "react-simplified";
import Events from "./events.js";

import { eventService } from "../services.js";

//hver gang det dukke opp en ny artikkel opprettes det en boks

export default class userHome extends Component {
	events = [];

	render() {
		return (
			<div className="userHome-body">

			</div>

		);
	}
}
