import React from "react";
import { Component } from "react-simplified";
import { eventService } from "../services.js";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();



//  Get the commune_id that is saved in the sessionStorage
let commune_id = sessionStorage.getItem("commune");

/** eventService.getEventsCommune()
  getEventsCommune(commune_id: number): Promise<Event[]>{
      return axios.get(url + "/events/"+commune_id);
  }
 */

export default class EmployeeEvents extends Component {

    events = [];

    render(){

        return(

            <div className = "jumbotron jumbotron-fluid">

                <div className = "container text-center">
                    <h1 className = "display-4">Klikk på event for å redigere</h1>
                </div>

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
                                    onClick={()=>history.push("/events/"+ e.event_id+"/edit")}>

                                    <th scope="row">{e.event_id}</th>
                                    <td> {e.name} </td>
                                    <td> {e.address} </td>
                                    <td> {e.zipcode} </td>
                                    <td> {e.date.substring(0,10)} </td>

                                </tr>
                                ))}
                        </tbody>
                    </table>
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
}

