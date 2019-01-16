

//@flow

import * as React from "react";
import { Component } from "react-simplified";
import { NavLink } from 'react-router-dom';
import {
   
    IconButton,

} from "react-mdl";
import { caseService} from "../services.js";

export default class CasePreview extends Component <{title: string, status: number, id: number}> {
    x = '';
    y = '';

    render() {
        return(
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <NavLink to={'/case/' + this.props.id}>
                    {this.props.title}
                </NavLink>
                <span className={this.y}>{this.x}</span>

                <NavLink to={'/case/' + this.props.id + '/edit'}>
                    rediger
                </NavLink>
                <IconButton
                                        name="delete"
                                        onClick={() => {
                                            this.delete(this.props.id);
                                        }}
                                    />
            </li>
        )
    }
    componentDidMount() {
        if (this.props.status == 2) {
            //console.log('test');
            this.x = 'Godkjent';
            this.y = 'badge badge-primary';
        } else if (this.props.status == 1) {
            this.x = 'Under behandling';
            this.y = 'badge badge-warning';
        } else if (this.props.status == 3) {
            this.x = 'Benektet';
            this.y = 'badge badge-danger';
        } else if (this.props.status == 4) {
            this.x = 'Sak løst';
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
