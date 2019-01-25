//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import { eventService, userService } from "../services";
import {
  Alert,
  Card,
  NavBar,
  ListGroup,
  Row,
  Column,
  Button,
  Form
} from "./widgets";
import { Loading } from "./widgets";

const history = createHashHistory();

let superuser = sessionStorage.getItem("superuser");

export default class AdminRedigerEvents extends Component<{
  match: { params: { id: number } }
}> {
  event = new Object();

  loaded = false;

  render() {
    if (this.loaded) {
      return <div className="container">
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">
              <div>
                <div className="row">
                  <div className="col">
                    <h2>Rediger event</h2>
                    <form>
                      <div className="form-group">
                        <label for="exampleInputName">Event navn</label>
                        <input type="name" className="form-control" id="Name" defaultValue={this.event.name} onChange={event => (this.event.name = event.target.value)} />
                      </div>

                      <div className="form-group">
                        <label for="exampleInputTime">Tidspunkt: </label>
                        <input type="time" className="form-control" id="timing" defaultValue={this.event.date.substring(0, 16)} onChange={event => (this.event.date = event.target.value.replace("T", " "))} />

                        <small id="dateHelp" className="form-text text-muted">
                          Format: YYYY-MM-DD HH-MM-SS
                        </small>
                      </div>

                      <div className="form-group">
                        <label for="exampleInputDescription">
                          Beskrivelse
                        </label>
                        <textarea rows="8" type="description" className="form-control" id="description" defaultValue={this.event.description} onChange={event => (this.event.description = event.target.value)} />
                      </div>

                      <div className="form-group">
                        <label for="exampleInputDescription">
                          Postnummer
                        </label>
                        <input type="zipcode" className="form-control" id="zipcode" maxLength="4" size="4" defaultValue={this.event.zipcode} onChange={event => (this.event.zipcode = event.target.value)} />
                      </div>

                      <div className="form-group">
                        <label for="exampleInputDescription">
                          Adresse
                        </label>
                        <input type="address" className="form-control" id="address" size="4" defaultValue={this.event.address} onChange={event => (this.event.address = event.target.value)} />
                      </div>
                      {this.renderEditButton()}
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2" />
          </div>
        </div>;
    } else {
      return <Loading />;
    }
  }

  componentDidMount() {
    console.log("Edit event mounted.");
    eventService
      .getOne(this.props.match.params.id)
      .then(enevent => {
        console.log(enevent);
        this.event = enevent[0];
        this.loaded = true;
        this.forceUpdate();
      })
      .catch((error: Error) => console.log(error.message));
  }

  // Creates the button that allows a superuser to save changes made in an event.
  renderEditButton() {
    if (superuser == 1) {
      return (
        <div>
          <button
            onClick={() => this.save()}
            type="button"
            className="btn btn-primary"
            id="superuserbutton"
          >
            Lagre endringer
          </button>
        </div>
      );
    } else {
      return null;
    }
  }

  save() {
    console.log(this.event.name);
    console.log(this.event.date);
    console.log(this.event.description);
    console.log(this.event.zipcode);
    console.log(this.event.address);
    this.event.date = this.event.date.replace("T"," ").substring(0,16);
    eventService
        .updateEvent(
            this.props.match.params.id,
            this.event
            )
        .then(response =>{
            console.log("Edit event response: ", response);
            history.push("/admin/events/1");
            // history.push("/admin/events");
        })
        .catch((error: Error) => (console.log(error.message)));

  }

}
