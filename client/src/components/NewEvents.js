//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import { userService } from "../services";
import { Alert,Card, NavBar,ListGroup,Row, Column, Button, Form} from './widgets';

const history = createHashHistory();




export default class EventsEdit extends Component {
  event = new Object();

  render(){
    return (
      <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container text-center">
          <h1 className="display-4">Opprett Nytt Event</h1>
        </div>
      </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <form>
                <div className="form-group">
                  <label for="exampleInputName">Event navn</label>
                    <input
                      type="name"
                      className="form-control"
                      id="Name"
                      placeholder="Skriv inn navn til event">

                    </input>
                    </div>
                <div className="form-group">
                  <label for="exampleInputTime">Tidspunkt</label>
                    <input
                      type="tidspunkt"
                      className="form-control"
                      id="Timming"
                      placeholder="">

                    </input>
                   </div>
                   <div className="form-group">
                     <label for="exampleInputDescription">Beskrivelse</label>
                       <input
                         type="description"
                         className="form-control"
                         id="Desciption"
                         placeholder="">

                       </input>
                      </div>
                    <div className="form-group">
                        <label for="exampleInputDescription">Postnummer</label>
                          <input
                            type="zipcode"
                            className="form-control"
                            id="zipcode"
                            maxlength="4"
                            size="4"
                            placeholder="">

                          </input>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputDescription">Adresse</label>
                          <input
                            type="zipcode"
                            className="form-control"
                            id="zipcode"
                            maxlength="4"
                            size="4"
                            placeholder="">

                          </input>
                    </div>
                  <button type="submit" className="btn btn-primary">Rediger</button>
              </form>
            </div>
            <div className="col">
            <div className="form-group">
              <label for="exampleFormControlFile1">Example file input</label>
                <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
                </div>
            </div>
          </div>
      </div>
      </>
    );
  }


  componentDidMount(){
  }

  save(){
  }
}
