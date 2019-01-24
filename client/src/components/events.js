//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { eventService, userService } from "../services.js";
import createHashHistory from "history/createHashHistory";
import { Loading } from "./widgets";

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
const history = createHashHistory();

function sliceArray(array, size) {
  var result = [];
  for (var x = 0; x < Math.ceil(array.length / size); x++) {
    var start = x * size;
    var end = start + size;
    result.push(array.slice(start, end));
  }
  return result;
}

function count(array) {
  var result = [];
  for (var x = 1; x < array.length + 1; x++) {
    result.push(x);
  }
  return result;
}

export default class events extends Component<{
  match: { params: { id: number } }
}> {
  /*user= "haki"; // Endre til case senere */
  events = [];
  eventsFraKommune = [];
  backup = [];
  fylker = [];
  kommuner = [];
  eventside = [];
  loading = true;

  search = event => {
    this.eventsFraKommune = this.backup.filter(function(value) {
      return (
        value.name.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1
      );
    });
    this.forceUpdate();
  };

  handleChangeFylke = event => {
    if (event.target.value == 0) {
      this.eventsFraKommune = this.events;
      document.getElementById("kommune").value = 0;
      this.forceUpdate();
    } else {
      console.log("Fylke valgt: " + event.target.value);
      userService
        .getProvince(event.target.value)
        .then(response => {
          this.kommuner = response;
          console.log("kommuner: ", this.kommuner);
          this.forceUpdate();
        })
        .catch((error: Error) =>
          console.log("Fails by getting available kommuner")
        );
    }
  };

  handleChangeKommune = event => {
    eventService
      .getEventsCommune(event.target.value)
      .then(response => {
        this.eventsFraKommune = response;
        console.log(response);
        this.forceUpdate();
      })
      .catch((error: Error) =>
        console.log("Fails by getting available  from kommune")
      );
  };

  render() {
    this.eventside = this.eventsFraKommune.slice(
      (this.props.match.params.id - 1) * 5,
      (this.props.match.params.id - 1) * 5 + 5
    );
    if (!this.loading) {
      return (
        <>

          <div className="container">
            <div className="row">
              <div className="col-12 col-md-8">
                <img
                    src="https://visualpharm.com/assets/951/Event%20Accepted%20Tentatively-595b40b65ba036ed117d403b.svg"
                    id="Saker-icon-pic"
                />
              </div>
              <div className="col-6 col-md-4" />
            </div>

            <div className="row">
              <div
                  className="col-6 col-md-4"
              >
                <div className="form-group mt-2">
                  <span
                      className="glyphicon glyphicon-search"
                      aria-hidden="true"
                  />
                  <input
                      className = "form-control mb-2"
                      type="text"
                      id="search"
                      name="search"
                      placeholder="Søk på navn.."
                      onChange={this.search}
                  />
                </div>

              </div>


              <div className="col-6 col-md-4">
                <div className="form-group">
                  <label htmlFor="inputFylke">Velg Fylke</label>
                  <select
                    id="fylke"
                    name="fylke"
                    className="form-control"
                    onChange={this.handleChangeFylke}
                  >
                    <option selected value={0}>
                      Alle{" "}
                    </option>
                    {this.fylker.map((fylke, i) => {
                      return (
                        <option value={fylke.ID} key={i}>
                          {fylke.navn}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="form-group">
                  <label htmlFor="inputKommune">Velg Kommune</label>
                  <select
                    id="kommune"
                    name="kommune"
                    className="form-control"
                    onChange={this.handleChangeKommune}
                  >
                    <option selected value={0}>
                      Velg fylke først{" "}
                    </option>
                    {this.kommuner.map(kommune => {
                      return <option value={kommune.ID}>{kommune.navn}</option>;
                    })}
                  </select>
                </div>
              </div>


            </div>

            <div className="row">

              <div className="col-6 col-md-4" />
              <div className="col-6 col-md-4" />
            </div>
          </div>

          <div id="events-page" className="events-body">
            <div className="userHome-body">
              <div className="userHome-container">
                <div className="userHome-events">
                  {this.eventside.map((e, i) => (
                    <div key={i} className="userHome-event">
                      <div className="event-date">
                        <div className="calender">
                          <p>
                            {this.getMonth(
                              e.date
                                .substring(0, 16)
                                .replace("20", "")
                                .replace("T", " ")
                                .substring(0, 8)
                                .substring(3, 5)
                            )}
                          </p>

                          <h4>{e.date.substring(8, 10).replace("0", "")}</h4>
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

                        <button
                          type="button"
                          className="btn btn-info"
                          data-toggle="modal"
                          data-target={"#" + e.event_id}
                        >
                          Les mer
                        </button>

                        <div
                          className="modal fade"
                          id={e.event_id}
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                >
                                  {e.name}
                                </h5>

                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>

                              <div className="modal-body">{e.description}</div>
                              <div className="modal-footer">
                                <div className="float-left">
                                  {e.venue + " - " + e.address}
                                </div>
                                <button
                                  type="button"
                                  className="btn btn-info"
                                  data-dismiss="modal"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="event-image">
                        <img
                          className="max"
                          src="https://images.pexels.com/photos/2143/lights-party-dancing-music.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  {count(sliceArray(this.eventsFraKommune, 5)).map(sidetall => (
                    <button
                      type="button"
                      class="btn btn-outline-dark"
                      id="Saker-side-button"
                      onClick={() => history.push("/events/" + sidetall)}
                    >
                      {sidetall}
                    </button>
                  ))}
                </div>
                <br/><br/>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <Loading />;
    }
  }

  componentDidMount() {
    console.log("events mounted");
    eventService //Endre til event senere
      .getAllEvents()
      .then(sak => {
        this.events = sak;
        this.eventsFraKommune = sak;
        this.backup = sak;
      })
      .catch((error: Error) => console.log(error.message));

    userService
      .getDistricts()
      .then(fylker => {
        this.fylker = fylker;
        this.forceUpdate();
      })
      .catch((error: Error) => console.log("Error: getting fylker"));

    this.loading = false;
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
