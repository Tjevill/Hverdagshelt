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
        setTimeout(() => (history.replace("#/case/" + this.props.match.params.id), window.location.reload()), 3000);
    }

    render(){
        return(
            <div className="loading-img">
                <h3 align="center">Takk for innmedlingen, du vil bli redirigert til sakssiden hvert øyeblikk...</h3>
                <NavLink to={'/case/' + this.props.match.params.id}>
                    <p className="align-link">Klikk her om du ikke blir redirigert</p>
                </NavLink>
                    <img src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/585d0331234507.564a1d239ac5e.gif' />
            </div>
        );
    }
}
