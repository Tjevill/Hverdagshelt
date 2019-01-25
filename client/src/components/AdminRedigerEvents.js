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
import createHashHistory from "history/createHashHistory";
import { eventService } from "../services.js";
import { Alert,Loading } from "./widgets";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";

const history = createHashHistory();
let superuser = sessionStorage.getItem("superuser");

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

   // validate the form was filled out
  Object.values(rest).forEach(val => {
    val == null && (valid = false);
  });

  return valid;
};

export default class caseEdit extends Component<{
  match: { params: { id: number } }
}> {
  loaded = false;
  event = "";
  dateFormatted ="";

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "2018-02-02 12:20",
      dateDay: new Date(),
      dateTime: "",
      description: "",
      zipcode: "",
      address: "",
      formErrors: {
        name: "",
        date: "",
        description: "",
        zipcode: "",
        address: "",
        dateDay: "",
        dateTime: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
          name: ${this.state.name}
          date:  ${this.state.date}
          dateDay:  ${this.state.dateDay}
          dateTime:  ${this.state.dateTime}
          description:  ${this.state.description}
          zipcode:  ${this.state.zipcode}
          address: ${this.state.address}
          event_id:  ${this.props.match.params.id}
      `);

   // this.dateFormatted = this.state.dateDay +this.state.dateTime;
    //console.log(this.dateFormatted)

      //this.update();
    } else {
      window.alert("Vennligst fyll ut alle felt");
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
      case "name":
        formErrors.name = value.length < 3 ? "minimum 3 bokstaver Tittel" : "";
        break;

      case "address":
        formErrors.address =
          value.length < 3 ? "minimum 3 bokstaver Adresse" : "";
        break;

      case "zipcode":
        formErrors.zipcode = value.length !== 4 ? " 4 tall:  Postnummer" : "";
        break;

      case "description":
        formErrors.description =
          value.length < 3 ? "minimum 3 bokstaver Beskrivelse" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  onChangeTime = time => this.setState({ dateTime: time });
  onChangeDay = date => this.setState({ dateDay: new Date(date)});

  render() {
    const { formErrors } = this.state;

    if (this.loaded) {
    return (
      <div className="caseEdit-wrapper">
        <link rel="stylesheet" href="editUsers.css" />
        <div className="form-wrapper">
          <h1> Rediger Events </h1>

          <form onSubmit={this.handleSubmit} noValidate>
            <div className="name">
              <label htmlFor="name"> Tittel </label>
              <input
                className={formErrors.name.length > 0 ? "error" : null}
                type="text"
                value={this.state.name}
                placeholder="Tittel"
                name="name"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.name.length > 0 && (
                <span className="errorMessage">{formErrors.name}</span>
              )}
            </div>

            <div className="dateDay">
              <label htmlFor="dateDay"> Dato </label>

              <DatePicker
                onChange={this.onChangeDay}
                value={this.state.dateDay}
                minDate={new Date()}
                returnValue="start"
              />
            </div>

            <div className="dateTime">
              <label htmlFor="dateTime"> Klokkeslett </label>
              <TimePicker
                onChange={this.onChangeTime}
                value={this.state.dateTime}
              />
            </div>

            {/*<div className="date">

              <label htmlFor="date"> Tidspunkt </label>
              <input
                className={formErrors.date.length > 0 ? "error" : null}
                type="text"
                value={this.state.date}
                placeholder="Tidspunkt"
                name="date"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.date.length > 0 && (
                <span className="errorMessage">{formErrors.date}</span>
              )}
            </div>
            */}

            <div className="description">
              <label htmlFor="description"> Beskrivelse </label>
              <textarea
                className={formErrors.description.length > 0 ? "error" : null}
                type="text"
                value={this.state.description}
                placeholder="Beskrivelse"
                name="description"
                noValidate
                onChange={this.handleChange}
              />

              {formErrors.description.length > 0 && (
                <span className="errorMessage">{formErrors.description}</span>
              )}
            </div>

            <div className="zipcode">
              <label htmlFor="zipcode"> Postnummer </label>
              <input
                className={formErrors.zipcode.length > 0 ? "error" : null}
                type="number"
                value={this.state.zipcode}
                placeholder="Postnummer"
                name="zipcode"
                noValidate
                onChange={this.handleChange}
              />

              {formErrors.zipcode.length > 0 && (
                <span className="errorMessage">{formErrors.zipcode}</span>
              )}
            </div>

            <div className="address">
              <label htmlFor="address"> Adresse </label>
              <input
                className={formErrors.address.length > 0 ? "error" : null}
                type="text"
                value={this.state.address}
                placeholder="Adresse"
                name="address"
                noValidate
                onChange={this.handleChange}
              />

              {formErrors.address.length > 0 && (
                <span className="errorMessage">{formErrors.address}</span>
              )}
              {console.log(this.state.dateDay)}
              {console.log(this.state.dateTime)}
              {console.log(this.state.dateFormatted)}
            </div>

            {this.renderEditButton()}
          </form>
        </div>
      </div>
    );}else{
      return <Loading />;
    }
  }

  componentDidMount() {
    eventService.getOne(this.props.match.params.id).then(event => {
      this.setState({
        name: event[0].name,
        //date: event[0].date.replace("T", " ").substring(0, 16),
        dateDay: new Date(event[0].date.replace("T", " ").substring(0, 11)),
        dateTime: event[0].date.replace("T", " ").substring(11, 16),
        description: event[0].description,
        zipcode: event[0].zipcode,
        address: event[0].address
      });
      this.event = event;
      this.loaded = true;
    });
  }

  // Creates the button that allows a superuser to save changes made in an event.
  renderEditButton() {
    if (superuser == 1) {
      return (
        <div className="editCase">
          <button type="submit" className="btn btn-primary">
            Lagre endringer
          </button>
        </div>
      );
    } else {
      return null;
    }
  }

  update() {


    eventService
      .updateEvent(this.props.match.params.id, {
        name: this.state.name,
        date: "2019-03-03 12:30",
        description: this.state.description,
        zipcode: this.state.zipcode,
        address: this.state.address
      })
      .then(response => {
        console.log("Here !! ", response);
        console.log("Edit event response: ", response);
          window.alert("Event endringer lagret!");
          window.location = "#admin/events/" + response.insertId;
      })
      .catch((error: Error) => console.log(error.message));
  }

}
