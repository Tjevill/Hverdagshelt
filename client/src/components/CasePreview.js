

//@flow

import * as React from "react";
import { Component } from "react-simplified";
import {NavLink, Router} from 'react-router-dom';
import {

    IconButton,

} from "react-mdl";
import { caseService} from "../services.js";

import {Alert} from "./widgets";
import createHashHistory from "history/createHashHistory";
import ReactTooltip from 'react-tooltip';

const history = createHashHistory();

export default class CasePreview extends Component <{title: string, status: number, id: number}> {
    x = '';
    y = '';
    z = '';
    help = this.props.status;

    render() {
            return(
                <tbody>
                    <tr>
                        <td className="clickable-link" onClick={()=>history.push('/case/'+ this.props.id)}>{this.props.title}</td>
                        <td data-tip={this.y}>{this.x}<ReactTooltip /></td>
                        <td className="center-children">
                            <button type="button" className="btn btn-danger" onClick={() => this.delete(this.props.id)}>Slett sak</button>
                        </td>
                    </tr>
                </tbody>
            )
    }

    delete(case_id) {

        if(this.help == 1) {
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
        } else {
            window.alert("Du kan bare slette saker som har 'registrert' som status. Saker som allerede har blitt mottatt av kommunen kan ikke slettes.");
        }
    }

    componentDidMount() {
        if (this.props.status == 2) {
            //console.log('test');
            this.x = 'Under vurdering';
            this.y = 'Saken er mottatt av kommunen og vurderes';
        } else if (this.props.status == 1) {
            this.x = 'Registrert';
            this.y = 'Saken er sendt inn og mottat av systemet, men ikke blitt behandlet enda';
        } else if (this.props.status == 3) {
            this.x = 'Satt på vent';
            this.y = 'Saken er mottatt og blitt satt på vent, grunnet problemer som hindrer oss i å fikse problemet';
        } else if (this.props.status == 4) {
            this.x = 'Arbeid pågår';
            this.y = 'Saken er blitt tildelt en relevant bedrift, og er under utbedring';
        } else if(this.props.status == 5){
            this.x = 'Avvist';
            this.y = 'Saken har blitt mottatt av kommunen, men er enten ikke kommunen sitt ansvar eller ikke en seriøs sak';
        } else if(this.props.status == 6) {
            this.x = 'Løst';
            this.y = 'Saken er blitt behandlet av kommunen, utbedret av bedrift og regnes nå som løst';
        }else if (this.props.status == 7) {
            this.x = 'Sak slettet';
            this.y = 'Saken er slettet, hvordan klarer du å se denne?';
        }
         else {
            console.log('Error, status invalid!');
        }
    }

}
