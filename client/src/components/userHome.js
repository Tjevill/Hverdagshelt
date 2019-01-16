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

				<div className="userHome-container">

					<div className="userHome-banner">

						<div className="userHome-button1">
						<h5> 	Vær en hverdagshelt - varsle dine medborgere om en feil
						i kommunen!</h5>
						<button
							onClick={() => {
								window.location.href = "/#/report";
							}}
						>
							Meld Feil
						</button>
							</div>

					</div>
					<Events/>
				</div>
			</div>

		);
	}
}
