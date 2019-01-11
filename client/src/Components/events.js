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
	Cell
} from "react-mdl";
import { eventService } from "../services.js";



export default class events extends Component {
	/*user= "haki"; // Endre til case senere */
	events = [];
	render() {
		return (
			<div className="events-body">
				{console.log(this.events[1])}
				{this.events.map(event=> console.log(event))}
				<List style={{ width: "650px" }}>
					{this.events.map(event => (
						<a href="#">
							<ListItem threeLine>
								<ListItemContent
									avatar="person"
									subtitle={
										event.date.substring(0, 16)
                            .replace("20", "")
                            .replace("T", " ") + ", " + event.zipcode
									}
								>
									{event.name}
								</ListItemContent>
								{/* For bilde
									<ListItemAction>
									<a href="#">
										<img src={action.image} />
									</a>
								</ListItemAction>*/
									
								}
								
							</ListItem>
						</a>
					))}
				</List>
			</div>
		);
	}

	componentDidMount() {
		eventService //Endre til event senere
			.getAllEvents()
			.then(sak => (this.events = sak))
			.catch((error: Error) => console.log(error.message));
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


