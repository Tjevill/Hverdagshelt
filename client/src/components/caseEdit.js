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
import { caseService, mapService } from "../services.js";

import { Alert } from "./widgets";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const style = {
	width: "80%",
	height: "80%",
	position: "relative"
};


const formValid = ({ formErrors, ...rest }) => {
	let valid = true;

	// validate form errors being empty
	Object.values(formErrors).forEach(val => {
		val.length > 0 && (valid = false);
	});

	return valid;
};

export class caseEdit extends Component<{
	match: { params: { id: number } }
}> {
	case = new Object();
	lat = 63.4283065;
	lng = 10.3876995;
	mapData = {};
	province = "";
	address = "";
	zipcode = "";
	status="";

	constructor(props) {
		super(props);
		this.state = {
			headline: "",

			description: "",
			formErrors: {
				headline: "",
				description: ""
			}
		};
	}

	handleSubmit = e => {
		e.preventDefault();

		if (formValid(this.state)) {
			console.log(`
        --SUBMITTING--
         description: ${this.state.description} 
          longitude:  ${this.lng}
          latitude:  ${this.lat}
          status_id:  ${this.status}
          user_id:  ${this.case.user_id}
          category_id:  ${this.case.category_id}
          zipcode:  ${this.zipcode}
          headline: ${this.state.headline}
          picture:  ${this.case.picture}
          employee_id:  ${this.case.employee_id}
          org_id:  ${this.case.org_id}
          
          case_id:  ${this.props.match.params.id}
      `);

			this.update();
		} else {
			window.alert("Ingen endringer ble utført");
			console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
		}
	};

	handleChange = e => {
		e.preventDefault();
		const { name, value } = e.target;
		let formErrors = { ...this.state.formErrors };
		console.log("Name:", name);
		console.log("Value:", value);

		switch (name) {
			case "headline":
				formErrors.headline =
					value.length < 3 ? "minimum 3 bokstaver headline" : "";
				break;

			case "description":
				formErrors.description =
					value.length < 3 ? "minimum 3 bokstaver Beskrivelse" : "";
				break;

			default:
				break;
		}

		this.setState({ formErrors, [name]: value }, () =>
			console.log(this.state)
		);
	};

	render() {
		const { formErrors } = this.state;

		return (
			<div className="caseEdit-wrapper">
				<div className="form-wrapper">
					<h1> Rediger sak </h1>

					<form onSubmit={this.handleSubmit} noValidate>
						<div className="headline">
							{console.log(this.lat)}
							<label htmlFor="headline"> Tittel </label>
							<input
								className={
									formErrors.headline.length > 0
										? "error"
										: null
								}
								type="text"
								value={this.state.headline}
								placeholder="Tittel"
								name="headline"
								noValidate
								onChange={this.handleChange}
							/>
							{formErrors.headline.length > 0 && (
								<span className="errorMessage">
									{formErrors.headline}
								</span>
							)}
						</div>

						<div className="address">
							<label htmlFor="address"> Adresse </label>
							<div className="map-container">
								Spesifiser hvor problemet befinner seg:
								<input
									className="form-control address-field"
									type="text"
									name="headline"
									defaultValue={this.address}
									readOnly={true}
								/>
								<Map
									className="report-map"
									google={this.props.google}
									zoom={8}
									initialCenter={{
										lat: this.lat,
										lng: this.lng
									}}
									style={style}
									onClick={this.onMapClick}
								>
									<Marker
										name={"current location"}
										draggable={true}
										position={{
											lat: this.lat,
											lng: this.lng
										}}
										onDragend={(t, map, coord) =>
											this.onMarkerDragEnd(coord)
										}
									/>
								</Map>
							</div>
						</div>

						<div className="description">
							<label htmlFor="description"> Beskrivelse </label>
							<textarea
								className={
									formErrors.description.length > 0
										? "error"
										: null
								}
								type="text"
								value={this.state.description}
								placeholder="Beskrivelse"
								name="description"
								noValidate
								onChange={this.handleChange}
							>
							
							</textarea>

							{formErrors.description.length > 0 && (
								<span className="errorMessage">
									{formErrors.description}
								</span>
							)}
						</div>

						<div className="editCase">
							<button type="submit"> Lagre endringer </button>
						</div>

						<div className="deleteCase">
							<button
								onClick={() => {
									this.delete(this.props.match.params.id);
								}}
							>
								{" "}
								Slett sak{" "}
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}

	componentDidMount() {
		caseService //Endre til event senere
			.getCaseById(this.props.match.params.id)
			.then(sak => {
				this.case = sak[0];
				this.lng = sak[0].longitude;
				this.lat = sak[0].latitude;
				this.zipcode = sak[0].zipcode;
				this.status=sak[0].status_id;
				this.setState({
				headline : sak[0].headline,
				description : sak[0].description	
				})
				
				console.log(sak[0].zipcode);
				

				mapService
					.getMapInfo(sak[0].latitude, sak[0].longitude)
					.then(mapData => {
						this.address = mapData.results[0].formatted_address.split(
							","
						)[0];
					});
			})
			.catch((error: Error) => console.log(error.message));
	}

	onMarkerDragEnd = coord => {
		console.log(coord.latLng.lat());
		this.lat = coord.latLng.lat();
		console.log(coord.latLng.lng());
		this.lng = coord.latLng.lng();
		mapService.getMapInfo(this.lat, this.lng).then(mapData => {
			this.mapData = mapData.results[0];
			console.log(this.mapData);
			if (this.mapData == null) {
				this.mapData = {
					formatted_address: "none"
				};
			}
			let filter = [];
			this.address = this.mapData.formatted_address;
			if (this.mapData.address_components == null) {
				console.log("Ikke i Norge!");
			} else {
				filter = this.mapData.address_components.filter(
					e => e.types[0] == "postal_code"
				);
			}

			console.log(filter);
			if (filter[0] == null) {
				this.zipcode = "0000";
			} else {
				this.zipcode = filter[0].long_name;
			}
			console.log(this.zipcode);
		});
	};

	onMapClick(props, map, e) {
		console.log("onMapClick");
		this.infoShowing = false;
		this.activeMarker = {};
	}

	delete(case_id) {
		console.log("Er du sikker på at du vil slette følgende sak?");
		if (window.confirm("Er du sikker på at du vil slette følgende sak?")) {

		
			caseService
				.changeCaseStatus(case_id)
				.then(res => {
					console.log("Response recieved:", res);
					this.status=7;
				})
				.catch(err => {
					console.log("AXIOS ERROR:", err);
				});
		 
		}
	}

	update() {
		caseService
			.updateCase(this.props.match.params.id, {
				description: this.state.description,
				longitude: this.lng,
				latitude: this.lat,
				status_id: this.status,
				user_id: this.case.user_id,
				category_id: this.case.category_id,
				zipcode: this.zipcode,
				headline: this.state.headline,
				picture: this.case.picture,
				employee_id: this.case.employee_id,
				org_id: this.case.org_id,

				case_id: this.props.match.params.id
			})
			.then(res => {
				console.log("Response recieved:", res);
			})
			.catch(err => {
				console.log("AXIOS ERROR:", err);
			});

		window.alert("Saken har nå blitt endret");
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyDJEriw-U4wGtoFxuXALVyYLboVWl3wyhc"
})(caseEdit);
