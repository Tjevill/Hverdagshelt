//@flow

import * as React from "react";
import { Component } from "react-simplified";

export default class CasePreview extends Component <{title: string, status: number}> {
    x = '';
    y = '';
    render() {
        return(
            <li className="list-group-item d-flex justify-content-between align-items-center">
                {this.props.title}
                <span className={this.y}>x</span>
            </li>
        )
    }
    mounted() {
        if (this.props.status == 1) {
            this.x = 'Godkjent';
            this.y = 'badge badge-primary';
        } else if (this.props.status == 2) {
            this.x = 'Under behandling';
            this.y = 'badge badge-warning';
        } else if (this.props.status == 3) {
            this.x = 'Benektet';
            this.y = 'badge badge-danger';
        } else if (this.props.status == 4) {
            this.x = 'Sak løst';
            this.y = 'badge badge-success';
        }
    }
}