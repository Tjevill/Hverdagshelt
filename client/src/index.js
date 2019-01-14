// @flow
/* eslint eqeqeq: "off" */
import React from "react";
import ReactDOM from "react-dom";
import {HashRouter, Redirect, Route} from 'react-router-dom';
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
import Login from "./components/Login";
import NewEmployee from "./components/NewEmployee";
import Admin from "./components/Admin";
import UserEdit from "./components/UserEdit";
import ChangePassword from "./components/ChangePassword";
import IssueOverviewForEmployee from "./components/IssueOverviewForEmployee";
import Map from "./components/Map";
import MapContainer from "./components/ReportMap";
import CaseEdit from "./components/caseEdit";



const history = createHashHistory();

history.listen((location, action) => {
  window.scrollTo(0, 0);
});

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                fakeAuth.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}


const root = document.getElementById("root");


function renderRoot() {
  if (root)
    ReactDOM.render(
      <HashRouter>
        <div className="max">
          <Navbar />
          <div id="page">
            <Route exact path="/" component={UserHome} />
            <Route exact path="/case/:id" component={Case} />
            <Route exact path="/profile/:id/edit" component={UserEdit} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/issues" component={IssueOverview} />
            <Route exact path="/events" component={Events}/>
            <Route exact path="/issues/:name/:id" component={IssueOverview} />
            <Route exact path="/reportPage" component={ReportPage} />
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/nyansatt" component={NewEmployee}/>
            <Route exact path="/nypassord/:id" component={ChangePassword} />

            <Route exact path="/case/:id/edit" component={CaseEdit} />
            <Route exact path="/issuesEmployee/:name/:id" component={IssueOverviewForEmployee} />
            <Route exact path="/map" component={Map} />

            <PrivateRoute path="/admin" component={Admin} />
          </div>
        </div>
      </HashRouter>,
      root
    );

}

renderRoot();
