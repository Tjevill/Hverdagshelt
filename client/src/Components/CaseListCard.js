//@flow

import * as React from "react";
import { Component } from "react-simplified";
import CasePreview from "./CasePreview";
import {caseService} from "../services";


export default class CaseListCard extends Component <{ id: number }> {
    cases = [];
    render() {
        return(
            <div className="card right card-background">
                <h1>Your cases</h1>
                <ul className="list-group">
                    {this.cases.map(x => (
                        <CasePreview title={x.headline} status={x.status_id}/>
                    ))}
                </ul>
            </div>
        );
    }
    componentDidMount(){
        // let cap = 50;
        caseService.getCaseOnUser(this.props.id)
            .then((cases => (this.cases = cases)))
            .catch((error: Error) => console.log(error.message));
    }

}