//@flow

import * as React from "react";
import { Component } from "react-simplified";
import { NavLink } from 'react-router-dom';

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
        } else {
            console.log('Error, status invalid!');
        }
    }
}
