// @flow
/* eslint eqeqeq: "off" */
import React, {Component} from "react";
import ReactDOM from "react-dom";
import { HashRouter, Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { DropdownButton, SplitButton, ButtonToolbar, MenuItem } from 'react-bootstrap';
import createHashHistory from "history/createHashHistory";

import Navbar from "./components/Navbar";
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
import ReportValidation from "./components/ReportValidation";
import ForgottenPassword from "./components/ForgottenPassword";
import PrivateUsersList from "./components/PrivateUsersList";


const root = document.getElementById("root");

function renderRoot() {

  if (root) {

    const promiseObject = refreshToken();

    promiseObject.then(value => {

      if (value != 'undefined') {

        ReactDOM.render(
            <HashRouter>
              <div>
                <Navbar loggedin={value}/>
                <div id="page">
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
                  <Route exact path="/validation" component={ReportValidation} />
                  <Route exact path="/register" component={Register}/>
                  <Route exact path="/user" component={ProfilePage} />
                  <Route exact path="/forgot" component={ProfilePage} />
                  <Route exact path="/admin/helter" component={PrivateUsersList} />
                  <PrivateRoute
                    exact
                    path="/user/edit"
                    component={UserEdit}
                    isAuthenticated={value}
                  />
                  <PrivateRoute
                    exact
                    path="/user/changePassword"
                    component={ChangePassword}
                    isAuthenticated={value}
                  />
                  <PrivateRoute
                    exact
                    path="/profile"
                    component={ProfilePage}
                    isAuthenticated={value}
                    redirect="/login"
                  />
                  <PrivateRoute
                      exact
                      path="/admin/main"
                      component={AdminMain}
                      isAuthenticated={value}
                      redirect="/login"
                  />
                  <PrivateRoute
                      exact
                      path="/login"
                      component={LoginPage}
                      isAuthenticated={!value}
                      redirect="/"
                  />
                </div>
              </div>
            </HashRouter>,
            root
          );
      } else {
          console.log("Brukernavn & passord IKKE ok");
      }
    });
  }
}

renderRoot();
