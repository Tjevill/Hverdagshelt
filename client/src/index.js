// @flow
/* eslint eqeqeq: "off" */
import React, {Component} from "react";
import ReactDOM from "react-dom";
import {HashRouter, Redirect, Route} from 'react-router-dom';
import createHashHistory from "history/createHashHistory";
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

const history = createHashHistory();

history.listen((location, action) => {
  window.scrollTo(0, 0);
});


class Navbar extends Component {

  active = "";

  render() {
    return(
      <div className="topnav" id="navbar">
        <a className="" id="front-page" href="/" onClick={() => this.activate("")}><img id="logo" src="https://tinyurl.com/yb79l4dx" alt="Logo"/></a>
          <a className="option" id="issues" href="#issues" onClick={() => this.activate("issues")}>Saker</a>
          <a className="option" id="events" href="#events" onClick={() => this.activate("events")}>Events</a>
          <a className="option" id="profile" href="#profile" onClick={() => this.activate("profile")}>Profil</a>
          <a className="option" id="login" href="#login" onClick={() => this.activate("login")}>Logg inn</a>
          <a className="option" id="register" href="#registrer" onClick={() => this.activate("register")}>Registrer deg som Helt!</a>
          <a className="option" id="admin" href="#admin" onClick={() => this.activate("admin")}>Administrator</a>
          <a href="javascript:" className="icon" onClick={() => this.mobileMenu()}>
          <i className="fa fa-bars"></i>
        </a>
      </div>
    );
  }

  componentDidMount() {
    this.active = window.location.hash.split("/")[1];
    console.log("active: " + this.active);
    /* not working. Option wont activate when first loaded but works after.
    if(this.active != ""){
      let activeOption = document.getElementById(this.active);
      activeOption.className =+ " active";
    }*/
  }

  activate(name) {
    console.log(this.active);

    if(name == this.active) return;

    if(name != ""){
      let to = document.getElementById(name);
      to.className += " active";
    }

    if(this.active != ""){
      let from = document.getElementById(this.active);
      from.className = "option";
    }

    this.active = name;
  }

  /* Toggle between adding and removing the "responsive" class
  to topnav when the user clicks on the icon */
  mobileMenu() {
    let x = document.getElementById("navbar");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

}



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
        <div id="page">
          <Navbar />
          <Route exact path="/" component={UserHome} />
          <Route exact path="/case" component={CasePage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/issues" component={IssueOverview} />
          <Route exact path="/events" component={Events}/>
          <Route exact path="/IssueOverview" component={IssueOverview} />
          <Route exact path="/reportPage" component={ReportPage} />
          <Route exact path='/login' component={Login}/>
          <Route exact path='/registrer' component={Register}/>
          <Route exact path='/nyansatt' component={NewEmployee}/>
          <PrivateRoute path="/admin" component={Admin} />
        </div>
      </HashRouter>,
      root
    );

}

renderRoot();
