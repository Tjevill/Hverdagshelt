//@flow

import * as React from "react";
import { Component } from "react-simplified";
import createHistory from 'history/createBrowserHistory';
import { NavLink } from 'react-router-dom';

const history = createHistory({
    forceRefresh: true
})

export default class ReportValidation extends Component <{ match: { params: { id: number } } }>{

    componentDidMount() {
        setTimeout(() => (window.location = ("#case/" + this.props.match.params.id)), 2000);
    }

    render(){
        return(
            <div className="loading-img">
                <h3 align="center">Takk for innmedlingen, du vil bli redirigert til sakssiden hvert øyeblikk...</h3>
                <NavLink to={'/profile'}>
                    <p className="align-link">Klikk her om du ikke blir redirigert</p>
                </NavLink>
                    <img src='https://i.redd.it/ounq1mw5kdxy.gif' />
            </div>
        );
    }
}
