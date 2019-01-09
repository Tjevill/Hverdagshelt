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

class Action {
	title: string;
	image: string;
	time: string;
	location: string;

	constructor(title: string, image: string, time: string, location: string) {
		this.title = title;
		this.image = image;
		this.time = time;
		this.location = location;
	}
}

let actions = [
	new Action(
		"Åpent treff Bipolarforeningen",
		"http://personal.psu.edu/xqz5228/jpg.jpg",
		"2018-03-3 05:00",
		"Julianus Holms Veg 342"
	),
	new Action(
		"Prøvetime for studentkurs",
		"http://www.personal.psu.edu/jyc5774/jpg.jpg",
		"2018-03-3 05:00",
		"Ole Ross Veg 3243"
	),
	new Action(
		"Juletrefest",
		"https://vignette.wikia.nocookie.net/injusticegodsamongus/images/7/74/Kirby_%28Air_Ride%29.jpg/revision/latest?cb=20130703215944",
		"2018-03-3 05:00",
		"Prinsens Gate 34A"
	)
];

export default class events extends Component {
	render() {
		return (
			<div className="events-body">
				<List style={{ width: "650px" }}>
					{actions.map(action => (
						<a href="#">
							<ListItem threeLine>
								<ListItemContent
									avatar="person"
									subtitle={action.time  + ", " + action.location}
								>
									{action.title}
								</ListItemContent>

								<ListItemAction>
									<a href="#">
										<img src={action.image} />
									</a>
								</ListItemAction>
							</ListItem>
						</a>
					))}
				</List>
			</div>
		);
	}
}
