// @flow
/* eslint eqeqeq: "off" */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import { Router, NavLink, Route } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import Cases from "./Components/Cases"
import Register from "./Components/Register";
import Login from "./Components/Login";

const history = createHashHistory();

history.listen((location, action) => {
  window.scrollTo(0, 0);
});

class Menu extends Component {
  render() {
    return (
      <Router history={history}>
        <ul className="hovedmeny">
          <li id="menuitem1">
            <NavLink to="/">Forsiden</NavLink>
          </li>
          <li id="menuitem2">
            <NavLink to="/registrer">Registrer</NavLink>
          </li>
          <li id="menuitem3">
            <NavLink to="/verden">Meny 2</NavLink>
          </li>
          <li id="menuitem4">
            <NavLink to="/login">Logg inn</NavLink>
          </li>
        </ul>
      </Router>
    );
  }
}

class Main extends Component {
  render() {

    return (
      <div className="container">
        <div className="item heading">
          <div className="avisnavntittel">Vær en hverdagshelt!</div>
        </div>
        <div className="item meny">
          <Menu />
        </div>
        <div className="item main">
          <Router history={history}>
            <div>

            <Route path="/registrer" component={Register} />
            <Route path="/login" component={Login} />

            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default Main;

ReactDOM.render(<Main />, document.getElementById("root"));
