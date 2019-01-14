// @flow
/* eslint eqeqeq: "off" */
import React, {Component} from "react";
import ReactDOM from "react-dom";
import { DropdownButton, SplitButton, ButtonToolbar, MenuItem } from 'react-bootstrap';
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
import NewOrganization from "./components/NewOrganization";
import NewEmployee from "./components/NewEmployee";
import AdminMain from "./components/AdminMain";
import LoginPage from "./components/LoginPage";
import {refreshToken} from "./components/widgets";
import { HashRouter, Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from 'react-private-route'
import createHistory from 'history/createBrowserHistory'

const history = createHistory({
  forceRefresh: true
})




class Navbar extends Component {
  active = "";

  handleLogOut() {
    console.log('this is:', this);
      console.log("Cleaning sessionstorage");
      sessionStorage.clear();
    history.push('/', { some: 'state' })

  }


    render() {

    console.log("this.props: ",  this.props)
    if (!this.props.loggedin) {

    return(
      <div className="topnav" id="navbar">
        <a className="" id="front-page" href="/" onClick={() => this.activate("")}><img id="logo" src="https://tinyurl.com/yb79l4dx" alt="Logo"/></a>
        <a className="option" id="issues" href="#issues" onClick={() => this.activate("issues")}>Saker</a>
        <a className="option" id="events" href="#events" onClick={() => this.activate("events")}>Events</a>
          <a className="option" id="register" href="#register" onClick={() => this.activate("register")}>Registrer deg som Helt!</a>
          <a className="option" id="nyorg" href="#nyorg" onClick={() => this.activate("nyorg")}>Registrer deg som Kommuneansatt!</a>
          <a className="option" id="login" href="#login" onClick={() => this.activate("login")}>Logg inn</a>
        <a href="javascript:" className="icon" onClick={() => this.mobileMenu()}></a>
      </div>
    );

    }

      if (this.props.loggedin && (sessionStorage.getItem("access") == "user")) {

        return (
            <div className="topnav" id="navbar">
              <a className="" id="front-page" href="/" onClick={() => this.activate("")}><img id="logo" src="https://tinyurl.com/yb79l4dx" alt="Logo"/></a>
              <a className="option" id="report" href="#report" onClick={() => this.activate("report")}>Rapporter feil</a>
              <a className="option" id="events" href="#events" onClick={() => this.activate("events")}>Events</a>
                <ButtonToolbar className="dropdownmenus1">
                    <DropdownButton
                        bsStyle="dropdown_right"
                        title="Min side"
                        key="2"
                        id="dropdown-basic-2"
                        noCaret
                    >
                        <MenuItem href="#user/" eventKey="1">Min side</MenuItem>
                        <MenuItem href="#user/edit" eventKey="1">Rediger profil</MenuItem>
                        <MenuItem href="#user/newpass" eventKey="2">Forandre Passord</MenuItem>
                        <MenuItem href="#user/rapporter" eventKey="3">Feilrapporter</MenuItem>
                        <MenuItem divider />
                        <MenuItem onClick={this.handleLogOut} eventKey="4">Logg ut</MenuItem>
                    </DropdownButton>
                </ButtonToolbar>;
              <a href="javascript:" className="icon" onClick={() => this.mobileMenu()}></a>
            </div>
        );

      }

        if (this.props.loggedin && (sessionStorage.getItem("access") == "bedrift")) {

            return(
                <div className="topnav" id="navbar">
                    <a className="" id="front-page" href="/" onClick={() => this.activate("")}><img id="logo" src="https://tinyurl.com/yb79l4dx" alt="Logo"/></a>
                    <a className="option" id="events" href="#events" onClick={() => this.activate("events")}>Events</a>
                    <ButtonToolbar className="dropdownmenus">
                        <DropdownButton
                            bsStyle="dropdown_right"
                            title="Min side"
                            key="2"
                            id="dropdown-basic-2"
                            noCaret
                        >
                            <MenuItem href="#bedrift/" eventKey="1">Min side</MenuItem>
                            <MenuItem href="#bedrift/edit" eventKey="1">Rediger profil</MenuItem>
                            <MenuItem href="#bedrift/newpass" eventKey="2">Forandre Passord</MenuItem>
                            <MenuItem href="#bedrift/rapporter" eventKey="3">Feilrapporter</MenuItem>
                            <MenuItem divider />
                            <MenuItem onClick={this.handleLogOut} eventKey="4">Logg ut</MenuItem>
                        </DropdownButton>
                    </ButtonToolbar>;
                    <div className="logged-in-as">Logged in as { sessionStorage.getItem("access") }, ({sessionStorage.getItem("email")})</div>
                    <a href="javascript:" className="icon" onClick={() => this.mobileMenu()}></a>
                </div>
            );

        }

          if (this.props.loggedin && (sessionStorage.getItem("access") == "kommune")) {


            return(
                <div className="topnav" id="navbar">
                  <a className="" id="front-page" href="/" onClick={() => this.activate("")}><img id="logo" src="https://tinyurl.com/yb79l4dx" alt="Logo"/></a>
                  <a className="option" id="events" href="#events" onClick={() => this.activate("events")}>Events</a>
                  <a className="option" id="profile" href="#profile" onClick={() => this.activate("profile")}>Profil</a>
                    <ButtonToolbar className="dropdownmenus">
                        <DropdownButton
                        bsStyle="dropdown_left"
                        title="Administrator"
                        key="1"
                        id="dropdown-basic-1"
                        noCaret
                    >
                            <MenuItem href="#admin/kommune" eventKey="1">Kommuneansatte</MenuItem>
                            <MenuItem href="#admin/helter" eventKey="2">Hverdagshelter</MenuItem>
                            <MenuItem href="#admim/bedrifter" eventKey="3">Bedrifter</MenuItem>
                            <MenuItem href="#admin/rapporter" eventKey="4">Feilrapporter</MenuItem>
                            <MenuItem href="#admin/events" eventKey="4">Events</MenuItem>
                            <MenuItem divider />
                            <MenuItem onClick={this.handleLogOut} eventKey="5">Logg ut</MenuItem>
                        </DropdownButton>
                        <DropdownButton
                                bsStyle="dropdown_right"
                                title="Min side"
                                key="2"
                                id="dropdown-basic-2"
                                noCaret
                            >
                            <MenuItem href="#admin/" eventKey="1">Min side</MenuItem>
                            <MenuItem href="#admin/edit" eventKey="1">Rediger profil</MenuItem>
                            <MenuItem href="#admim/newpass" eventKey="2">Forandre Passord</MenuItem>
                            <MenuItem href="#profile/rapporter" eventKey="3">Mine rapporter</MenuItem>
                            <MenuItem divider />
                            <MenuItem onClick={this.handleLogOut} eventKey="4">Logg ut</MenuItem>
                        </DropdownButton>
                    </ButtonToolbar>;
                    <div className="logged-in-as">Logged in as { sessionStorage.getItem("access") }, ({sessionStorage.getItem("email")})</div>
                  <a href="javascript:" className="icon" onClick={() => this.mobileMenu()}></a>
                </div>
            );


          }

  }

  componentDidMount() {


    this.active = window.location.hash.split("/")[1];
    // console.log("active: " + this.active);
    /* not working. Option wont activate when first loaded but works after.
    if(this.active != ""){
      let activeOption = document.getElementById(this.active);
      activeOption.className =+ " active";
    }*/
  }

  activate(name) {
/*
    if(name == this.active) return;

    if(name != ""){
      let to = document.getElementById(name);
      to.className += " active";
    }

    if(this.active != ""){
      let from = document.getElementById(this.active);
      from.className = "option";
    }

    this.active = name; */
return true;
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





const root = document.getElementById("root");


function renderRoot() {
  if (root) {

    const promiseObject = refreshToken();
    promiseObject.then(function (value) {

      if (value !== 'undefined') {


        ReactDOM.render(
            <HashRouter>
              <div>
                <Navbar loggedin={value}/>
                <div id="page">
                  <Route exact path="/" component={UserHome} />
                  <Route exact path="/case" component={CasePage} />
                  <Route exact path="/profile" component={ProfilePage} />
                  <Route exact path="/issues" component={IssueOverview} />
                  <Route exact path="/events" component={Events}/>
                  <Route exact path="/IssueOverview" component={IssueOverview} />
                  <Route exact path="/reportPage" component={ReportPage} />
                  <Route exact path='/register' component={Register}/>
                    <Route exact path='/nyorg' component={NewOrganization}/>
                    <Route exact path='/nyansatt' component={NewEmployee}/>
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
                      redirect="/admin/main"
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
