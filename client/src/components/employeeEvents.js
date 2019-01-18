import React from "react";
import { Component } from "react-simplified";
import { eventService } from "../services.js";



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

            <table className="table">
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

                        <tr key={i}>

                            <th scope="row">{e.event_id}</th>
                            <td> {e.name} </td>
                            <td> {e.address} </td>
                            <td> {e.zipcode} </td>
                            <td> {e.date.substring(0,10)} </td>
                            <td><a href = {"#/events/"+e.event_id+"/edit"}><button className = "btn btn-primary">Rediger</button></a></td>

                        </tr>
                        ))}
                </tbody>
            </table>

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

