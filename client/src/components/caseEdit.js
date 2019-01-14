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
import Map from "./Map";
import {Alert} from './widgets';
import Geocode from "react-geocode";

const formValid = ({ formErrors, ...rest }) => {
	let valid = true;


  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });


// validate the form was filled out
  Object.values(rest).forEach(val => {
    val ==="" && (valid = false);
  });
	return valid;
};

export default class caseEdit extends Component<{
	match: { params: { id: number } }
}> {
	case = new Object();
	loaded = false;
  openMap = false;
  case = {};
  map = <></>;
  mapData = {};
  province = "";
  test = <h1>test</h1>;
	constructor(props) {
		super(props);
		this.state = {
			headline: "",
			address: "",
			zip: "",
			description: "",
			formErrors: {
				headline: "",
				address: "",
				zip: "",
				description: ""
			}
		};
	}

	handleSubmit = e => {
		e.preventDefault();

		if (formValid(this.state)) {
			console.log(` --SUBMITTING--
				Tittel: ${this.state.headline}
				Adresse: ${this.state.address}
			Postnummer: ${this.state.zip}
			`);
		} else {
			 Alert.danger("Ingen endringer ble utført");
			console.error("FORM INVALID - DISPLAY ERROR MESSAGE");

		}
	};

	handleChange = e => {
		e.preventDefault();
		const { name, value } = e.target;
		 let formErrors = { ...this.state.formErrors };
		//console.log("Name:" , name );
		//console.log("Value:" , value );

		switch (name) {
			case "headline":
				formErrors.headline =
					value.length < 3 ? "minimum 3 bokstaver headline" : "";
				break;

			case "address":
				formErrors.address =
					value.length < 3 ? "minimum 3 bokstaver adress" : "";
				break;

			case "zip":
				formErrors.zip =
					value.length !== 4 ? "Oppgi gyldig postnr" : "";
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
		if(this.loaded){
		return (
			<div className="caseEdit-wrapper">

				<div className="form-wrapper">
					<h1> Rediger sak </h1>
					
					<form onSubmit={this.handleSubmit} noValidate>
						<div className="headline">

							<label htmlFor="headline"> Tittel </label>
							<input
								className={formErrors.headline.length > 0 ? "error" : null}
								type="text"
								defaultValue={this.case.headline}
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
							<input
							className={formErrors.address.length > 0 ? "error" : null}
								type="text"
								defaultValue={this.mapData.formatted_address.split(",")[0]}

								placeholder="Adresse"
							
								name="address"
								noValidate
								onChange={this.handleChange}
							/>
							{formErrors.address.length > 0 && (
								<span className="errorMessage">
									{formErrors.address}
								</span>
							)}
						</div>

							<div className="description">
							<label htmlFor="description"> Beskrivelse </label>
							<input
								className={formErrors.description.length > 0 ? "error" : null}
								type="text"
								defaultValue={this.case.description}
								placeholder="Beskrivelse"
							
								name="description"
								noValidate
								onChange={this.handleChange}
							/>

							{formErrors.description.length > 0 && (
								<span className="errorMessage">
									{formErrors.description}
								</span>
							)}
						</div>

						<div className="zip">
							<label htmlFor="zip"> Postnummer </label>
							<input
								className={formErrors.zip.length > 0 ? "error" : null}
								type="text"
								defaultValue={this.case.zipcode}
								placeholder="Postnummer"
							
								name="zip"
								noValidate
								onChange={this.handleChange}
							/>

							{formErrors.zip.length > 0 && (
								<span className="errorMessage">
									{formErrors.zip}
								</span>
							)}
						</div>
						<div className="editCase">
							<button type="submit"> Lagre endringer </button>
						</div>

					</form>


				</div>


				<div className="caseEdit-map">
			{this.map}
			</div>

			</div>
			);
	} else {
		return (
		<h1> Loading </h1>
		);
	}
	}

	componentDidMount() {
		caseService //Endre til event senere
			.getCaseById(this.props.match.params.id)
			.then(sak => {
				this.case = sak[0];
				this.forceUpdate();
			})
			.catch((error: Error) => console.log(error.message));




	if(this.openMap) document.location.reload();
    this.openMap = true;
    let casePromise = caseService.getCaseById(this.props.match.params.id);
    casePromise.then(caseData => (
      //console.log(caseData[0]),
      this.case = caseData[0],
      mapService.getMapInfo(this.case.latitude, this.case.longitude).then(
        mapData => (
          this.mapData = mapData.results[0],
          //console.log(this.mapData),
          mapService.getProvince(this.case.zipcode).then(
            zipData => (
              this.province = zipData.result.postnr[0].kommune,
              this.loaded = true
            )
          )
        )
      ),
      this.map = <Map lat={this.case.latitude} long={this.case.longitude}/>
    ));
	}
}
