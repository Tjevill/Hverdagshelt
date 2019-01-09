// @flow
/* eslint eqeqeq: "off" */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from 'react-router-dom';
import "./style.css";
import createHashHistory from "history/createHashHistory";
import Cases from "./cases";
import CasePage from "./components/CasePage";
import CaseListCard from "./components/CaseListCard";
import ProfileCard from "./components/ProfileCard";
import ProfilePage from "./components/ProfilePage";
import IssueOverview from "./components/IssueOverview";
import UserHome from "./components/userHome";
import Events from "./components/events";
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

const history = createHashHistory();

history.listen((location, action) => {
  window.scrollTo(0, 0);
});

class Navbar extends Component {

  active = ""

  render() {
    return(
      <div className="topnav" id="navbar">
        <a className="" id="front-page" href="/" onClick={() => this.activate("")}><img id="logo" src="https://tinyurl.com/yb79l4dx" alt="Logo"/></a>
        <a className="option" id="issues" href="#issues" onClick={() => this.activate("issues")}>Issues</a>
        <a className="option" href="#news">News</a>
        <a className="option" href="#contact">Contact</a>
        <a className="option" id="profile" href="#profile" onClick={() => this.activate("profile")}>Profile</a>
        <a href="/" className="icon" onClick={() => this.mobileMenu()}>
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


class Main extends Component {
  render() {
    return (
      <div>Frontpage!</div>
    );
  }
}

export default Main;

ReactDOM.render(<Main />, document.getElementById("root"));

const root = document.getElementById("root");


function renderRoot() {
  if (root)
    ReactDOM.render(
      <HashRouter>
        <div id="page">
          <Navbar />
<<<<<<< HEAD
          <Route exact path="/" component={Main} />
          <Route exact path="/case" component={CasePage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/issues" component={IssueOverview} />
=======
          <Route exact path="/" component={Menu} />
          <Route exact path="/CasePage" component={CasePage} />
          <Route exact path='/userHome' component={UserHome}/>
          <Route exact path='/events' component={Events}/>
        {/*<Route exact path="/CaseListCard" component={IssueOverview} />*/}
>>>>>>> d73538b3f04ccc41ed115fe3df75001c55c8ad29
        </div>
      </HashRouter>,
      root
    );

}

renderRoot();
