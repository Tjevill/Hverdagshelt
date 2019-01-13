import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { AdminMain } from './AdminMain';
import { LoginPage } from './LoginPage';



export default class Admin extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <h1>admin</h1>
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        <Router>
                            <div>

                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

