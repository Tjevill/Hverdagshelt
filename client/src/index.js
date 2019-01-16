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

const root = document.getElementById("root");

function renderRoot() {

  if (root) {

    const promiseObject = refreshToken();

    promiseObject.then(value => {

      if (value != 'undefined') {

        ReactDOM.render(
            <HashRouter>
<div>
    <div className="bgded overlay">

        <div className="wrapper row1">
            <header id="header" className="hoc clear">

                <div id="logo" className="fl_left">
                    <h1><a href="/"><img src="./images/logo.png"/></a></h1>
                </div>
                <nav id="mainav" className="fl_right">
                    <ul className="clear">
                        <li className="active forsidelogo"><a href="index.html">Home</a></li>
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



        <section id="pageintro" className="hoc clear">
            <div>

                <h2 className="heading">Ultricies nisl</h2>
                <p>Morbi lacus sapien venenatis id cursus in bibendum eget ligula nunc vitae lacus sit amet sem
                    consequat ullamcorper.</p>
                <footer><a className="btn" href="#">Vulputate</a></footer>

            </div>
        </section>

    </div>

              <div>

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
                  <Route exact path="/register" component={Register}/>
                  <Route exact path="/user" component={ProfilePage} />
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
    <div className="wrapper row5">
        <div id="copyright" className="hoc clear">

            <p className="fl_left">Copyright &copy; 2018 - All Rights Reserved - <a href="#">Team 5</a>
            </p>
            <p className="fl_right">I samarbeid med <a target="_blank" href="http://www.ntnu.no/" title="NTNU">NTNU</a></p>

        </div>
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
