import * as React from "react";
import { Component } from "react-simplified";
import {
	Card,
	CardMenu,
	CardTitle,
	CardActions,
	CardText,
	Button,
	IconButton,
	Icon,
	List,
	ListItem,
	ListItemContent,
	ListItemAction,
	Grid,
	Cell,
	Textfield
} from "react-mdl";

import { eventService } from "../services.js";

export default class Events extends Component {
	/*user= "haki"; // Endre til case senere */
	events = [];
	render() {
		return (
			<div id="events-page" className="events-body">
				<div className="userHome-body">
					<div className="userHome-container">
						<div className="userHome-events">

							{this.events.map((e, i) => (
								<div key={i} className="userHome-event">
										<div className="event-date">
												<div className="calender">
													<p>
														{this.getMonth(
															e.date
																.substring(
																	0,
																	16
																)
																.replace(
																	"20",
																	""
																)
																.replace(
																	"T",
																	" "
																)
																.substring(0, 8)
																.substring(3, 5)
														)}
													</p>

													<h4>
														{e.date
															.substring(8, 10)
															.replace(
																"0",
																""
															)

														}
													</h4>
												</div>
										</div>

										<div className="event-info">
												<h5>{e.name}</h5>
												<p>
													{" "}
													<Icon name="home" />
													{e.address}
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


												<button type="button" className="btn btn-secondary" data-toggle="modal"
														data-target= {"#"+e.event_id}>
													Les mer
												</button>

												<div className="modal fade" id= {e.event_id} tabIndex="-1" role="dialog"
													 aria-labelledby="exampleModalLabel" aria-hidden="true">

													<div className="modal-dialog" role="document">

														<div className="modal-content">

															<div className="modal-header">

																<h5 className="modal-title" id="exampleModalLabel">{e.name}</h5>

																<button type="button" className="close" data-dismiss="modal"
																		aria-label="Close">
																	<span aria-hidden="true">&times;</span>
																</button>

															</div>

															<div className="modal-body">
																{e.description}
															</div>
															<div className="modal-footer">
																<div className = "float-left">{e.venue+" - "+e.address}</div>
																<button type="button" className="btn btn-secondary"
																		data-dismiss="modal">Close
																</button>
															</div>
														</div>
													</div>
												</div>
										</div>

										<div className="event-image">
											<img className="max" src="https://images.pexels.com/photos/2143/lights-party-dancing-music.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
										</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

		);
	}

	componentDidMount() {
		console.log("events mounted");
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

/*constructor() {
    super();
    this.state = {
      events: []
    };
  }*/

/*userService //Endre til event senere
	 	.getUserByID(34).then( sak => console.log(sak))
	 	.catch((error: Error) => console.log(error.message));
	 	console.log(this.user);*/

/* componentDidMount() {
	 	eventService //Endre til event senere
	 	.getAllEvents()
	 	.then( sak => this.setState({events: sak}))
	 	.catch((error: Error) => console.log(error.message));



  } */
