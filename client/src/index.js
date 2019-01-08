// @flow
/* eslint eqeqeq: "off" */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, NavLink } from 'react-router-dom';
import "./style.css";
import createHashHistory from "history/createHashHistory";
import Cases from "./Cases";
import CasePage from "./Components/CasePage";
import CaseListCard from "./Components/Test";

const history = createHashHistory();

history.listen((location, action) => {
  window.scrollTo(0, 0);
});


class Navbar extends Component {
    render() {
        return(
            <div class = "articleGrid">
                <div>
                    <nav id='navbar' className='navbar navbar-dark bg-primary justify-content-between'>
                        <a id='navbar-title' className='navbar-brand' onClick={() => this.toHome()} >Hverdagshelt</a>
                        <form className='form-inline'>
                            <NavLink to='/profile'>
                                <button className='btn btn-dark' type='button'>Profile Page</button>
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
            <NavLink to="/ntnu">Meny 1</NavLink>
          </li>
          <li id="menuitem3">
            <NavLink to="/verden">Meny 2</NavLink>
          </li>
          <li id="menuitem4">
            <NavLink to="/login">Logg inn</NavLink>
          </li>
          <li id="menuitem5">
            <NavLink to="/casePage">Testsak</NavLink>
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


const root = document.getElementById('root');

function renderRoot(){
    if (root)
        ReactDOM.render(
            <HashRouter>
                <div id='page'>
                    <Navbar />
                    <CaseListCard />
                    {/*legge til link til endre personalia*/}
                    {/*<Route exact path='/' component={Home} />*/}
                    {/*<Route exact path='/register' component={Register} />*/}
                    {/*<Route exact path='/article/:id' component={ArticleInfo} />*/}
                    {/*<Route exact path='/article/:id/edit' component={ArticleEdit} />*/}
                </div>
            </HashRouter>,
            root
        );
}

renderRoot();

