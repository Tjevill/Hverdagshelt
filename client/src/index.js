// @flow
/* eslint eqeqeq: "off" */
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import { DropdownButton, SplitButton, ButtonToolbar, MenuItem } from 'react-bootstrap';
import { Redirect, HashRouter, Route, NavLink, Switch,  } from 'react-router-dom'
import { withRouter } from 'react-router';
import {Component, sharedComponentData} from 'react-simplified';
import {refreshToken} from "./components/widgets";

import AdminBedrift from "./components/AdminBedrift";
import AdminMain from "./components/AdminMain";
import AdminNyBedrift from "./components/AdminNyBedrift";
import AdminRedigerBedrift from "./components/AdminRedigerBedrift";

import AdminEditPrivateUsers from  "./components/AdminEditPrivateUsers";
import AdminEditEmployee  from  "./components/AdminEditEmployee";

import AdminKategori from "./components/AdminKategori";
import AdminNyKategori from "./components/AdminNyKategori";
import AdminRedigerKategori from "./components/AdminRedigerKategori";

import Case from "./components/Case";
import CaseEdit from "./components/caseEdit";
import ChangePassword from "./components/ChangePassword";
import ChangePasswordEmployee from "./components/ChangePasswordEmployee";
import ChangePasswordOrg from "./components/ChangePasswordOrg";
import createHashHistory from "history/createHashHistory";
import EmployeeEdit from "./components/EmployeeEdit";
import EmployeeEvents from "./components/employeeEvents";
import EmployeeOverview from "./components/EmployeeOverview";
import Events from "./components/events";
import EventsEdit from "./components/EventsEdit";
import ForgottenPasswordUser from "./components/ForgottenPasswordUser";
import ForgottenPasswordEmployee from "./components/ForgottenPasswordEmployee";
import ForgottenPasswordOrganization from "./components/ForgottenPasswordOrganization";
import IssueOverview from "./components/IssueOverview";
import IssueOverviewForEmployee from "./components/IssueOverviewForEmployee";
import LoginPage from "./components/LoginPage";
import LogTable from "./components/LogTable";
import Map from "./components/Map";
import Menu from "./components/Menu";
import MinSideKommune from "./components/MinSideKommune";
import NewEmployee from "./components/NewEmployee";
import NewEvents from "./components/NewEvents";
import NewOrganization from "./components/NewOrganization";
import OrgEdit from "./components/OrgEdit"
import OrgIssueOverview from "./components/OrgIssueOverview";
import Statistikk from "./components/Statistikk";
import Statistikk2 from "./components/Statistikk2";
import StatisticsPage from "./components/StatisticsPage";
import PrivateRoute from 'react-private-route';
import PrivateUsersList from "./components/PrivateUsersList";
import ProfilePage from "./components/ProfilePage";
import React from "react";
import ReactDOM from "react-dom";
import Register from "./components/Register";
import ReportPage from "./components/ReportPage";
import ReportValidation from "./components/ReportValidation";
import UserEdit from "./components/UserEdit";
import UserHome from "./components/userHome";
import UpdateUserPasswordFromToken from "./components/UpdateUserPasswordFromToken";
import UpdateEmployeePasswordFromToken from "./components/UpdateEmployeePasswordFromToken";
import UpdateOrgPasswordFromToken from "./components/UpdateOrgPasswordFromToken";

const history = createHashHistory();


class forsideMain extends Component {

