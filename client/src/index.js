// @flow
/* eslint eqeqeq: "off" */
import React, {Component, resolve} from "react";
import ReactDOM from "react-dom";
import { Redirect, BrowserRouter, Route, NavLink, Switch,  } from 'react-router-dom'
import { withRouter } from 'react-router';
import { DropdownButton, SplitButton, ButtonToolbar, MenuItem } from 'react-bootstrap';
import createHashHistory from "history/createHashHistory";

import Menu from "./components/Menu";
import Case from "./components/Case";
import CaseListCard from "./components/CaseListCard";
import ProfileCard from "./components/ProfileCard";
import ProfilePage from "./components/ProfilePage";
import ReportPage from "./components/ReportPage";
import IssueOverview from "./components/IssueOverview";
import UserHome from "./components/userHome";
import Events from "./components/events";
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import Register from "./components/Register";
import NewOrganization from "./components/NewOrganization";
import NewEmployee from "./components/NewEmployee";
import AdminMain from "./components/AdminMain";
import LoginPage from "./components/LoginPage";
import {refreshToken} from "./components/widgets";
import PrivateRoute from 'react-private-route';
import createHistory from 'history/createBrowserHistory';
import UserEdit from "./components/UserEdit";
import ChangePassword from "./components/ChangePassword";
import IssueOverviewForEmployee from "./components/IssueOverviewForEmployee";
import Map from "./components/Map";
import CaseEdit from "./components/caseEdit";
import EventsEdit from "./components/EventsEdit";
import NewEvents from "./components/NewEvents";


function isValidUser() {
    const promiseObject = refreshToken();

    promiseObject.then(value => {
        if(value !='undefined') {
            return(value);
        }
    });
    return true;
}

class forsideMain extends Component {
    render () {
        return(
            <section id="pageintro" className="hoc clear">
                <div>

                    <h2 className="heading">Vær en hverdagshelt!</h2>
                    <p>Hverdagen kan til tider være full av store og små problemer. Denne siden handler om å fikse de små problemene i kommunen din, og gir DEG sjansen til å være en hverdagshelt!</p>
                    <footer><a className="btn" href="#">Meld feil eller mangler!</a></footer>

                </div>
            </section>
        );
    }
}

class ikkeforsideMain extends Component {
    render () {
        return(
            <section id="breadcrumb" className="hoc clear">
                <div>

                </div>
            </section>
        );
    }
}

class Main extends Component {

    render() {
/*
        const promiseObject = refreshToken();

        promiseObject.then(value => {
            if(value !='undefined') {

            }
        }); */


        return (

            <div>
                <BrowserRouter basename="/">
                    <div>

                        <div className="wrapper row1">
                            <header id="header" className="hoc clear">
                                <div id="logo" className="fl_left">
                                    <h1><a href="/"><img className="forsidelogo" src="./images/logo.png"/></a></h1>
                                </div>
                                <nav id="mainav" className="fl_right">
                                    <ul className="clear">
                                        <li className="active"><a href="index.html">Home</a></li>
                                        <li><a className="drop" href="#">Pages</a>
                                            <ul>
                                                <li><a href="pages/gallery.html">Gallery</a></li>
                                                <li><a href="pages/full-width.html">Full Width</a></li>
                                                <li><a href="pages/sidebar-left.html">Sidebar Left</a></li>
                                                <li><a href="pages/sidebar-right.html">Sidebar Right</a></li>
                                                <li><a href="pages/basic-grid.html">Basic Grid</a></li>
                                            </ul>
                                        </li>
                                        <li><a className="drop" href="#">Dropdown</a>
                                            <ul>
                                                <li><a href="#">Level 2</a></li>
                                                <li><a className="drop" href="#">Level 2 + Drop</a>
                                                    <ul>
                                                        <li><a href="#">Level 3</a></li>
                                                        <li><a href="#">Level 3</a></li>
                                                        <li><a href="#">Level 3</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#">Level 2</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#">Link Text</a></li>
                                        <li><a href="#">Link Text</a></li>
                                    </ul>
                                </nav>
                            </header>
                        </div>

                        <Route exact path="/" component={forsideMain} />

                <div>


                            <Route exact path="/" component={UserHome} />
                            <Route exact path="/case/:id" component={Case} />
                            <Route exact path="/case/:id/edit" component={CaseEdit} />
                            <Route exact path="/issues" component={IssueOverview} />
                            <Route exact path="/issues/:name/:id" component={IssueOverview} />
                            <Route exact path="/issuesEmployee/:name/:id" component={IssueOverviewForEmployee} />
                            <Route exact path="/events" component={Events}/>
                            <Route exact path="/events/:id/edit" component={EventsEdit}/>
                            <Route exact path="/map" component={Map} />
                            <Route exact path="/nyorg" component={NewOrganization}/>
                            <Route exact path="/nyansatt" component={NewEmployee}/>
                            <Route exact path="/report" component={ReportPage} />
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/user" component={ProfilePage} />
                            <PrivateRoute
                                exact
                                path="/user/edit"
                                component={UserEdit}
                                isAuthenticated={isValidUser()}
                            />
                            <PrivateRoute
                                exact
                                path="/user/changePassword"
                                component={ChangePassword}
                                isAuthenticated={isValidUser()}
                            />
                            <PrivateRoute
                                exact
                                path="/profile"
                                component={ProfilePage}
                                isAuthenticated={isValidUser()}
                                redirect="/login"
                            />
                            <PrivateRoute
                                exact
                                path="/admin/main"
                                component={AdminMain}
                                isAuthenticated={isValidUser()}
                                redirect="/login"
                            />
                            <PrivateRoute
                                exact
                                path="/login"
                                component={LoginPage}
                                isAuthenticated={!isValidUser()}
                                redirect="/"
                            />

                </div>
                <div className="wrapper row5">
                    <div id="copyright" className="hoc clear">

                        <p className="fl_left">Copyright &copy; 2018 - All Rights Reserved - <a href="#">Team 5</a>
                        </p>
                        <p className="fl_right">I samarbeid med <a target="_blank" href="http://www.ntnu.no/" title="NTNU">NTNU</a></p>

                    </div>
                </div>
                </div>
    </BrowserRouter>

            </div>
        );
    }
}

export default withRouter(Main);

ReactDOM.render(<Main />, document.getElementById("root"));
