

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
            <li className="list-group-item">
                <NavLink to={'/case/' + this.props.id}>
                    {this.props.title}
                </NavLink>

                <span className={this.y + " case-status"} >{this.x}</span>
                 {/*<NavLink to={'/case/' + this.props.id + '/edit'}>*/}
                    {/*rediger*/}
                {/*</NavLink>*/}
                <a className="pointer delete-case" onClick ={() => this.delete(this.props.id)}>
                    Slett sak
                </a>

            </li>
        )
    }
    
    delete(case_id) {
        
        if ( window.confirm("Er du sikker på at du ønsker å slette saken?") ){
            caseService.changeCaseStatus(case_id)
            .then(response => {
              console.log(response, "Satt status: slett i db");           
              window.location.reload();
            })
            .catch(err => {
                console.log(err, "Error ved oppdatering av status");
            });
          }
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
    
}