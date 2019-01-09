// @flow
/* eslint eqeqeq: "off" */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, NavLink } from 'react-router-dom';
import createHashHistory from "history/createHashHistory";
import Cases from "./Cases";
import CasePage from "./components/CasePage";
import ProfilePage from "./components/ProfilePage";
import ReportPage from "./components/ReportPage";
import UserHome from "./Components/userHome";
import Events from "./Components/events";
import IssueOverview from "./Components/IssueOverview";
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';


const history = createHashHistory();

history.listen((location, action) => {
  window.scrollTo(0, 0);
});


class Navbar extends Component {
    render() {
        return(
            <div class = "articleGrid">
                <div>
                    <nav id='navbar' className='navbar navbar-light justify-content-between'>
                        <a id='navbar-title' className='navbar-brand' onClick={() => this.toHome()}>
                            <img src="http://i.imgur.com/sZeFVIn.jpg" alt="Logo" id="logo-image" class="logo"/>
                        </a>
                        <form className='form-inline'>
                            <NavLink to='/profile'>
                                <button className='btn btn-dark' type='button'>Profile Page</button>
                            </NavLink>
                               <NavLink to='/userHome'>
                                <button className='btn btn-dark' type='button'>User Home </button>
                            </NavLink>
                            <NavLink to='/events'>
                                <button className='btn btn-dark' type='button'>Events</button>
                            </NavLink>
                        </form>
                    </nav>
                </div>
            </div>
        );
    }

    toHome(){
        history.push('/');
        window.location.reload();
    }
}

class Menu extends Component {
  render() {
    return (
      <HashRouter history={history}>
        <ul className="hovedmeny">
          <li id="menuitem1">
            <NavLink to="/">Forsiden</NavLink>
          </li>
          <li id="menuitem2">
            <NavLink to="/ReportPage">Rapporter problem</NavLink>
          </li>
          <li id="menuitem3">
            <NavLink to="/ProfilePage">Profil</NavLink>
          </li>
          <li id="menuitem4">
            <NavLink to="/login">Logg inn</NavLink>
          </li>
          <li id="menuitem5">
            <NavLink to="/casePage">CasePage</NavLink>
          </li>
          <li id="menuitem6">
            <NavLink to="/IssueOverview">IssueOverview</NavLink>
          </li>
        </ul>
      </HashRouter>
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
          <Cases />
        </div>
      </div>
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
            <Route exact path="/" component={Menu} />
            <Route exact path="/CasePage" component={CasePage} />
            <Route exact path="/ReportPage" component={ReportPage} />
            <Route exact path="/ProfilePage" component={ProfilePage} />
          <Route exact path='/userHome' component={UserHome}/>
          <Route exact path='/events' component={Events}/>
          <Route exact path="/IssueOverview" component={IssueOverview} />
        </div>
      </HashRouter>,
      root
    );
}

renderRoot();
