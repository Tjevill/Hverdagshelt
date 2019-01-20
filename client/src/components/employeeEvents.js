import React from "react";
import { Component } from "react-simplified";
import { eventService } from "../services.js";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();



//  Get the commune_id that is saved in the sessionStorage
let commune_id = sessionStorage.getItem("commune");
let superuser = sessionStorage.getItem("superuser");




/** eventService.getEventsCommune()
  getEventsCommune(commune_id: number): Promise<Event[]>{
      return axios.get(url + "/events/"+commune_id);
  }
 */

export default class EmployeeEvents extends Component {

    events = [];
    event = new Object();

    render(){

        return(

            <div className = "jumbotron jumbotron-fluid">

                <div className = "container text-center">
                    <h1 className = "display-4">Klikk på event for å redigere</h1>
                </div>

                {this.renderAddButton()}
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Navn</th>
                        <th scope="col">Adresse</th>
                        <th scope="col">Postkode</th>
                        <th scope="col">Dato</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.events.map( (e, i) => (

                            <tr key={i}
                                onClick={()=>history.push("/events/"+ e.event_id+"/edit")}
                            >

                                <th scope="row">{e.event_id}</th>
                                <td> {e.name} </td>
                                <td> {e.address} </td>
                                <td> {e.zipcode} </td>
                                <td> {e.date.substring(0,10)} </td>

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
                    className = "btn btn-primary"
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
}

