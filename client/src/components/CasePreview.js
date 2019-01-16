

//@flow

import * as React from "react";
import { Component } from "react-simplified";
import { NavLink } from 'react-router-dom';
import {
   
    IconButton,

} from "react-mdl";
import { caseService} from "../services.js";

import {Alert} from "./widgets";


export default class CasePreview extends Component <{title: string, status: number, id: number}> {
    x = '';
    y = '';
    z = '';

    render() {
        return(
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <NavLink to={'/case/' + this.props.id}>
                    {this.props.title}
                </NavLink>

                <span className={this.y} >{this.x}</span>
                 <NavLink to={'/case/' + this.props.id + '/edit'}>
                    rediger
                </NavLink>
                <a className="pointer" onClick ={() => this.delete(this.props.id)}>
                    Slett sak
                </a>

            </li>
        )
    }
    
    delete(case_id) {
        caseService.changeCaseStatus(case_id)
          .then(response => {
              console.log(response, "Satt status: slett i db");
              window.location.reload();
          })
          .catch(err => {
              console.log(err, "Error ved oppdatering av status");
          })
    }
    
    componentDidMount() {
        if (this.props.status == 2) {
            //console.log('test');
            this.x = 'Under vurdering';
            this.y = 'badge badge-primary';
        } else if (this.props.status == 1) {
            this.x = 'Registrert';
            this.y = 'badge badge-primary';
        } else if (this.props.status == 3) {
            this.x = 'Satt på vent';
            this.y = 'badge badge-primary';
        } else if (this.props.status == 4) {
            this.x = 'Arbeid pågår';
            this.y = 'badge badge-primary';
        } else if(this.props.status == 5){
            this.x = 'Avvist';
            this.y = 'badge badge-dager';
        } else if(this.props.status == 6) {
            this.x = 'Løst';
            this.y = 'badge badge-success';
        }else if (this.props.status == 7) {
            this.x = 'Sak slettet';
            this.y = 'badge badge-warning';
        }
         else {
            console.log('Error, status invalid!');
        }
    }

    delete(case_id) {
        console.log("Er du sikker på at du vil slette følgende sak?");
        if (window.confirm("Er du sikker på at du vil slette følgende sak?")) {
         caseService.updateCaseStatus(case_id, {
         status_id: 7,
         case_id: case_id
        })
        .then(res => {
          console.log("Response recieved:", res);
        })
        .catch(err => {
          console.log("AXIOS ERROR:", err);
        });
            window.alert("Din sak har blitt slettet");
            window.location.reload();
        }
    }
}