    render() {
        let button;
        if(sessionStorage.getItem("access")=="kommune"){

        }else{
          button =(
            <button className="btn btn-primary" onClick={() => { history.push('/report/') }}>Meld feil eller mangler!</button>
          );
        }
        return(
            <section id="pageintro" className="hoc clear">
                <div>

                    <h2 className="heading">Vær en hverdagshelt!</h2>
                    <p>Hverdagen kan til tider være full av store og små problemer. Denne siden handler om å fikse de små problemene i kommunen din, og gir DEG sjansen til å være en hverdagshelt!</p>
                    <footer>{button}</footer>

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


class LoginStatus extends Component {
    render () {
        return (
            (this.props.loggedin)
                ? <div className="logged-in-as">{sessionStorage.getItem("email")} <br/>({ sessionStorage.getItem("access") }), <NavLink to="/" onClick={this.handleLogOut}>Logg ut</NavLink></div>
                : <div className="logged-in-as">Not logged in</div>
        );
    }
}


class Main extends Component {

    amILoggedin = null;

    componentDidMount() {
        // console.log("This location (from componentDidMount: " + window.location);

        const promiseObject = refreshToken();
        console.log("PO:  ", sessionStorage.getItem("storedtoken"))  // returns pending
        promiseObject.then(value => {
            console.log("Am I logged in? " + value);  // does not get triggerede
            if (value != 'undefined') {
                this.amILoggedin = value;
            } else {
                this.amILoggedin = false;
            }
        });
    }

    render() {
       //  console.log("Path: " + window.location.href);


        if (window.location.href === "http://localhost:3000/#/Statistikk") { return (<HashRouter><Route exact path="/Statistikk" component={Statistikk2} /></HashRouter>) } else {
            return this.amILoggedin == null ? "<div></div>" : (

                <div>
                    <HashRouter>
                        <div>
                            <div className="bgded overlay">{ /*console.log("Render return check: ", this.amILoggedin)*/ }
                                <div className="wrapper row1">
                                    <header id="header" className="hoc clear">
                                        <div id="logo" className="fl_left">
                                            <a href="/"><img id="logo" className="forsidelogo" src="https://tinyurl.com/yb79l4dx" alt="Logo"/></a>
                                        </div>
                                        <Menu loggedin={this.amILoggedin}/>
                                        <LoginStatus loggedin={this.amILoggedin}/>
                                    </header>
                                </div>
                                <Route exact path="/" component={forsideMain} />
                                <Route path="/" component={ikkeforsideMain} />
                            </div>

                            {/*Main componenets*/}
                            <div>
                                <Route exact path="/" component={UserHome} />
                                <Route exact path="/case/:id" component={Case} />
                                <Route exact path="/case/:id/edit" component={CaseEdit} />
                                <Route exact path="/issues" component={IssueOverview} />
                                <Route exact path="/issues/:id" component={IssueOverview} />
                                <Route exact path="/events" component={Events}/>
                                <Route exact path="/map" component={Map} />
                                <Route exact path="/nyansatt" component={NewEmployee}/>
                                <Route exact path="/report" component={ReportPage} />
                                <Route exact path="/register" component={Register}/>
                                <Route exact path="/reset/user/:token" component={UpdateUserPasswordFromToken} />¨
                                <Route exact path="/reset/emp/:token" component={UpdateEmployeePasswordFromToken} />
                                <Route exact path="/reset/org/:token" component={UpdateOrgPasswordFromToken} />
                                <Route exact path="/reset/user" component={ForgottenPasswordUser} />
                                <Route exact path="/reset/emp" component={ForgottenPasswordEmployee} />
                                <Route exact path="/reset/org" component={ForgottenPasswordOrganization} />


                                <PrivateRoute exact path="/user/edit" component={UserEdit} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/user/changePassword" component={ChangePassword} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/user" component={ProfilePage} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/login" component={LoginPage} isAuthenticated={!this.amILoggedin} redirect="/"/>

                                <PrivateRoute exact path="/bedrift/issues/:id" component={OrgIssueOverview} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/bedrift/edit" component={OrgEdit} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/bedrift/changePassword" component={ChangePasswordOrg} isAuthenticated={this.amILoggedin} redirect="/login"/>

                                <PrivateRoute exact path="/admin/" component={MinSideKommune} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/admin/changePassword" component={ChangePasswordEmployee} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/admin/bedrift" component={AdminBedrift} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/admin/bedrift/ny" component={AdminNyBedrift} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/admin/bedrift/rediger/:id" component={AdminRedigerBedrift} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/admin/kategori" component={AdminKategori} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/admin/kategori/ny" component={AdminNyKategori} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/admin/kategori/rediger/:id" component={AdminRedigerKategori} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/admin/edit" component={EmployeeEdit} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/admin/events" component={EmployeeEvents} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/admin/events/:id/edit" component={EventsEdit} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/admin/heroes" component={PrivateUsersList} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/admin/issues/:id" component={IssueOverviewForEmployee} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/admin/kommune" component={EmployeeOverview} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/admin/main" component={AdminMain} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/admin/nyorg" component={AdminNyBedrift} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/admin/heroes/:id/edit" component={AdminEditPrivateUsers} isAuthenticated={this.amILoggedin} redirect="/login"/>

                                {/* MIDLERTIDIG? */}
                                <PrivateRoute exact path="/admin/logTable" component={LogTable} isAuthenticated={this.amILoggedin} redirect="/login"/>
                                <PrivateRoute exact path="/admin/kommune/edit/:id" component={AdminEditEmployee} isAuthenticated={this.amILoggedin} redirect="/login"/>
                            </div>

                            {/*Bottom banner*/}
                            <div className="wrapper row5" style={{position: "inherit"}}>
                                <div id="copyright" className="hoc clear">
                                    <p className="fl_left">Copyright &copy; 2019 - All Rights Reserved - <a href="#">Team 5</a></p>
                                    <p className="fl_right">I samarbeid med <a target="_blank" href="http://www.ntnu.no/" title="NTNU">NTNU</a></p>
                                </div>
                            </div>

                        </div>
                    </HashRouter>
                </div>
            );
        }
    }
}

export default withRouter(Main);

ReactDOM.render(<Main />, document.getElementById("root"));
