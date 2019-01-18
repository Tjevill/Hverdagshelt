//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import {eventService, userService} from "../services";
import { Alert,Card, NavBar,ListGroup,Row, Column, Button, Form} from './widgets';
import {Loading} from "./widgets";

const history = createHashHistory();




export default class EventsEdit extends Component <{ match: { params: { id: number } } }> {
  event = new Object();

  loaded = false;

  render(){
    if(this.loaded) {
      return (
          <>
            <div class="jumbotron jumbotron-fluid">
              <div class="container text-center">
                <h1 class="display-4">Rediger Event</h1>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col">
                  <form>
                    <div class="form-group">
                      <label for="exampleInputName">Event navn</label>
                      <input
                          type="name"
                          class="form-control"
                          id="Name"
                          defaultValue={this.event.name}></input>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputTime">Tidspunkt</label>
                      <input
                          type="tidspunkt"
                          class="form-control"
                          id="Timming"
                          defaultValue={this.event.date}></input>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputDescription">Beskrivelse</label>
                      <textarea
                          rows = "8"
                          type="description"
                          class="form-control"
                          id="Desciption"
                          defaultValue={this.event.description}></textarea>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputDescription">Postnummer</label>
                      <input
                          type="zipcode"
                          class="form-control"
                          id="zipcode"
                          maxlength="4"
                          size="4"
                          defaultValue={this.event.zipcode}></input>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputDescription">Adresse</label>
                      <input
                          type="zipcode"
                          class="form-control"
                          id="zipcode"
                          maxlength="4"
                          size="4"
                          defaultValue={this.event.address}></input>
                    </div>
                    <button type="submit" class="btn btn-primary">Rediger</button>
                  </form>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label for="exampleFormControlFile1">Example file input</label>
                    <input type="file" class="form-control-file" id="exampleFormControlFile1"/>
                  </div>
                  <img src="https://www.magical-planet.com/wp-content/uploads/2018/03/Duomo-of-Milan-696x366.jpg"/>
                </div>
              </div>
            </div>
          </>
      );
    }else{
      return(
          <Loading/>
          );

    }
  }


  componentDidMount(){
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

  save(){
  }
}
