import React from "react";
import { Component } from "react-simplified";
import { eventService } from "../services.js";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();



//  Get the commune_id that is saved in the sessionStorage
let commune_id = sessionStorage.getItem("commune");
let superuser = sessionStorage.getItem("superuser");

// onClick={()=>history.push("/admin/events/"+ e.event_id+"/edit")}


/** eventService.getEventsCommune()
  getEventsCommune(commune_id: number): Promise<Event[]>{
      return axios.get(url + "/events/"+commune_id);
  }
 */

export default class AdminEvents extends Component {

    events = [];
    event = new Object();
    editedEvent = new Object();

    render(){

        return(
            <div>
                <div className="title">
                    <div id="cat-page">
                        <div className="row">
                            <div className="col-md-2"></div>
                                <div className="col-md-8">
                                    <div className="group btmspace-50 headerlayout">
                                        <div className="one_half first"><h3>Events</h3></div>
                                        <div className="one_half">
                                            {this.renderAddButton()}
                                        </div>
                                    </div>

                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Navn</th>
                                            <th scope="col">Adresse</th>
                                            <th scope="col">Postkode</th>
                                            <th scope="col">Dato</th>
                                            <th colSpan="2" scope="col">&nbsp; </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {this.events.map( (e, i) => (

                                                <tr key={i}>
                                                    <th scope="row">{e.event_id}</th>
                                                    <td> {e.name} </td>
                                                    <td> {e.address} </td>
                                                    <td> {e.zipcode} </td>
                                                    <td> {e.date.substring(0,10)} </td>
                                                    <td><button type="button" className="btn btn-primary" onClick={() => { history.push('/admin/events/rediger/' + e.event_id) }}>Rediger</button></td>
                                                    <td><button type="button" className="btn btn-danger" onClick ={() => this.delete(e.event_id)}>Slett</button></td>

                                                </tr>
                                                ))}
                                        </tbody>
                                    </table>

                                    <form
                                        onSubmit= {() => this.addEvent()}
                                    >
                                        <div
                                            className="modal fade"
                                            id="exampleModal"
                                            tabIndex="-1"
                                            role="dialog"
                                            aria-labelledby="exampleModalLabel"
                                            aria-hidden="true"
                                        >

                                            <div
                                                className="modal-dialog"
                                                role="document"
                                            >

                                                <div
                                                    className="modal-content"
                                                >

                                                    <div
                                                        className="modal-header">

                                                        <h5
                                                            className="modal-title text-dark"
                                                            id="exampleModalLabel">
                                                            Legg til ny event i din kommune
                                                        </h5>

                                                        <button
                                                            type="button"
                                                            className="close"
                                                            data-dismiss="modal"
                                                            aria-label="Close">
                                                        <span
                                                            aria-hidden="true"
                                                        >&times;
                                                        </span>
                                                        </button>

                                                    </div>

                                                    <div
                                                        className="modal-body"
                                                    >
                                                        <label
                                                            htmlFor = "Event-name"
                                                        >
                                                            Navn på event
                                                        </label>
                                                        <input
                                                            type = "event-name"
                                                            className = "form-control"
                                                            id = "Event-name"
                                                            onChange={ event => (this.event.name = event.target.value) }
                                                            required

                                                        />

                                                        <label
                                                            htmlFor = "address"
                                                        >
                                                            Adresse
                                                        </label>
                                                        <input
                                                            type = "name"
                                                            className = "form-control"
                                                            id = "address"
                                                            onChange={ event => (this.event.address = event.target.value ) }
                                                            required
                                                        />

                                                        <input
                                                            type = "venue"
                                                            className = "form-control mt-2"
                                                            placeholder = "Vil du spesifisere nærmere hvor eventen er, skriv her"
                                                            id = "venue"
                                                            onChange = { event => (this.event.venue = event.target.value ) }
                                                        />

                                                        <label
                                                            htmlFor = "zipcode"
                                                        >
                                                            Postkode
                                                        </label>
                                                        <input
                                                            type= "zipcode"
                                                            className = "form-control"
                                                            id = "zipcode"
                                                            maxLength= "4"
                                                            size = "4"
                                                            required
                                                            onChange={ event => (this.event.zipcode = event.target.value ) }
                                                        />

                                                        <label
                                                            htmlFor = "date"
                                                        >
                                                            Velg dato og tidspunkt
                                                        </label>
                                                        <input
                                                            className= "form-control"
                                                            type = "datetime-local"
                                                            id = "date"
                                                            name = "date"
                                                            onChange = { event => (this.event.date = event.target.value) }
                                                            required
                                                        />

                                                        <label
                                                            htmlFor = "description"
                                                        >
                                                            Beskrivelse av event
                                                        </label>
                                                        <textarea
                                                            rows = "8"
                                                            type = "description"
                                                            className = "form-control"
                                                            id = "description"
                                                            onChange = { event => (this.event.description = event.target.value) }
                                                            required
                                                        />

                                                    </div>
                                                    <div
                                                        className="modal-footer"
                                                    >
                                                        <div
                                                            className="float-left"
                                                        >
                                                        </div>

                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary"
                                                            data-dismiss="modal">
                                                            Lukk
                                                        </button>

                                                        <input
                                                            className="btn btn-primary"
                                                            type="submit"
                                                            value="Lagre"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>



                                </div>
                            <div className="col-md-2"></div>
                        </div>
                    </div>
                </div>
            </div>




        );
    }

