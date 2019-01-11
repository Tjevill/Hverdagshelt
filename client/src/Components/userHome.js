import * as React from "react";
import { Component } from "react-simplified";
import {
	Card,
	CardMenu,
	CardTitle,
	CardActions,
	CardText,

	IconButton,
	Icon,
	Grid,
	Cell
} from "react-mdl";
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
								window.location.href = "/#/reportPage";
							}}
						>
							Meld Feil
						</button>
							</div>
						
					</div>
					<div className="userHome-events">
						<h4>Events</h4>
						{this.events.map(e => (
							<div className="userHome-event">
								<Grid className="grid1">
									<Cell col={2}>
										<div className="cell1">
											<div className="calender">
												<p>
													{this.getMonth(
														e.date
															.substring(0, 16)
															.replace("20", "")
															.replace("T", " ")
															.substring(0, 8)
															.substring(3, 5)
													)}
												</p>

												<h4>  
													{e.date
														.substring(0, 16)
														.replace("20", "")
														.replace("T", " ")
														.substring(0, 8)
														.substring(0, 2)}
												</h4>

											</div>
										</div>
									</Cell>

									<Cell col={6}>
										<div className="cell2">
											<h5>{e.name}</h5>
											<p>
												{" "}
												<Icon name="home" />
												{e.zipcode}
											</p>
											<p>
												{" "}
												<Icon name="access_time" />
												{e.date
													.substring(0, 16)
													.replace("20", "")
													.replace("T", " ")
													.substring(9)}
											</p>
										</div>
									</Cell>

									<Cell col={4}>
										<div className="cell3">
										<img src="https://www.magical-planet.com/wp-content/uploads/2018/03/Duomo-of-Milan-696x366.jpg"/>
										</div>
									</Cell>
								</Grid>
							</div>
						))}
					</div>
				</div>
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
