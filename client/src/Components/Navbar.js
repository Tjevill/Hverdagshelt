import React, {Component} from "react";
import ReactDOM from "react-dom";

export default class Navbar extends Component {

  active = "";
  options = ["issues", "events", "profile", "login", "register", "admin", "map"];

  render() {
    return(
      <div className="topnav" id="navbar">
        <a className="" id="front-page" href="/" onClick={() => this.activate("")}><img id="logo" src="https://tinyurl.com/yb79l4dx" alt="Logo"/></a>
          <a className="option" id="report" href="#reportPage" onClick={() => this.activate("")}>Rapporter</a>
          <a className="option" id="issues" href="#issues" onClick={() => this.activate("issues")}>Saker</a>
          <a className="option" id="events" href="#events" onClick={() => this.activate("events")}>Events</a>
          <a className="option" id="profile" href="#profile" onClick={() => this.activate("profile")}>Profil</a>
          <a className="option" id="login" href="#login" onClick={() => this.activate("login")}>Logg inn</a>
          <a className="option" id="register" href="#register" onClick={() => this.activate("register")}>Registrer deg som Helt!</a>
          <a className="option" id="admin" href="#admin" onClick={() => this.activate("admin")}>Administrator</a>
          <a className="option" id="map" href="#map" onClick={() => this.activate("map")}>Map</a>
          <a href="javascript:" className="icon" onClick={() => this.mobileMenu()}>
          <i className="fa fa-bars"></i>
        </a>
      </div>
    );
  }

  async componentDidMount() {
      let path = window.location.hash.split("/")[1];
      if(this.options.includes(path)){
        this.activate(path);
      }
  }

  activate(name) {
    let navbar = document.getElementById("navbar");
    navbar.className = "topnav";

    if(name == this.active) return;

    if(name != ""){
      //console.log("Activating: " + name);
      let to = document.getElementById(name);
      to.className += " active";
    }

    if(this.active != ""){
      //console.log("Deactivating: " + this.active);
      let from = document.getElementById(this.active);
      from.className = "option";
    }

    this.active = name;
  }

  /* Toggle between adding and removing the "responsive" class
  to topnav when the user clicks on the icon */
  mobileMenu() {
    let navbar = document.getElementById("navbar");
    if (navbar.className === "topnav") {
      navbar.className += " responsive";
    } else {
      navbar.className = "topnav";
    }
  }

}