    componentDidMount(){
        console.log("Administrate events mounted");
        eventService
            .getEventsCommune(commune_id)
            .then(event => {
                this.events = event
            })
            .catch((error: Error) => console.log(error.message));
    }

    renderAddButton(){

        if(superuser == 1){
            return(
                <button
                    type = "button"
                    className = "btn btn-primary btn-lg largebutton"
                    data-toggle = "modal"
                    data-target = "#exampleModal"
                >
                Legg til ny event
                </button>
            );
        }else{
            return null;
        }
    }

    addEvent(){
        console.log(this.event.name);
        console.log(this.event.address);
        console.log(this.event.venue);
        console.log(this.event.zipcode);
        console.log(this.event.date);
        console.log(this.event.description);
        eventService
            .createEvent(this.event)
    }

    editEvent(eventid){


        this.editedEvent = this.events.find(a => a.event_id === eventid);
        console.log(this.editedEvent);

        return (

            <form
                onSubmit= {() => this.save()}
            >
                <div
                    className="modal fade"
                    id="exampleModal2"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >

                    <div
                        className="modal-dialog"
                        role="document"
                    >

                        <div
                            className="modal-content"
                        >

                            <div
                                className="modal-header">

                                <h5
                                    className="modal-title text-dark"
                                    id="exampleModalLabel">
                                    Endre event
                                </h5>

                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close">
                                    <span
                                        aria-hidden="true"
                                    >&times;
                                    </span>
                                </button>

                            </div>

                            <div
                                className="modal-body"
                            >
                                <label
                                    htmlFor = "Event-name"
                                >
                                    Navn på event
                                </label>
                                <input
                                    type = "event-name"
                                    className = "form-control"
                                    id = "Event-name"
                                    defaultValue={this.editedEvent.name}
                                    onChange={ event => (this.editedEvent.name = event.target.value) }
                                    required

                                />

                                <label
                                    htmlFor = "address"
                                >
                                    Adresse
                                </label>
                                <input
                                    type = "name"
                                    className = "form-control"
                                    id = "address"
                                    defaultValue={this.editedEvent.address}
                                    onChange={ event => (this.editedEvent.address = event.target.value ) }
                                    required
                                />

                                <input
                                    type = "venue"
                                    className = "form-control mt-2"
                                    placeholder = "Vil du spesifisere nærmere hvor eventen er, skriv her"
                                    id = "venue"
                                    defaultValue={this.editedEvent.venue}
                                    onChange = { event => (this.editedEvent.venue = event.target.value ) }
                                />

                                <label
                                    htmlFor = "zipcode"
                                >
                                    Postkode
                                </label>
                                <input
                                    type= "zipcode"
                                    className = "form-control"
                                    id = "zipcode"
                                    maxLength= "4"
                                    size = "4"
                                    required
                                    defaultValue={this.editedEvent.zipcode}
                                    onChange={ event => (this.editedEvent.zipcode = event.target.value ) }
                                />

                                <label
                                    htmlFor = "date"
                                >
                                    Velg dato og tidspunkt
                                </label>
                                <input
                                    className= "form-control"
                                    type = "datetime-local"
                                    id = "date"
                                    name = "date"
                                    defaultValue = {this.editedEvent.date.substring(0,16)}
                                    onChange = { event => (this.editedEvent.date = event.target.value) }
                                    required
                                />

                                <label
                                    htmlFor = "description"
                                >
                                    Beskrivelse av event
                                </label>
                                <textarea
                                    rows = "8"
                                    type = "description"
                                    className = "form-control"
                                    id = "description"
                                    defaultValue={this.editedEvent.description}
                                    onChange = { event => (this.editedEvent.description = event.target.value) }
                                    required
                                />

                            </div>
                            <div
                                className="modal-footer"
                            >
                                <div
                                    className="float-left"
                                >
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal">
                                    Lukk
                                </button>

                                <input
                                    className="btn btn-primary"
                                    type="submit"
                                    value="Lagre"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>


        );
    }


    delete(event_id : number){

        let conf = window.confirm("Er du sikker på at du vil slette denne eventen?");
        if(conf){
            eventService
                .deleteEvent(event_id);

            history.push("/admin/events");
        }else{
            console.log("false");
        }
    }

    save(){
        console.log(this.editedEvent.name);
        console.log(this.editedEvent.date);
        console.log(this.editedEvent.description);
        console.log(this.editedEvent.zipcode);
        console.log(this.editedEvent.address);
        this.editedEvent.date = this.editedEvent.date.replace("T"," ").substring(0,16);
        eventService
            .updateEvent(
                this.editedEvent.event_id,
                this.editedEvent
            );
        history.push("/admin/events");
    }
}

