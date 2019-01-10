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
	Grid,
	Cell
} from "react-mdl";
import { eventService } from "../services.js";

export default class userHome extends Component {
	events = [];
	render() {
		return (
			<div className="userHome-body">
				<div className="userHome-banner">
					<div className="userHome-banner-background">
						<Grid className="userHome-grid">
							<Cell col={12}>
								Vær en hverdagshelt - varsle dine medborgere om
								en feil i kommunen!
							</Cell>

							<Cell col={12}>
								<Button
									raised
									colored
									className="userHome-button"
									 onClick={() => {
                       				 window.location.href = "/#/reportPage";
                       				}}
								>
									Meld Feil
								</Button>
							</Cell>

							<Cell col={12}>
							<a href="/#/IssueOverview">
								<p>Oversikt over alle feil i Trondheim </p>
							</a>
							</Cell>
						</Grid>
					</div>
				</div>

				<div className="userHome-cards">
					Events
					{this.events.map( event => (
					<Card
						shadow={0}
						style={{
							width: "120px",
							height: "120px",
							margin: "auto"
						}}
					>
						<CardTitle
							expand
							style={{
								color: "#fff",
								background:
								"url(http://www.getmdl.io/assets/demos/dog.png) bottom right 15% no-repeat #46B6AC"
							}}
						>
							{event.date.substring(0, 16)
                            .replace("20", "")
                            .replace("T", " ")}
						</CardTitle>
						<CardText>
							<Icon name="home" />	{event.zipcode}
						</CardText>
						<CardActions border>
							<Button colored>{event.name}</Button>
						</CardActions>
					</Card>
					))}



					{/*
					<Card shadow={0} style={{ width: "150px", margin: "auto" }}>
						<CardTitle
							style={{
								color: "#fff",
								height: "150px",
								background:
									"url(https://trdevents.no/wp-content/uploads/2018/12/5237814edb753e856422b69cfc107398_apent-treff-bipolarforeningen-4-1-220x128.jpeg) center / cover"
							}}
						/>
						<CardText>
							<p>
								<Icon name="timer" />
								Adresse
							</p>
							<p>
								<Icon name="timer" />
								Bygning
							</p>
							<p>
								<Icon name="timer" />
								Tidspunkt
							</p>
						</CardText>
						<CardActions border>
							<Button colored>Overskrift</Button>
						</CardActions>
					</Card>
				*/}
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
}
