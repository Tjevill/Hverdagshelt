// @flow
/* eslint eqeqeq: "off" */
import React from "react";
import ReactDOM from "react-dom";
import {HashRouter, Redirect, Route} from 'react-router-dom';
import createHashHistory from "history/createHashHistory";

import Navbar from "./components/Navbar";
import CasePage from "./components/CasePage";
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
        <div>
          <Navbar />
          <div id="page">
            <Route exact path="/" component={UserHome} />
            <Route exact path="/case/:id" component={CasePage} />
            <Route exact path="/profile/:id/edit" component={UserEdit} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/issues" component={IssueOverview} />
            <Route exact path="/events" component={Events}/>
            <Route exact path="/IssueOverview" component={IssueOverview} />
            <Route exact path="/reportPage" component={ReportPage} />
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/nyansatt" component={NewEmployee}/>
            <PrivateRoute path="/admin" component={Admin} />
          </div>
        </div>
      </HashRouter>,
      root
    );

}

renderRoot();
